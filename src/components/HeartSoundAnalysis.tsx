import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { 
  processTimeDomain,
  processFrequencyDomain,
  detectPeaks,
  calculateHeartRate,
  detectAbnormalSounds,
  assessSignalQuality
} from '../utils/heartSoundAnalysis';

interface HeartSoundAnalysisProps {
  audioBlob: Blob;
}

interface AnalysisResult {
  heartRate: number;
  abnormalSounds: boolean;
  signalQuality: 'Good' | 'Fair' | 'Poor';
  s1Peaks: number[];
  s2Peaks: number[];
  frequencyComponents: any[];
  waveformData: any[];
}

export function HeartSoundAnalysis({ audioBlob }: HeartSoundAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeHeartSound(audioBlob);
  }, [audioBlob]);

  const analyzeHeartSound = async (blob: Blob) => {
    try {
      setLoading(true);
      const audioContext = new AudioContext();
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channelData = audioBuffer.getChannelData(0);

      // Process audio data
      const waveformData = processTimeDomain(channelData, audioContext.sampleRate);
      const frequencyData = processFrequencyDomain(channelData, audioContext.sampleRate);
      const peaks = detectPeaks(waveformData);
      const heartRate = calculateHeartRate(peaks.s1, audioContext.sampleRate);
      const hasAbnormalSounds = detectAbnormalSounds(frequencyData);
      const signalQuality = assessSignalQuality(waveformData, frequencyData);

      setAnalysis({
        heartRate,
        abnormalSounds: hasAbnormalSounds,
        signalQuality,
        s1Peaks: peaks.s1,
        s2Peaks: peaks.s2,
        frequencyComponents: frequencyData,
        waveformData
      });
    } catch (error) {
      console.error('Error analyzing heart sound:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
        </div>
      ) : analysis ? (
        <>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Waveform Analysis</h3>
            <LineChart width={600} height={200} data={analysis.waveformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Time (s)', position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amplitude" 
                stroke="#e11d48" 
                dot={false} 
                strokeWidth={1.5} 
              />
              {/* Markers for S1/S2 peaks */}
              {analysis.s1Peaks.map((time, index) => (
                <ReferenceLine 
                  key={`s1-${index}`} 
                  x={time} 
                  stroke="#e11d48" 
                  strokeDasharray="3 3" 
                />
              ))}
            </LineChart>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Measurements</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Heart Rate:</dt>
                  <dd className="font-medium">{analysis.heartRate} BPM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Signal Quality:</dt>
                  <dd className={`font-medium ${
                    analysis.signalQuality === 'Good' ? 'text-green-600' :
                    analysis.signalQuality === 'Fair' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {analysis.signalQuality}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Findings</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Abnormal Sounds:</dt>
                  <dd className={`font-medium ${
                    analysis.abnormalSounds ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {analysis.abnormalSounds ? 'Yes' : 'No'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
} 