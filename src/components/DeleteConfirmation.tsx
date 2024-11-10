import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-4 flex items-center gap-3 border-b border-gray-200">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Recording</h3>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600">
            Are you sure you want to delete this heartbeat recording? This action cannot be undone.
          </p>
        </div>

        <div className="p-4 bg-gray-50 flex items-center justify-end gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete Recording
          </button>
        </div>
      </div>
    </div>
  );
} 