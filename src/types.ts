export interface Recording {
  id: string;
  timestamp: string;
  audioBlob: Blob;
  name: string;
  duration: number;
} 