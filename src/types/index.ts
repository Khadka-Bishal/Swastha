export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'specialist' | 'patient';
  hospital?: string;
  specialization?: string;
}

export interface HeartbeatRecord {
  id: string;
  patientId: string;
  doctorId: string;
  timestamp: string;
  audioUrl: string;
  readings: number[];
  analysis?: {
    bpm: number;
    irregularities: string[];
    prediction: string;
  };
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  specialistId?: string;
  status: 'pending' | 'in-progress' | 'completed';
  heartbeatRecordId: string;
  primaryDiagnosis?: string;
  specialistOpinion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  steps: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface Recording {
  id: string;
  timestamp: string;
  duration: number;
  waveform: number[];
  audioBlob: Blob;
  name: string;
  status?: 'pending' | 'sent' | 'analyzed';
}