// src/pages/Onboarding/OnboardingSuccess.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import Button from "../../components/common/Button";
import Logo from "../../assets/icons/logo.png";

const OnboardingSuccess = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen p-4 flex-1 flex flex-col items-center justify-center archivo">
      <div className="flex w-lg flex-col rounded-2xl items-center justify-center text-center p-6">
        <img src={Logo} alt="Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          You're all set!
        </h1>
        <p className="text-gray-600 text-sm mb-4 max-w-lg">
          Your account is ready. Start creating engaging newsletters.<br/>
          Connect with your audience and grow your brand!
        </p>
        <button
          onClick={handleGoToDashboard}
          className="bg-[#121212] max-w-70 p-2 text-white font-semibold text-xs rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200 uppercase tracking-wide"
        >
          Go to your newsletter dashboard
        </button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
