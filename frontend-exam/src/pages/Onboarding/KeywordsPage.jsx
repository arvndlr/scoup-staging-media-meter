// src/pages/Onboarding/KeywordsPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import KeywordsTagInput from "../../components/features/KeywordsTagInput";

const KeywordsPage = () => {
  const navigate = useNavigate();

  // State for each list of keywords
  const [mainKeywords, setMainKeywords] = useState([]);
  const [additionalKeywords, setAdditionalKeywords] = useState([]);
  const [excludedKeywords, setExcludedKeywords] = useState([]);

  const handleComplete = () => {
    const allKeywords = {
      main: mainKeywords,
      additional: additionalKeywords,
      excluded: excludedKeywords,
    };
    console.log("Final Keywords:", allKeywords);
    navigate("/onboarding/sources");
  };

  return (
    <OnboardingLayout>
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        {/* Header Section (Title and Button) */}
        <div className="w-3xl flex justify-between items-center mb-2">
          <div >
            <h2 className="text-xl font-bold">Keywords</h2>
            <p className="text-sm text-gray-600">
              Setup the keywords needed for the content
            </p>
          </div>
          <Button
            type="button"
            onClick={handleComplete}
            className="bg-[#cac9c7] text-white-800 max-w-30 hover:bg-[#141413]"
          >
            Complete
          </Button>
        </div>
      </div>

      <div className="max-w-3xl h-150 min-h-3xl mx-auto bg-white p-6 pb-8 rounded-3xl shadow-md space-y-6">
        <span className="text-sm">Keywords Preview</span>
        {/* Main Keywords Section */}
        <div className="px-10 mt-8 mb-8">    
          <h3 className="text-md font-semibold">Main Keywords</h3>
          <KeywordsTagInput
            keywords={mainKeywords}
            setKeywords={setMainKeywords}
            tagColor="blue"
          />
        </div>

        {/* Additional Keywords Section */}
        <div className="px-10 mb-8">
          <h3 className="text-md font-semibold">Additional Keywords</h3>
          <KeywordsTagInput
            keywords={additionalKeywords}
            setKeywords={setAdditionalKeywords}
            tagColor="green"
          />
        </div>

        {/* Excluded Keywords Section */}
        <div className="px-10 mb-8">
          <h3 className="text-md font-semibold">Excluded Keywords</h3>
          <KeywordsTagInput
            keywords={excludedKeywords}
            setKeywords={setExcludedKeywords}
            tagColor="red"
          />
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default KeywordsPage;
