import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NutritionPage from './pages/NutritionPage';
import WorkoutsPage from './pages/WorkoutsPage';
import AICoachPage from './pages/AICoachPage';
import CommunityPage from './pages/CommunityPage';
import SmartFeaturesPage from './pages/SmartFeaturesPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="nutrition" element={<NutritionPage />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="ai-coach" element={<AICoachPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="smart-features" element={<SmartFeaturesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
