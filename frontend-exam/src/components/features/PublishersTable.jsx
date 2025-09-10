// src/components/features/PublishersTable.jsx

import React from "react";
import Table from "../common/Table";
import { IconArrowDown } from "@tabler/icons-react";

const PublishersTable = ({ publishers, setPublishers }) => {
  const handleUpdatePublisher = (id, field, value) => {
    setPublishers(
      publishers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto w-2xl">
        <Table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-[#edece5]">
              <th className="w-12 px-4 py-2 font-bold text-gray-600 rounded-tl-lg"></th>
              <th className="flex-1 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>WEBSITE LINK</span>
                  <IconArrowDown stroke={2} className="w-4 h-4" />
                </div>
              </th>
              <th className="flex-1 px-4 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>PUBLICATION NAME</span>
                  <IconArrowDown stroke={2} className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publishers.map((publisher, index) => {
              const isLastRow = index === publishers.length - 1;
              const rowClasses = `${
                index % 2 === 0 ? "bg-white" : "bg-[#f5f4ed]"
              } ${isLastRow ? "rounded-b-lg" : ""}`;

              return (
                <tr key={publisher.id || index} className={rowClasses}>
                  <td
                    className={`px-4 py-2 text-sm text-[#262625] ${
                      isLastRow ? "rounded-bl-lg" : ""
                    }`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`py-2 text-sm text-[#262625] ${
                      isLastRow ? "rounded-bl-lg" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <a
                        href={publisher.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#262625] text-sm hover:underline"
                      >
                        {publisher.websiteLink}
                      </a>
                    </div>
                  </td>
                  <td
                    className={`px-4 py-2 text-sm text-[#262625] ${
                      isLastRow ? "rounded-br-lg" : ""
                    }`}
                  >
                    {publisher.publicationName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PublishersTable;
