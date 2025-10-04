import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DailyTargetsPage from './pages/DailyTargetsPage/DailyTargetsPage';
import QuizPage from './pages/QuizPage/QuizPage';
import ProgressTrackerPage from './pages/ProgressTrackerPage/ProgressTrackerPage';
import WeakAreasPage from './pages/WeakAreasPage/WeakAreasPage';
import AchievementsPage from './pages/AchievementsPage/AchievementsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className="bg-blue-500 text-white text-center p-4">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-targets" element={<DailyTargetsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/progress-tracker" element={<ProgressTrackerPage />} />
            <Route path="/weak-areas" element={<WeakAreasPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            <Route path="/user-profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
