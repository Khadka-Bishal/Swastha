import React, { useState, useRef, useEffect } from 'react';
import { RecordingsList } from '../components/RecordingsList';
import { Recording } from '../types';
import { Mic, X, Clock } from 'lucide-react';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ChatBot } from '../components/ChatBot';

interface RecordingsProps {
  username: string;
}

declare global {
  interface MediaRecorder {
    isCancelled?: boolean;
  }
}

export function Recordings({  }: RecordingsProps) {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownRef = useRef<NodeJS.Timer | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0 && !mediaRecorder.isCancelled) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          const userRecordingCount = recordings.filter(r => 
            r.name.startsWith(`Recording`)
          ).length;

          const newRecording: Recording = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            audioBlob: audioBlob,
            name: `Recording ${userRecordingCount + 1}`,
            duration: 5
          };

          setRecordings(prev => [...prev, newRecording]);
        }
        
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setCountdown(5);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCountdown(5);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            stopRecording(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = (isCancelled: boolean = false) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.isCancelled = isCancelled;
      mediaRecorderRef.current.stop();
      
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    }
  };

  const cancelRecording = () => {
    stopRecording(true);
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    if (showDeleteConfirmation) {
      setRecordings(prev => prev.filter(r => r.id !== showDeleteConfirmation));
      setShowDeleteConfirmation(null);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ChatBot />

      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
              <Clock className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-600">{countdown}s</div>
              {isRecording && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-600 font-medium">Recording in progress</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isRecording ? (
              <button
                onClick={cancelRecording}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
                Cancel Recording
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm rounded-lg hover:bg-rose-700"
              >
                <Mic className="h-4 w-4" />
                Start Recording
              </button>
            )}
          </div>
        </div>

        {isRecording && (
          <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
            <p className="text-sm text-amber-800 flex items-center gap-2">
              <span className="font-medium">Note:</span>
              Recording will be saved after 5 seconds. Click cancel to discard.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Saved Recordings</h2>
        </div>
        
        <div className="p-4">
          <RecordingsList
            recordings={recordings}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirmation(null)}
        />
      )}
    </div>
  );
}