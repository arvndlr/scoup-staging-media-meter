import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import Button from "../../components/common/Button";
import YouTube from "../../assets/icons/youtube.svg?react";
import Reddit from "../../assets/icons/reddit.svg?react";
import Facebook from "../../assets/icons/facebook.svg?react";
import XTwitter from "../../assets/icons/x.svg?react";
import News from "../../assets/icons/news.svg?react";
import CheckBlue from "../../assets/icons/check-blue.svg?react";
import Plus from "../../assets/icons/plus.svg?react";
import Cross from "../../assets/icons/cross.svg?react";
import { useOnboardingStore } from "../../state/onboardingStore";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const account = useOnboardingStore((s) => s.account);
  const socialSources = useOnboardingStore((s) => s.socialSources);
  const publishers = useOnboardingStore((s) => s.publishers);
  const keywords = useOnboardingStore((s) => s.keywords);

  const connectedSources = useMemo(() => [
    { name: "X (Twitter) Influencers", count: socialSources.twitter?.length ?? 0, icon: XTwitter },
    { name: "Facebook Influencers",    count: socialSources.facebook?.length ?? 0, icon: Facebook },
    { name: "Reddit Influencers",      count: socialSources.reddit?.length ?? 0,   icon: Reddit },
    { name: "Youtube Influencers",     count: socialSources.youtube?.length ?? 0,  icon: YouTube },
    { name: "Publishers",              count: publishers?.length ?? 0,             icon: News },
  ], [socialSources, publishers]);

  const keywordCounts = useMemo(() => ({
    main: keywords?.main?.length ?? 0,
    additional: keywords?.additional?.length ?? 0,
    excluded: keywords?.excluded?.length ?? 0,
  }), [keywords]);

  const handleComplete = () => setShowSuccess(true);

  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => navigate("/onboarding/success"), 2000);
    return () => clearTimeout(t);
  }, [showSuccess, navigate]);

  const displayName  = `${account?.firstName || ""} ${account?.lastName || ""}`.trim() || "—";
  const displayEmail = "—"; // If you collect email on another step, wire it here
  const displayTitle = account?.jobTitle?.trim() || "—";

  return (
    <OnboardingLayout>
      <div className="p-4 flex-1 flex flex-col items-center justify-center archivo">
        <div className="flex w-xl justify-between items-center mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Review and Complete</h1>
            <p className="text-sm text-gray-500">Make sure everything's good to go</p>
          </div>
          <Button
            onClick={handleComplete}
            className="bg-[#121212] text-white max-w-30 font-semibold py-2 px-6 rounded-md shadow-md hover:bg-bg-[#121212] transition-colors duration-200"
          >
            Complete
          </Button>
        </div>

        <div className="w-xl grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Information</h3>
            <div className="flex flex-row gap-8 text-sm text-gray-600">
              <div className="flex flex-col min-w-wrap">
                <span className="font-medium text-gray-500">Name</span>
                <span>{displayName}</span>
              </div>
              <div className="flex flex-col min-w-wrap">
                <span className="font-medium text-gray-500">Email</span>
                <span>{displayEmail}</span>
              </div>
              <div className="flex flex-col min-w-wrap">
                <span className="font-medium text-gray-500">Job Title</span>
                <span>{displayTitle}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Connected Social Sources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Connected Social Sources</h3>
              <ul className="space-y-2">
                {connectedSources.map((source, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm text-gray-700">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                      <source.icon className="w-5 h-5 text-gray-600" />
                    </span>
                    <span>{source.count} {source.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Keywords</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm text-gray-700">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckBlue className="w-5 h-5" />
                  </div>
                  <span>{keywordCounts.main} Main Keywords</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-gray-700">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span>{keywordCounts.additional} Additional Keywords</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-gray-700">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <Cross className="w-3 h-3" />
                  </div>
                  <span>{keywordCounts.excluded} Excluded Keywords</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            All set! Redirecting…
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default ReviewPage;
