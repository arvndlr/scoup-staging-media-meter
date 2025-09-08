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
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
                
                {/* Header Section (Title and Button) */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Keywords</h2>
                        <p className="text-sm text-gray-600">
                            Setup the keywords needed for the content
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={handleComplete}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Complete
                    </Button>
                </div>
                
                
                
                {/* Main Keywords Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Main Keywords</h3>
                    <p className="text-sm text-gray-500 mb-2">
                        Add main keywords here and press enter
                    </p>
                    <KeywordsTagInput 
                        keywords={mainKeywords} 
                        setKeywords={setMainKeywords} 
                        tagColor="blue" 
                    />
                </div>

                {/* Additional Keywords Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Keywords</h3>
                    <p className="text-sm text-gray-500 mb-2">
                        Add additional keywords here and press enter
                    </p>
                    <KeywordsTagInput 
                        keywords={additionalKeywords} 
                        setKeywords={setAdditionalKeywords} 
                        tagColor="green" 
                    />
                </div>

                {/* Excluded Keywords Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Excluded Keywords</h3>
                    <p className="text-sm text-gray-500 mb-2">
                        Add excluded keywords here and press enter
                    </p>
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