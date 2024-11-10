import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Save, Trash, Play, Pause, AlertCircle, Loader2 } from 'lucide-react';
import { HeartbeatChart } from './HeartbeatChart';

interface HeartbeatRecorderProps {
  onRecordingComplete?: (data: { 
    waveform: number[], 
    audioBlob: Blob,
    timestamp: string,
    duration: number 
  }) => void;
}

export function HeartbeatRecorder({ onRecordingComplete }: HeartbeatRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;

    if (isRecording) {
      intervalId = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording]);

  const processAudioData = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Convert to waveform data
      const channelData = audioBuffer.getChannelData(0);
      const samples = 50;
      const blockSize = Math.floor(channelData.length / samples);
      const waveformData = [];
      
      for (let i = 0; i < samples; i++) {
        const start = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(channelData[start + j]);
        }
        const scaled = 40 + (sum / blockSize) * 80;
        waveformData.push(scaled);
      }

      setAudioData(waveformData);
      
      if (onRecordingComplete) {
        onRecordingComplete({ 
          waveform: waveformData, 
          audioBlob,
          timestamp: new Date().toISOString(),
          duration: recordingTime
        });
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Error processing audio data');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      setRecordingTime(0);
      setAudioData([]);
      setRecordedBlob(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(audioBlob);
        await processAudioData(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioData([]);
    setRecordedBlob(null);
    setRecordingTime(0);
    setError(null);
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `heartbeat-${new Date().toISOString()}.wav`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [{
      data: audioData.length > 0 ? audioData : Array(50).fill(60),
      borderColor: 'rgb(220, 38, 38)',
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    }]
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Recording Status Bar */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-600 font-medium">Recording</span>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-rose-600" />
                <span className="text-rose-600 font-medium">Processing</span>
              </div>
            )}
            <span className="text-gray-600 font-mono font-medium">
              {formatTime(recordingTime)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="h-5 w-5" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Start Recording
                </>
              )}
            </button>

            {recordedBlob && !isRecording && (
              <button
                onClick={() => {
                  const url = URL.createObjectURL(recordedBlob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `heartbeat-${new Date().toISOString()}.wav`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Save className="h-5 w-5" />
                Save Recording
              </button>
            )}
          </div>
        </div>

        {/* Waveform Display */}
        <div className="p-6">
          <div className="h-[300px]">
            <HeartbeatChart data={chartData} />
          </div>
        </div>

        {/* Recording Info */}
        {recordedBlob && !isRecording && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Recording Duration: {formatTime(recordingTime)}</span>
              <span>File Size: {(recordedBlob.size / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 