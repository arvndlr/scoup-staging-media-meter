// src/pages/Onboarding/SourcesPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import SocialSourcesTable from '../../components/features/SocialSourcesTable';
import UploadModal from '../../components/features/UploadModal';

const SourcesPage = () => {
    // Initialize the sources state with a single row of placeholder links
    const [sources, setSources] = useState([
        {
            twitter: 'https://x.com/example',
            facebook: 'https://facebook.com/example',
            reddit: 'https://reddit.com/example',
            youtube: 'https://youtube.com/example',
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('empty');

    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUploadStatus('empty');
    };

    const handleUpload = (file) => {
        setUploadStatus('in_progress');

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedData = results.data.map(item => ({
                    twitter: item.twitter || '',
                    facebook: item.facebook || '',
                    reddit: item.reddit || '',
                    youtube: item.youtube || '',
                }));

                // Update the state with the new data
                setSources(parsedData);
                setUploadStatus('finished');
                setTimeout(handleCloseModal, 1500);
            },
            error: (err) => {
                console.error("CSV parsing error:", err);
                setUploadStatus('empty');
                handleCloseModal();
            }
        });
    };

    const handleNext = () => {
        navigate('/onboarding/publishers');
    };

    const canProceed = sources.length > 0;

    return (
        <OnboardingLayout>
            <div className="p-8 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">Sources</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                            Import CSV/Excel
                        </button>
                        <button
                            onClick={handleNext}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                canProceed ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!canProceed}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <SocialSourcesTable sources={sources} setSources={setSources} />
            </div>

            <UploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onUpload={handleUpload}
                status={uploadStatus}
            />
        </OnboardingLayout>
    );
};

export default SourcesPage;