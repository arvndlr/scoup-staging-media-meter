// src/components/features/PublishersTable.jsx

import React from 'react';

const PublishersTable = ({ publishers, setPublishers }) => {
    const handleUpdatePublisher = (id, field, value) => {
        setPublishers(publishers.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <span>WEBSITE LINK</span>
                                    <span className="ml-1">↓</span>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <span>PUBLICATION NAME</span>
                                    <span className="ml-1">↓</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {publishers.map((publisher, index) => (
                            <tr key={publisher.id || index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">{index + 1}</span>
                                        <input
                                            type="text"
                                            value={publisher.websiteLink}
                                            onChange={(e) => handleUpdatePublisher(publisher.id, 'websiteLink', e.target.value)}
                                            className="w-full bg-transparent border-none focus:outline-none"
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={publisher.publicationName}
                                        onChange={(e) => handleUpdatePublisher(publisher.id, 'publicationName', e.target.value)}
                                        className="w-full bg-transparent border-none focus:outline-none"
                                        placeholder="Publisher Name"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublishersTable;