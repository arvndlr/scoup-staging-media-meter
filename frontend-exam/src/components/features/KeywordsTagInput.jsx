// src/features/KeywordsTagInput.jsx

import React, { useState } from 'react';

const KeywordsTagInput = ({ keywords, setKeywords, tagColor = 'blue' }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            // Pass the updated list back to the parent component
            setKeywords([...keywords, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeKeyword = (indexToRemove) => {
        setKeywords(keywords.filter((_, index) => index !== indexToRemove));
    };

    const colorClasses = {
        blue: 'bg-blue-200 text-blue-800',
        green: 'bg-green-200 text-green-800',
        red: 'bg-red-200 text-red-800',
    };

    const tagBgClass = colorClasses[tagColor] || 'bg-gray-200 text-gray-800';

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${tagBgClass}`}
                    >
                        {keyword}
                        <button
                            type="button"
                            onClick={() => removeKeyword(index)}
                            className="ml-1 text-gray-500 hover:text-gray-900 focus:outline-none"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                placeholder="Add keywords here and press enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
        </div>
    );
};

export default KeywordsTagInput;