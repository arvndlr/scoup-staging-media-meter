// src/components/features/SocialSourcesTable.jsx

import React from 'react';
import Table from '../common/Table';

const SocialSourcesTable = ({ sources, setSources }) => {
    // Note: The handleInputChange and handleAddRow functions are no longer needed
    // for this static, read-only table view.
    // If you need to add functionality to handle user input, you can re-introduce it.

    const tableHeaders = ['X (Twitter)', 'Facebook', 'Reddit', 'YouTube'];

    return (
        <div className="overflow-x-auto">
            <Table>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 font-medium text-gray-600">#</th>
                        {tableHeaders.map((header) => (
                            <th key={header} className="px-4 py-2 font-medium text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <span>{header}</span>
                                    {/* Sort icon from Heroicons */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.8 8.2a.75.75 0 011.1 1.02l-3.25 3.5a.75.75 0 01-1.1-1.02l3.25-3.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sources.map((source, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                            <td className="px-4 py-2">
                                <a href={source.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {source.twitter}
                                </a>
                            </td>
                            <td className="px-4 py-2">
                                <a href={source.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {source.facebook}
                                </a>
                            </td>
                            <td className="px-4 py-2">
                                <a href={source.reddit} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {source.reddit}
                                </a>
                            </td>
                            <td className="px-4 py-2">
                                <a href={source.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {source.youtube}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="mt-4">
                <button 
                    // This button would likely be removed in this static view
                    // as the image shows a read-only table with sample data.
                    onClick={() => { /* This functionality is not in the image */ }}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Add 1 more rows
                </button>
            </div>
        </div>
    );
};

export default SocialSourcesTable;