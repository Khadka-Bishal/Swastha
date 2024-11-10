import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Consultations } from './pages/Consultations';
import { Tutorial } from './pages/Tutorial';
import { Profile } from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignIn from './pages/SignIn';
import { Heart } from 'lucide-react';
import { Recordings } from './pages/Recordings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Navigation />
            </div>
          </header>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <Dashboard />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/recordings"
                element={
                  <PrivateRoute>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <Recordings />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/consultations"
                element={
                  <PrivateRoute>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <Consultations />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/tutorial"
                element={
                  <PrivateRoute>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <Tutorial />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <Profile />
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          <footer className="bg-gray-900 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <Heart className="h-8 w-8 text-rose-500" />
                  <span className="text-2xl font-bold text-white">Swastha</span>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Making cardiac care accessible to everyone, everywhere.
                </p>

                <div className="mt-8 flex space-x-6">
                  <a href="#" className="text-sm text-gray-300 hover:text-white">
                    Contact
                  </a>
                  <a href="#" className="text-sm text-gray-300 hover:text-white">
                    FAQ
                  </a>
                  <a href="#" className="text-sm text-gray-300 hover:text-white">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-gray-300 hover:text-white">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-gray-300 hover:text-white">
                    Cookie Policy
                  </a>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8 w-full text-center">
                  <p className="text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Swastha, Inc. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;