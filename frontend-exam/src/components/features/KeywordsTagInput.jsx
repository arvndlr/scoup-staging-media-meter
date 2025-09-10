import React, { useState } from "react";
import { IconX } from '@tabler/icons-react';

const KeywordsTagInput = ({ keywords, setKeywords, tagColor = "blue" }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
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
              className={`flex items-center uppercase text-sm font-semibold leading-relaxed px-2 py-1 rounded-full ${tagBgClass} chivo-mono`}
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="ml-1 rounded-full p-1 "
                style={{
                  backgroundColor:
                    tagColor === "blue"
                      ? "#d1e0ff"
                      : tagColor === "green"
                      ? "#b2e8c2"
                      : tagColor === "red"
                      ? "#ffd8d6"
                      : "#e5e7eb",
                }}
              >
                <IconX
                  stroke={4}
                  className="w-2 h-2"
                  style={{
                    color:
                      tagColor === "blue"
                        ? "#001799"
                        : tagColor === "green"
                        ? "#009951"
                        : tagColor === "red"
                        ? "#c92a28"
                        : "#6b7280",
                  }}
                />
              </button>
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
        className="w-full bg-transparent py-2 text-sm text-[#a5a59b] placeholder-[#a5a59b] focus:outline-none"
      />
    </div>
  );
};

export default KeywordsTagInput;
