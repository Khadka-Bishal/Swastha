import React from 'react';
import { HeartbeatChart } from '../components/HeartbeatChart';
import { Activity, Users, Stethoscope, Clock } from 'lucide-react';

const dummyHeartbeatData = {
  labels: Array.from({ length: 50 }, (_, i) => i),
  datasets: [{
    data: Array.from({ length: 50 }, () => 60 + Math.random() * 40),
    borderColor: 'rgb(220, 38, 38)',
    tension: 0.4,
  }]
};

const stats = [
  { title: 'Active Patients', value: '24', icon: Users },
  { title: 'Pending Reviews', value: '7', icon: Clock },
  { title: 'Today\'s Consultations', value: '12', icon: Stethoscope },
  { title: 'Average BPM', value: '72', icon: Activity },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-12 w-12 text-rose-600 opacity-75" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Real-time Heartbeat Monitor</h2>
        <div className="h-[400px]">
          <HeartbeatChart data={dummyHeartbeatData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Patient #{i}</p>
                  <p className="text-sm text-gray-600">Last updated 2h ago</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
              <Stethoscope className="h-6 w-6 text-rose-600 mb-2" />
              <p className="font-medium text-gray-900">New Consultation</p>
            </button>
            <button className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Patient Directory</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}