/**
 * Heart Sound Analysis Utilities
 */

// Process time domain data for visualization and analysis
export function processTimeDomain(channelData: Float32Array, sampleRate: number) {
  const secondsPerPoint = 0.01; // 10ms resolution
  const pointsPerSegment = Math.floor(sampleRate * secondsPerPoint);
  const segments = Math.floor(channelData.length / pointsPerSegment);
  
  const waveformData = [];
  
  for (let i = 0; i < segments; i++) {
    const startSample = i * pointsPerSegment;
    let sum = 0;
    
    // Calculate RMS value for this segment
    for (let j = 0; j < pointsPerSegment && (startSample + j) < channelData.length; j++) {
      sum += channelData[startSample + j] * channelData[startSample + j];
    }
    
    const rms = Math.sqrt(sum / pointsPerSegment);
    waveformData.push({
      time: i * secondsPerPoint,
      amplitude: rms
    });
  }
  
  return waveformData;
}

// Process frequency domain for spectral analysis
export function processFrequencyDomain(channelData: Float32Array, sampleRate: number) {
  const fftSize = 2048;
  const frequencyData = [];
  
  // Apply Hanning window
  const windowedData = applyHanningWindow(channelData);
  
  // Perform FFT
  const fft = computeFFT(windowedData);
  
  // Convert to frequency spectrum
  const binWidth = sampleRate / fftSize;
  
  for (let i = 0; i < fft.length / 2; i++) {
    const frequency = i * binWidth;
    if (frequency <= 1000) { // Focus on frequencies up to 1000Hz
      frequencyData.push({
        frequency,
        magnitude: 20 * Math.log10(Math.abs(fft[i]))
      });
    }
  }
  
  return frequencyData;
}

// Detect S1 and S2 peaks
export function detectPeaks(waveformData: any[]) {
  const amplitudes = waveformData.map(point => point.amplitude);
  const threshold = calculateAdaptiveThreshold(amplitudes);
  
  const s1Peaks: number[] = [];
  const s2Peaks: number[] = [];
  let lastPeakIndex = -1;
  
  for (let i = 1; i < waveformData.length - 1; i++) {
    if (amplitudes[i] > threshold &&
        amplitudes[i] > amplitudes[i - 1] &&
        amplitudes[i] > amplitudes[i + 1]) {
      
      if (lastPeakIndex === -1 || 
          (waveformData[i].time - waveformData[lastPeakIndex].time) > 0.2) {
        // Classify as S1 or S2 based on relative amplitude and timing
        if (s1Peaks.length === s2Peaks.length) {
          s1Peaks.push(waveformData[i].time);
        } else {
          s2Peaks.push(waveformData[i].time);
        }
        lastPeakIndex = i;
      }
    }
  }
  
  return { s1: s1Peaks, s2: s2Peaks };
}

// Calculate heart rate from S1 peaks
export function calculateHeartRate(s1Peaks: number[], sampleRate: number): number {
  if (s1Peaks.length < 2) return 0;
  
  // Calculate average interval between peaks
  let totalInterval = 0;
  for (let i = 1; i < s1Peaks.length; i++) {
    totalInterval += s1Peaks[i] - s1Peaks[i - 1];
  }
  
  const averageInterval = totalInterval / (s1Peaks.length - 1);
  const beatsPerSecond = 1 / averageInterval;
  return Math.round(beatsPerSecond * 60); // Convert to BPM
}

// Detect abnormal frequency components
export function detectAbnormalSounds(frequencyData: any[]): boolean {
  // Define normal frequency ranges for heart sounds
  const normalRanges = [
    { min: 20, max: 150 },   // S1 range
    { min: 50, max: 200 }    // S2 range
  ];
  
  let hasAbnormalComponents = false;
  
  for (const point of frequencyData) {
    const frequency = point.frequency;
    const magnitude = point.magnitude;
    
    // Check if significant frequency components exist outside normal ranges
    const isInNormalRange = normalRanges.some(range => 
      frequency >= range.min && frequency <= range.max
    );
    
    if (!isInNormalRange && magnitude > -20) { // Significant magnitude threshold
      hasAbnormalComponents = true;
      break;
    }
  }
  
  return hasAbnormalComponents;
}

// Assess signal quality
export function assessSignalQuality(
  waveformData: any[], 
  frequencyData: any[]
): 'Good' | 'Fair' | 'Poor' {
  let score = 0;
  
  // Check signal-to-noise ratio
  const snr = calculateSNR(waveformData);
  if (snr > 20) score += 2;
  else if (snr > 10) score += 1;
  
  // Check for consistent peaks
  const peakConsistency = checkPeakConsistency(waveformData);
  if (peakConsistency > 0.8) score += 2;
  else if (peakConsistency > 0.6) score += 1;
  
  // Check frequency distribution
  const hasCleanSpectrum = checkFrequencySpectrum(frequencyData);
  if (hasCleanSpectrum) score += 1;
  
  // Return quality assessment based on score
  if (score >= 4) return 'Good';
  if (score >= 2) return 'Fair';
  return 'Poor';
}

// Helper functions
function applyHanningWindow(signal: Float32Array): Float32Array {
  const windowedSignal = new Float32Array(signal.length);
  for (let i = 0; i < signal.length; i++) {
    const multiplier = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (signal.length - 1)));
    windowedSignal[i] = signal[i] * multiplier;
  }
  return windowedSignal;
}

function computeFFT(signal: Float32Array): Float32Array {
  // Implement FFT algorithm or use Web Audio API's AnalyserNode
  // This is a placeholder - you'll need to implement actual FFT
  return new Float32Array(signal.length);
}

function calculateAdaptiveThreshold(amplitudes: number[]): number {
  const mean = amplitudes.reduce((sum, val) => sum + val, 0) / amplitudes.length;
  const std = Math.sqrt(
    amplitudes.reduce((sum, val) => sum + (val - mean) ** 2, 0) / amplitudes.length
  );
  return mean + 2 * std;
}

function calculateBaselineAmplitude(waveformData: any[]): number {
  const amplitudes = waveformData.map(point => point.amplitude);
  return amplitudes.reduce((sum, val) => sum + val, 0) / amplitudes.length;
}

function calculateSNR(waveformData: any[]): number {
  // Implement SNR calculation
  return 15; // Placeholder
}

function checkPeakConsistency(waveformData: any[]): number {
  // Implement peak consistency check
  return 0.7; // Placeholder
}

function checkFrequencySpectrum(frequencyData: any[]): boolean {
  // Implement frequency spectrum quality check
  return true; // Placeholder
}

export function processAudioData(channelData: Float32Array, sampleRate: number) {
  const waveformData = processTimeDomain(channelData, sampleRate);
  const frequencyData = processFrequencyDomain(channelData, sampleRate);
  const peaks = detectPeaks(waveformData);
  const heartRate = calculateHeartRate(peaks.s1, sampleRate);
  const hasAbnormalSounds = detectAbnormalSounds(frequencyData);
  const signalQuality = assessSignalQuality(waveformData, frequencyData);

  return {
    waveformData,
    frequencyData,
    peaks,
    heartRate,
    hasAbnormalSounds,
    signalQuality
  };
} 