import React from 'react';
import { User, Mail, Building2, Award, Settings, Bell } from 'lucide-react';

const doctorProfile = {
  name: 'Dr. Sarah Mitchell',
  email: 'dr.mitchell@dghealth.com',
  hospital: 'Central Regional Hospital',
  specialization: 'Cardiology',
  role: 'Remote Specialist',
  experience: '8 years'
};

export function Profile() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-8 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 bg-rose-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-rose-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctorProfile.name}</h1>
              <p className="text-gray-600">{doctorProfile.role}</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                  {doctorProfile.specialization}
                </span>
                <span className="text-gray-500 text-sm">{doctorProfile.experience} experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{doctorProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Hospital</p>
                <p className="text-gray-900">{doctorProfile.hospital}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Account Settings</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Notifications</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-4">
            {['Board Certified Cardiologist', 'Telemedicine Certified', 'DGscope Specialist'].map((cert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-rose-600" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}