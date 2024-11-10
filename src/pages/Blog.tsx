import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Advancing Remote Cardiac Care',
    excerpt: 'How Swastha is revolutionizing heart monitoring through innovative technology.',
    author: 'Dr. Sarah Johnson',
    date: 'October 15, 2023',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'The Future of Telemedicine',
    excerpt: 'Exploring the impact of remote monitoring on cardiac healthcare delivery.',
    author: 'Dr. Michael Chen',
    date: 'October 10, 2023',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Patient Success Stories',
    excerpt: 'Real experiences from patients using Swastha for heart monitoring.',
    author: 'Emma Williams',
    date: 'October 5, 2023',
    category: 'Stories',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  }
];

// First approach: Default export
const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-rose-600 font-medium mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              <button className="mt-4 inline-flex items-center text-rose-600 hover:text-rose-700">
                Read More <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 