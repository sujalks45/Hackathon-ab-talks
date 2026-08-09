import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--color-bg-elevated)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-lg)'
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/day/:dayNumber" 
            element={
              <ProtectedRoute>
                <ChallengeDay />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
