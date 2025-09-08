// src/components/features/UploadModal.jsx

import React, { useState } from 'react';
import Modal from '../common/Modal'; 
import Card from '../common/Card';

const UploadModal = ({ isOpen, onClose, onUpload, status }) => {
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [hasFile, setHasFile] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileSize((file.size / 1024).toFixed(2) + ' KB');
            setHasFile(true);
            
            // Pass the file object directly to the parent's onUpload handler
            onUpload(file);
        }
    };
    
    // ... rest of the component remains the same
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Card className="w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-6">Import CSV/Excel File</h2>
                
                {/* Always visible upload area with optional file input */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">Click to import</span> or drag and drop<br />
                            Excel (.xls, .xlsx) or CSV (.csv) files (max. 10MB)
                        </p>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} />
                    </label>
                </div>
                
                {hasFile && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="font-medium text-sm text-gray-800">{fileName}</p>
                                <p className="text-xs text-gray-500">{fileSize}</p>
                            </div>
                        </div>
                        <button onClick={() => setHasFile(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-blue-500 hover:underline block">Download a sample .xls template</a>
                    <a href="#" className="text-sm text-blue-500 hover:underline block">Download a sample .csv template</a>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100">
                        CANCEL
                    </button>
                    <button 
                        onClick={() => { /* Handle import action */ }} 
                        className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md disabled:opacity-50"
                        disabled={!hasFile}
                    >
                        IMPORT
                    </button>
                </div>
            </Card>
        </Modal>
    );
};

export default UploadModal;