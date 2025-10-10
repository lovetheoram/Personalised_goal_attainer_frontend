import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DailyTargetsPage from "./pages/DailyTargetsPage/DailyTargetsPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ProgressTrackerPage from "./pages/ProgressTrackerPage/ProgressTrackerPage";
import WeakAreasPage from "./pages/WeakAreasPage/WeakAreasPage";
import AchievementsPage from "./pages/AchievementsPage/AchievementsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import ExamTrackerPage from "./pages/ExamTrackerPage/ExamTrackerPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing / Public page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-targets" element={<DailyTargetsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/exam-tracker" element={<ExamTrackerPage/>}/>
            <Route path="/progress-tracker" element={<ProgressTrackerPage />} />
            <Route path="/weak-areas" element={<WeakAreasPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
