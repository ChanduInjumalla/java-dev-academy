import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UltimateDashboard from './components/dashboard/UltimateDashboard';
import DayView from './components/day/DayView';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserProfile from './pages/profile/UserProfile';
import SettingsPage from './pages/settings/SettingsPage';
import LeaderboardPage from './pages/leaderboard/LeaderboardPage';
import CertificatePage from './pages/CertificatePage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<UltimateDashboard />} />
            <Route path="course/:dayId" element={<DayView />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="certificate" element={<CertificatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
