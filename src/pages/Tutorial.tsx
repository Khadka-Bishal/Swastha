import React from 'react';
import { Play, CheckCircle } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Preparing the DGscope',
    description: 'Learn how to properly sanitize and prepare your DGscope for use.',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=800',
    videoUrl: '#step-1'
  },
  {
    title: 'Correct Placement',
    description: 'Guide to finding the right auscultation points on your body.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    videoUrl: '#step-2'
  },
  {
    title: 'Recording Heart Sounds',
    description: 'Step-by-step process for recording clear heart sounds.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    videoUrl: '#step-3'
  },
  {
    title: 'Sending Recordings',
    description: 'How to properly save and send your recordings to your healthcare provider.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    videoUrl: '#step-4'
  }
];

export function Tutorial() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">How to Use DGscope</h1>
        <p className="text-gray-600 mb-6">
          Follow this comprehensive guide to learn how to properly use your DGscope for remote heart monitoring.
        </p>
        
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <Play className="h-16 w-16 text-rose-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorialSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={step.imageUrl}
              alt={step.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                  <button className="mt-4 inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700">
                    <Play className="h-4 w-4" />
                    <span>Watch Guide</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}