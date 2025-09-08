// src/components/features/SocialSourcesTable.jsx

import React from "react";
import Table from "../common/Table";
import { IconArrowDown } from "@tabler/icons-react";
import { useState } from "react";

const SocialSourcesTable = ({ sources, setSources }) => {
  // Note: The handleInputChange and handleAddRow functions are no longer needed
  // for this static, read-only table view.
  // If you need to add functionality to handle user input, you can re-introduce it.

  const tableHeaders = ["X (Twitter)", "Facebook", "Reddit", "YouTube"];
  const [rowsToAdd, setRowsToAdd] = useState(1); // State for the number of rows to add

  const handleAddRows = () => {
    const newSources = [];
    for (let i = 0; i < rowsToAdd; i++) {
      newSources.push({
        twitter: "",
        facebook: "",
        reddit: "",
        youtube: "",
      });
    }
    setSources([...sources, ...newSources]);
  };

  return (
    <div className="overflow-x-auto max-w-5xl">
      <Table>
        <thead>
          <tr className="bg-[#edece5]">
            <th className="px-4 py-2 font-medium text-gray-600 rounded-tl-lg"></th>
            {tableHeaders.map((header, index) => (
              <th
                key={header}
                className={`px-4 py-2 font-bold text-gray-600 ${
                  index === tableHeaders.length - 1 ? "rounded-tr-lg" : ""
                }`}
              >
                <div className="flex items-center space-x-1">
                  <span>{header}</span>
                  {/* Sort icon from Heroicons */}
                  <IconArrowDown stroke={2} className="w-4 h-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sources.map((source, index) => {
            const isLastRow = index === sources.length - 1;
            const rowClasses = `
      ${index % 2 === 0 ? "bg-white" : "bg-[#f5f4ed]"} 
      ${isLastRow ? "rounded-b-lg" : ""}
    `;

            return (
              <tr key={index} className={rowClasses}>
                <td
                  className={`px-4 py-2 text-sm text-[#262625] ${
                    isLastRow ? "rounded-bl-lg" : ""
                  }`}
                >
                  {index + 1}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={source.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#262625] text-sm hover:underline"
                  >
                    {source.twitter}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={source.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#262625] text-sm hover:underline"
                  >
                    {source.facebook}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={source.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#262625] text-sm hover:underline"
                  >
                    {source.reddit}
                  </a>
                </td>
                <td className={`px-4 py-2 ${isLastRow ? "rounded-br-lg" : ""}`}>
                  <a
                    href={source.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#262625] text-sm hover:underline"
                  >
                    {source.youtube}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="fixed w-4xl bottom-0 left-auto right-auto p-4 bg-white shadow-lg flex items-center justify-start border-t border-gray-200">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <button
            onClick={handleAddRows}
            className="font-semibold text-gray-500 hover:text-gray-900"
          >
            Add
          </button>
          <input
            type="number"
            defaultValue="1"
            value={rowsToAdd}
            onChange={(e) => setRowsToAdd(parseInt(e.target.value))}
            className="w-16 p-1 border border-gray-300 rounded-md text-center"
          />
          <span>more rows</span>
        </div>
      </div>
    </div>
  );
};

export default SocialSourcesTable;
