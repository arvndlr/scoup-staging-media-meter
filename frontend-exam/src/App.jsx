import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogInPage from './pages/Auth/LogInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import AccountInfoPage from './pages/Onboarding/AccountInfoPage';
import KeywordsPage from './pages/Onboarding/KeywordsPage';
import SourcePage from './pages/Onboarding/SourcesPage';
import PublishersPage from './pages/Onboarding/PublishersPage';
import ReviewPage from './pages/Onboarding/ReviewPage';
import SuccessPage from './pages/Onboarding/SuccessPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding/account-info" element={<AccountInfoPage />} />
        <Route path="/onboarding/keywords" element={<KeywordsPage />} />
        <Route path="/onboarding/sources" element={<SourcePage />} />
        <Route path="/onboarding/publishers" element={<PublishersPage />} />
        <Route path="/onboarding/review" element={<ReviewPage />} />
        <Route path="/onboarding/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;