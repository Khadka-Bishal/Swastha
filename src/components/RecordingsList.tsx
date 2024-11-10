import React, { useState } from 'react';
import { Recording } from '../types';
import { Trash2, Play, Pause, GitCompare, ChevronDown, ChevronUp } from 'lucide-react';
import { HeartSoundAnalysis } from './HeartSoundAnalysis';
import { RecordingComparison } from './RecordingComparison';

interface RecordingsListProps {
  recordings: Recording[];
  onDelete: (id: string) => void;
}

export function RecordingsList({ recordings, onDelete }: RecordingsListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleComparisonSelect = (recordingId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(recordingId)) {
        return prev.filter(id => id !== recordingId);
      }
      if (prev.length < 2) {
        return [...prev, recordingId];
      }
      return [prev[1], recordingId];
    });
  };

  const toggleDetails = (recordingId: string) => {
    setSelectedId(prev => prev === recordingId ? null : recordingId);
  };

  const startComparison = () => {
    if (selectedForComparison.length === 2) {
      setShowComparison(true);
    }
  };

  const togglePlay = async (recording: Recording, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying[recording.id]) {
      audioElements[recording.id]?.pause();
      setIsPlaying(prev => ({ ...prev, [recording.id]: false }));
    } else {
      const audio = new Audio(URL.createObjectURL(recording.audioBlob));
      audio.onended = () => {
        setIsPlaying(prev => ({ ...prev, [recording.id]: false }));
      };
      setAudioElements(prev => ({ ...prev, [recording.id]: audio }));
      await audio.play();
      setIsPlaying(prev => ({ ...prev, [recording.id]: true }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between gap-4">
          {/* Individual Analysis Info */}
          <span className="text-sm text-gray-600">
            Click any recording for temporal patterns, heart rate, and abnormal sound detection
          </span>

          <div className="h-8 w-px bg-gray-200" />

          <span className="text-sm text-gray-600">
            Select two recordings ({selectedForComparison.length}/2) to compare waveforms and measurements
          </span>
        </div>
      </div>

      {recordings.length > 1 && selectedForComparison.length > 0 && (
        <button
          onClick={startComparison}
          disabled={selectedForComparison.length !== 2}
          className={
            selectedForComparison.length === 2
              ? 'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700'
              : 'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        >
          <GitCompare className="h-4 w-4" />
          Compare Selected Recordings
        </button>
      )}

      {recordings.map((recording) => (
        <div 
          key={recording.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div 
            onClick={() => toggleDetails(recording.id)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center" onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedForComparison.includes(recording.id)}
                  onChange={() => handleComparisonSelect(recording.id)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
              </div>

              <button
                onClick={(e) => togglePlay(recording, e)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
              >
                {isPlaying[recording.id] ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* Recording Info */}
              <div>
                <div className="font-medium">{recording.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(recording.timestamp).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(recording.id);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>

              {selectedId === recording.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          {selectedId === recording.id && (
            <div className="border-t border-gray-100 p-4">
              <HeartSoundAnalysis audioBlob={recording.audioBlob} />
            </div>
          )}
        </div>
      ))}

      {showComparison && selectedForComparison.length === 2 && (
        <RecordingComparison
          recording1={recordings.find(r => r.id === selectedForComparison[0])!}
          recording2={recordings.find(r => r.id === selectedForComparison[1])!}
          onClose={() => {
            setShowComparison(false);
            setSelectedForComparison([]);
          }}
        />
      )}
    </div>
  );
} 