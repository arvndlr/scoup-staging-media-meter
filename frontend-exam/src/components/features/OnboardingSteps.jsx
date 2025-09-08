import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/icons/logo.png";

// Use the ?react suffix to import SVGs as components
import UserIcon from "../../assets/icons/user.svg?react";
import HashtagIcon from "../../assets/icons/hashtag.svg?react";
import AtSymbolIcon from "../../assets/icons/at-symbol.svg?react";
import DocumentIcon from "../../assets/icons/document-text.svg?react";
import CheckCircleIcon from "../../assets/icons/check.svg?react";
import LogoHover from "../../assets/icons/scoup-logo.svg";
import PublisherIcon from "../../assets/icons/publisher.svg?react";

const OnboardingSteps = () => {
  const location = useLocation();

  const getStatus = (path) => {
    const routes = [
      "account-info",
      "keywords",
      "sources",
      "publishers",
      "review",
      "success",
    ];
    const currentPath = location.pathname.split("/").pop();
    const currentIndex = routes.indexOf(currentPath);
    const pathIndex = routes.indexOf(path);

    if (pathIndex < currentIndex) {
      return "complete";
    } else if (pathIndex === currentIndex) {
      return "active";
    } else {
      return "incomplete";
    }
  };

  const steps = [
    { name: "Account", path: "account-info", icon: UserIcon },
    { name: "Keywords", path: "keywords", icon: HashtagIcon },
    { name: "Sources", path: "sources", icon: AtSymbolIcon },
    { name: "Publishers", path: "publishers", icon: PublisherIcon },
    { name: "Review", path: "review", icon: DocumentIcon  },
  ];

  return (
    <aside className="bg-white w-wrap min-h-screen p-4 border-r border-gray-200">
      <div className="flex items-center space-x-2 mb-2 group"> 
        <img src={Logo} alt="Logo" className="h-8 w-8 group-hover:hidden" />
        <img src={LogoHover} alt="Hover Logo" className="h-8 w-auto hidden group-hover:block" />
      </div>
      <nav className="space-y-1">
        {steps.map((step) => {
          const status = getStatus(step.path);
          const isActive = status === "active";
          const isComplete = status === "complete";

          return (
            <div key={step.name} className="flex items-center space-x-4 group">
              <div
                className={`
                  w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                  ${
                    isComplete
                      ? "bg-white-900 text-white-900"
                      : isActive
                      ? "bg-gray-200 text-white"
                      : "bg-white-200 text-gray-500"
                  }
                `}
              >
                {isComplete ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 transition-all duration-300 overflow-hidden">
                <NavLink
                  to={`/onboarding/${step.path}`}
                  className={`
                    whitespace-nowrap 
                    text-sm font-semibold 
                    ${isActive ? "text-black" : "text-gray-500"} 
                  `}
                >
                  {step.name}
                </NavLink>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default OnboardingSteps;