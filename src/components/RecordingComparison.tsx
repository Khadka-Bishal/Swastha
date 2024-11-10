import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { Recording } from '../types';
import { HeartSoundAnalysis } from './HeartSoundAnalysis';

interface ComparisonProps {
  recording1: Recording;
  recording2: Recording;
  onClose: () => void;
}

export function RecordingComparison({ recording1, recording2, onClose }: ComparisonProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] max-w-7xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recording Comparison</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-lg font-medium text-gray-900">
              {recording1.name}
              <span className="text-sm text-gray-500 ml-2">
                {new Date(recording1.timestamp).toLocaleString()}
              </span>
            </div>
            <HeartSoundAnalysis audioBlob={recording1.audioBlob} />
          </div>

          <div className="space-y-4">
            <div className="text-lg font-medium text-gray-900">
              {recording2.name}
              <span className="text-sm text-gray-500 ml-2">
                {new Date(recording2.timestamp).toLocaleString()}
              </span>
            </div>
            <HeartSoundAnalysis audioBlob={recording2.audioBlob} />
          </div>
        </div>
      </div>
    </div>
  );
} 