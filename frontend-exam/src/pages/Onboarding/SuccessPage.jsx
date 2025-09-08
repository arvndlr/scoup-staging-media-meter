// src/pages/Onboarding/OnboardingSuccess.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import Button from '../../components/common/Button';

const OnboardingSuccess = () => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <OnboardingLayout hideSidebar>
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="bg-white rounded-full p-4 mb-6 shadow-md">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">You're all set!</h1>
                <p className="text-gray-600 mb-8 max-w-lg">
                    Your account is ready. Start creating engaging newsletters. Connect with your audience and grow your brand!
                </p>
                <Button 
                    onClick={handleGoToDashboard}
                    className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-900 transition-colors duration-200 uppercase tracking-wide"
                >
                    Go to your newsletter dashboard
                </Button>
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingSuccess;