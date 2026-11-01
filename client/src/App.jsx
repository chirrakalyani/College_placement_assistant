import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { DrivesPage } from './pages/DrivesPage';
import { ResumeReviewPage } from './pages/ResumeReviewPage';
import { InterviewSimulatorPage } from './pages/InterviewSimulatorPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { CounselorChatPage } from './pages/CounselorChatPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/drives" element={<DrivesPage />} />
              <Route path="/resume" element={<ResumeReviewPage />} />
              <Route path="/interview" element={<InterviewSimulatorPage />} />
              <Route path="/tracker" element={<ApplicationTrackerPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/advisor" element={<CounselorChatPage />} />
              <Route path="/settings" element={<ProfileSettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
