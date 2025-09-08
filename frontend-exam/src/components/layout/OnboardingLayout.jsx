import React from 'react';
import OnboardingSteps from '../features/OnboardingSteps';

const OnboardingLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* The sidebar wrapper with the 'fixed' and 'group' classes */}
      <div className="group fixed top-0 left-0 bottom-0 z-10 transition-all duration-300 hover:w-44 w-17">
        <OnboardingSteps />
      </div>
      <main className="flex-1 flex flex-col items-center justify-start p-8 ml-20 group-hover:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;