// src/features/KeywordsTagInput.jsx

import React, { useState } from "react";

const KeywordsTagInput = ({ keywords, setKeywords, tagColor = "blue" }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      // Pass the updated list back to the parent component
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const colorClasses = {
    blue: "bg-[#eff6ff] text-[#001799]",
    green: "bg-[#ebffee] text-[#009951]",
    red: "bg-[#fee9e7] text-[#c92a28]",
  };

  const tagBgClass = colorClasses[tagColor] || "bg-gray-200 text-gray-800";

  return (
    <div className="w-full">
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 py-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className={`flex items-center uppercase text-sm font-semibold leading-relaxed px-2 rounded-full ${tagBgClass}`}
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        placeholder="Add main keywords here and press enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default KeywordsTagInput;
