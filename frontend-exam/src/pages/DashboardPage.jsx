// src/pages/Dashboard/DashboardPage.jsx

import React from 'react';
import OnboardingLayout from '../components/layout/OnboardingLayout';
import Button from '../components/common/Button';
// A reusable component for each article card
const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Article Header */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-700">{article.id}</span>
                <h2 className="text-lg font-semibold text-gray-800">{article.headline}</h2>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="text-center">
                    <span className="block font-medium">Engagement Score</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.engagementScore}</span>
                </div>
                <div className="text-center">
                    <span className="block font-medium">Velocity</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.velocity}</span>
                </div>
                <div className="text-center">
                    <span className="block font-medium">Comments</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.comments}</span>
                </div>
                <div className="text-center">
                    <span className="block font-medium">Shares</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.shares}</span>
                </div>
                <div className="text-center">
                    <span className="block font-medium">Articles</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.articles}</span>
                </div>
                <div className="text-center">
                    <span className="block font-medium">Est. Traffic</span>
                    <span className="block text-xl font-bold text-gray-800">{article.metrics.estTraffic}</span>
                </div>
            </div>
        </div>
        
        {/* Image Grid (as seen in the design) */}
        <div className="grid grid-cols-4 gap-2 mb-6">
            {article.images.map((img, index) => (
                <img key={index} src={img} alt={`Article visual ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
            ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
                <h4 className="font-semibold text-gray-800">THE STORY</h4>
                <p className="mt-2">{article.details.story}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">WHY IT MATTERS TO YOU</h4>
                <p className="mt-2">{article.details.whyItMatters}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">WHO IS THIS IMPORTANT TO?</h4>
                <p className="mt-2">{article.details.whoIsItImportantTo}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">THE BIGGER PICTURE</h4>
                <p className="mt-2">{article.details.theBiggerPicture}</p>
            </div>
        </div>

        <div className="mt-6 text-center">
            <Button variant="link" className="text-purple-600 font-semibold">
                SHOW MORE DETAILS
            </Button>
        </div>
    </div>
);

// Main Dashboard Page Component
const DashboardPage = () => {
    // Mock data for two articles to match your design
    const articles = [
        {
            id: 1,
            headline: 'Davao councilors ask Senate to petition ICC for Duterte\'s interim release',
            metrics: {
                engagementScore: 9,
                velocity: 9,
                comments: '12.3K',
                shares: '33.8K',
                articles: 42,
                estTraffic: 872
            },
            images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
            ],
            details: {
                story: 'Legal battle over jurisdiction: Duterte\'s defense challenges the ICC\'s authority...',
                whyItMatters: 'Political and Diplomatic implications. ICC Case Against Duterte...',
                whoIsItImportantTo: 'Supporters of Duterte argue that the charges are politically motivated...',
                theBiggerPicture: 'Davao City councilors passed a resolution urging the Philippine Senate...'
            }
        },
        {
            id: 2,
            headline: 'Davao councilors ask Senate to petition ICC for Duterte\'s interim release',
            metrics: {
                engagementScore: 9,
                velocity: 9,
                comments: '12.3K',
                shares: '33.8K',
                articles: 42,
                estTraffic: 872
            },
            images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
            ],
            details: {
                story: 'Legal battle over jurisdiction: Duterte\'s defense challenges the ICC\'s authority...',
                whyItMatters: 'Political and Diplomatic implications. ICC Case Against Duterte...',
                whoIsItImportantTo: 'Supporters of Duterte argue that the charges are politically motivated...',
                theBiggerPicture: 'Davao City councilors passed a resolution urging the Philippine Senate...'
            }
        },
    ];

    return (
        <OnboardingLayout hideSidebar={false}>
            {/* You can add more dashboard-specific elements here */}
            <div className="p-8">
                {/* Dashboard sections (Judicial & Legal, Social Security, etc.) */}
                <div className="flex space-x-4 mb-8 text-sm font-medium">
                    <Button className="bg-gray-800 text-white py-2 px-4 rounded-full">JUDICIAL AND LEGAL CHALLENGES</Button>
                    <Button className="text-gray-500 py-2 px-4">SOCIAL SECURITY AND DOMESTIC PROGRAM CUTS</Button>
                    {/* ... other tabs ... */}
                </div>

                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </OnboardingLayout>
    );
};

export default DashboardPage;