// src/pages/Onboarding/ReviewPage.jsx

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import Button from "../../components/common/Button";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  // Mock data to match the design. In a real application, you would
  // get this data from a global state management system (like Redux,
  // Context API) or from a previous form submission.
  const accountInfo = {
    name: "Maricel Alonzo",
    email: "maricel.alonzo@gmail.com",
    jobTitle: "Marketing Strategist",
  };

  const connectedSources = [
    { name: "X (Twitter) Influencers", count: 54, icon: "X" },
    { name: "Facebook Influencers", count: 36, icon: "Facebook" },
    { name: "Reddit Influencers", count: 29, icon: "Reddit" },
    { name: "Youtube Influencers", count: 12, icon: "YouTube" },
    { name: "Publishers", count: 67, icon: "P" },
  ];

  const keywords = {
    main: 41,
    additional: 36,
    excluded: 29,
  };

  const handleComplete = () => {
    // Show the success message and then start the timer for redirect
    setShowSuccess(true);
  };

  // This effect runs whenever showSuccess changes
  useEffect(() => {
    if (showSuccess) {
      // Set a timer to redirect after 2 seconds
      const timer = setTimeout(() => {
        navigate("/onboarding/success"); // Redirect to the success page
      }, 2000); // 2000 milliseconds = 2 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  return (
    <OnboardingLayout>
      <div className="flex w-140 justify-between items-center mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Review and Complete
          </h1>
          <p className="text-sm text-gray-500">
            Make sure everything's good to go
          </p>
        </div>
        <Button
          onClick={handleComplete}
          className="bg-gray-800 text-white max-w-30 font-semibold py-2 px-6 rounded-md shadow-md hover:bg-gray-900 transition-colors duration-200"
        >
          Complete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
        {/* Account Information Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Account Information
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Name</span>
              <span>{accountInfo.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Email</span>
              <span>{accountInfo.email}</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span className="font-medium text-gray-500">Job Title</span>
              <span>{accountInfo.jobTitle}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Connected Social Sources Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Connected Social Sources
            </h3>
            <ul className="space-y-3">
              {connectedSources.map((source, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-700"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 font-bold text-xs">
                    {source.icon}
                  </span>
                  <span>
                    {source.count} {source.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Keywords
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-gray-700">
                <span className="text-green-500 font-bold text-lg">⁺</span>
                <span>{keywords.main} Main Keywords</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-700">
                <span className="text-blue-500 font-bold text-lg">⁺</span>
                <span>{keywords.additional} Additional Keywords</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-700">
                <span className="text-red-500 font-bold text-lg">ˣ</span>
                <span>{keywords.excluded} Excluded Keywords</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ReviewPage;
