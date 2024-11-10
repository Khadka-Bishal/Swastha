import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, UserCircle, Heart, LogOut, Info, Newspaper, FileAudio } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../utils/firebase';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiresAuth: true },
  { name: 'Recordings', href: '/recordings', icon: FileAudio, requiresAuth: true },
  { name: 'Consultations', href: '/consultations', icon: Users, requiresAuth: true },
  { name: 'Tutorial', href: '/tutorial', icon: BookOpen, requiresAuth: true },
  { name: 'Profile', href: '/profile', icon: UserCircle, requiresAuth: true },
];

const publicNavItems = [
  { name: 'Features', href: '/#features', icon: Info },
  { name: 'Blog', href: '/#blog', icon: Newspaper },
];

export function Navigation() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-rose-600" />
          <span className="text-xl font-bold text-gray-900">Swastha</span>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {user ? (
            // Authenticated Navigation
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {publicNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
              <Link
                to="/signin"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                <UserCircle className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}