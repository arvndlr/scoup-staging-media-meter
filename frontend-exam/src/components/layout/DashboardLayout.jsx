// src/components/layout/DashboardLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-24 bg-gray-800 text-white p-4 flex flex-col items-center space-y-8">
                <div className="flex items-center justify-center p-2">
                    <span className="text-yellow-400 text-2xl font-bold">S</span>
                </div>
                <nav className="flex flex-col items-center space-y-6">
                    <Link to="/dashboard" className="p-2 hover:bg-gray-700 rounded-md">
                        <span className="text-2xl">📊</span>
                    </Link>
                    <Link to="/reports" className="p-2 hover:bg-gray-700 rounded-md">
                        <span className="text-2xl">📝</span>
                    </Link>
                    <Link to="/settings" className="p-2 hover:bg-gray-700 rounded-md">
                        <span className="text-2xl">⚙️</span>
                    </Link>
                    {/* Add more icons for other pages */}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm p-4 flex items-center justify-between">
                    <div className="flex space-x-4">
                        <Button className="bg-gray-800 text-white py-2 px-4 rounded-full">JUDICIAL AND LEGAL CHALLENGES</Button>
                        <Button className="text-gray-500 py-2 px-4">SOCIAL SECURITY AND DOMESTIC PROGRAM CUTS</Button>
                        <Button className="text-gray-500 py-2 px-4">BLOCKCHAIN AND THE U.S. SECURITIES MARKET</Button>
                        <Button className="text-gray-500 py-2 px-4">NATIONAL SECURITY AND CYBERCRIME</Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;