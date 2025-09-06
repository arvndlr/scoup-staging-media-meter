import React from 'react';
import OnboardingSteps from '../features/OnboardingSteps';

const OnboardingLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <OnboardingSteps />
      <main className="flex-1 flex items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;