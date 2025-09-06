import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogInPage from './pages/Auth/LogInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import AccountInfoPage from './pages/Onboarding/AccountInfoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding/account-info" element={<AccountInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;