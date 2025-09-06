import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/logo.png';

// Use the ?react suffix to import SVGs as components
import UserIcon from '../../assets/icons/user.svg?react';
import HashtagIcon from '../../assets/icons/hashtag.svg?react';
import AtSymbolIcon from '../../assets/icons/at-symbol.svg?react';
import DocumentIcon from '../../assets/icons/document-text.svg?react';
import CheckCircleIcon from '../../assets/icons/check-circle.svg?react';

const OnboardingSteps = () => {
  const location = useLocation();

  const getStatus = (path) => {
    const routes = ['account-info', 'keywords', 'sources', 'publishers', 'review', 'success'];
    const currentPath = location.pathname.split('/').pop();
    const currentIndex = routes.indexOf(currentPath);
    const pathIndex = routes.indexOf(path);

    if (pathIndex < currentIndex) {
      return 'complete';
    } else if (pathIndex === currentIndex) {
      return 'active';
    } else {
      return 'incomplete';
    }
  };

  const steps = [
    { name: 'Account Information', path: 'account-info', icon: UserIcon },
    { name: 'Keywords', path: 'keywords', icon: HashtagIcon },
    { name: 'Sources', path: 'sources', icon: AtSymbolIcon },
    { name: 'Publishers', path: 'publishers', icon: DocumentIcon },
    { name: 'Review', path: 'review', icon: CheckCircleIcon },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen p-6 border-r border-gray-200">
      <div className="flex items-center space-x-2 mb-10">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">SCOUP</span>
      </div>
      <nav className="space-y-4">
        {steps.map((step) => {
          const status = getStatus(step.path);
          const isActive = status === 'active';
          const isComplete = status === 'complete';
          
          return (
            <div key={step.name} className="flex items-center space-x-4">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isComplete ? 'bg-green-500 text-white' : isActive ? 'bg-gray-200 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {isComplete ? <CheckCircleIcon className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <NavLink 
                to={`/onboarding/${step.path}`} 
                className={`text-lg font-semibold ${isActive ? 'text-black' : 'text-gray-500'}`}
              >
                {step.name}
              </NavLink>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default OnboardingSteps;