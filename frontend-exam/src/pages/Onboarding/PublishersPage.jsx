import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import Button from '../../components/common/Button';
import UploadModal from '../../components/features/UploadModal';
import PublishersTable from '../../components/features/PublishersTable';

const PublishersPage = () => {
    // Initial state with a single placeholder row to match the 'initial state--empty' design.
    const [publishers, setPublishers] = useState([
        { id: 1, websiteLink: 'https://example.com', publicationName: 'Publisher Name' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('empty');

    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUploadStatus('empty');
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        const numRowsToAdd = 1;
        const newRows = Array.from({ length: numRowsToAdd }, (_, index) => ({
            id: publishers.length + index + 1,
            websiteLink: '',
            publicationName: ''
        }));
        setPublishers([...publishers, ...newRows]);
    };

    const handleUpload = (file) => {
        setUploadStatus('in_progress');

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedData = results.data.map((item, index) => ({
                    id: publishers.length + index + 1,
                    websiteLink: item['Website Link'] || '',
                    publicationName: item['Publication Name'] || '',
                }));
                setPublishers(parsedData); 
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
        navigate('/onboarding/review');
    };

    const canProceed = publishers.some(p => p.websiteLink && p.publicationName);

    return (
        <OnboardingLayout 
            title="Publishers" 
            description="Upload an Excel file with your social media followers"
        >
            <div className="flex justify-end mb-4 space-x-2">
                <Button 
                    onClick={handleOpenModal} 
                    className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-yellow-600 transition-colors duration-200"
                >
                    <span className="mr-2">📥</span>
                    Import CSV/Excel
                </Button>
                <Button 
                    onClick={handleNext}
                    className={`py-2 px-4 rounded-md shadow-sm transition-colors duration-200 ${
                        canProceed ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!canProceed}
                >
                    Next
                </Button>
            </div>
            
            <PublishersTable publishers={publishers} setPublishers={setPublishers} />
            
            <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-500 mr-2">Add</span>
                <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="w-12 text-center border rounded-md"
                />
                <span className="text-gray-500 ml-2">more rows</span>
                <Button onClick={handleAddRow} variant="link" className="ml-2">
                    <span className="text-purple-600">⊕</span>
                </Button>
            </div>

            <UploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onUpload={handleUpload}
                status={uploadStatus}
                description="Excel (.xls, .xlsx) or CSV (.csv) files (max. 10MB)"
                templateLinks={[
                    { href: '#', text: 'Download a sample .xls template' },
                    { href: '#', text: 'Download a sample .csv template' },
                ]}
            />
        </OnboardingLayout>
    );
};

export default PublishersPage;