import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NutritionPage from './pages/NutritionPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AICoachPage from './pages/AICoachPage';
import CommunityPage from './pages/CommunityPage';
import SmartFeaturesPage from './pages/SmartFeaturesPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="nutrition" element={<ProtectedRoute><NutritionPage /></ProtectedRoute>} />
            <Route path="workouts" element={<ProtectedRoute><WorkoutsPage /></ProtectedRoute>} />
            <Route path="ai-coach" element={<ProtectedRoute><AICoachPage /></ProtectedRoute>} />
            <Route path="community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="smart-features" element={<ProtectedRoute><SmartFeaturesPage /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
