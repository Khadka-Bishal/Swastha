import React, { useState } from 'react';
import { FileHeart, Clock, MessageSquare, ArrowRight, Filter } from 'lucide-react';

const consultations = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    date: '2024-03-15',
    time: '09:30 AM',
    status: 'pending',
    heartRate: '75 BPM',
    type: 'Initial Consultation'
  },
  {
    id: 2,
    patientName: 'Michael Chen',
    date: '2024-03-15',
    time: '11:00 AM',
    status: 'in-progress',
    heartRate: '82 BPM',
    type: 'Follow-up'
  },
  {
    id: 3,
    patientName: 'Emily Williams',
    date: '2024-03-15',
    time: '02:15 PM',
    status: 'completed',
    heartRate: '68 BPM',
    type: 'Specialist Review'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export function Consultations() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
          <FileHeart className="h-5 w-5" />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border-gray-300 rounded-md text-sm focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="all">All Consultations</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <FileHeart className="h-6 w-6 text-rose-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {consultation.patientName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {consultation.date} at {consultation.time}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {consultation.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[consultation.status]}`}>
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <ArrowRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}