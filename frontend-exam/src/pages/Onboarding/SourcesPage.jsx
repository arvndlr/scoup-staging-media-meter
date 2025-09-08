// src/pages/Onboarding/SourcesPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import SocialSourcesTable from "../../components/features/SocialSourcesTable";
import UploadModal from "../../components/features/UploadModal";
import { IconDownload } from "@tabler/icons-react";

const SourcesPage = () => {
  // Initialize the sources state with a single row of placeholder links
  const [sources, setSources] = useState([
    {
      twitter: "https://x.com/example",
      facebook: "https://facebook.com/example",
      reddit: "https://reddit.com/example",
      youtube: "https://youtube.com/example",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("empty");

  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadStatus("empty");
  };

  const handleUpload = (file) => {
    setUploadStatus("in_progress");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map((item) => ({
          twitter: item.twitter || "",
          facebook: item.facebook || "",
          reddit: item.reddit || "",
          youtube: item.youtube || "",
        }));

        // Update the state with the new data
        setSources(parsedData);
        setUploadStatus("finished");
        setTimeout(handleCloseModal, 1500);
      },
      error: (err) => {
        console.error("CSV parsing error:", err);
        setUploadStatus("empty");
        handleCloseModal();
      },
    });
  };

  const handleNext = () => {
    navigate("/onboarding/publishers");
  };

  const canProceed = sources.length > 0;

  return (
    <OnboardingLayout>
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        <div className="min-w-5xl pb-2 px-10 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Sources</h1>
            <div className="flex space-x-2">
              <button
                onClick={handleOpenModal}
                className="flex flex-row gap-2 items-center px-4 py-2 text-sm font-medium text-[#141413] bg-[#ffba49] rounded-md hover:bg-[#ffba49]"
              >
                <IconDownload stroke={2} className="w-4 h-4" />
                Import CSV/Excel
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  canProceed
                    ? "bg-gray-800 text-white hover:bg-gray-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!canProceed}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <SocialSourcesTable sources={sources} setSources={setSources} />
        <UploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleUpload}
          status={uploadStatus}
        />
      </div>
    </OnboardingLayout>
  );
};

export default SourcesPage;
