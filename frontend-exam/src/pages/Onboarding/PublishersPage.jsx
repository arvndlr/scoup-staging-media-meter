import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import Button from "../../components/common/Button";
import UploadModal from "../../components/features/UploadModal";
import PublishersTable from "../../components/features/PublishersTable";
import { IconDownload } from "@tabler/icons-react";

const PublishersPage = () => {
  // Initial state with a single placeholder row to match the 'initial state--empty' design.
  const [publishers, setPublishers] = useState([
    {
      id: 1,
      websiteLink: "https://example.com",
      publicationName: "Publisher Name",
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

  const handleAddRow = (e) => {
    e.preventDefault();
    const numRowsToAdd = 1;
    const newRows = Array.from({ length: numRowsToAdd }, (_, index) => ({
      id: publishers.length + index + 1,
      websiteLink: "",
      publicationName: "",
    }));
    setPublishers([...publishers, ...newRows]);
  };

  const handleUpload = (file) => {
    setUploadStatus("in_progress");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map((item, index) => ({
          id: publishers.length + index + 1,
          websiteLink: item["Website Link"] || "",
          publicationName: item["Publication Name"] || "",
        }));
        setPublishers(parsedData);
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
    navigate("/onboarding/review");
  };

  const canProceed = publishers.some((p) => p.websiteLink && p.publicationName);

  return (
    <OnboardingLayout
      title="Publishers"
      description="Upload an Excel file with your social media followers"
    >
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        <div className="flex w-2xl justify-between mb-4 space-x-2">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Publishers</h1>
            <p>Upload and Excel file with your social media followers</p>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={handleOpenModal}
              className="flex h-10 flex-row gap-2 items-center px-4 py-2 text-sm font-medium text-[#141413] bg-[#ffba49] rounded-md hover:bg-[#ffba49]"
            >
              <IconDownload stroke={2} className="w-4 h-4" />
              Import CSV/Excel
            </button>
            <button
              onClick={handleNext}
              className={`py-2 px-4 h-10 rounded-md shadow-sm transition-colors duration-200 ${
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

        <PublishersTable
          publishers={publishers}
          setPublishers={setPublishers}
        />

        <div className="fixed w-2xl h-12 text-sm space-x-2 bottom-0 left-auto right-auto px-4 py-2 bg-white shadow-lg flex items-center justify-start border-t border-gray-200 rounded-tl-lg rounded-tr-lg">
          <button onClick={handleAddRow} variant="link" className="font-semibold text-gray-500 hover:text-gray-900">
            Add
          </button>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="w-16 p-1 border border-gray-300 rounded-md text-center"
          />
          <span className="text-gray-500 ml-2">more rows</span>
        </div>

        <UploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleUpload}
          status={uploadStatus}
          description="Excel (.xls, .xlsx) or CSV (.csv) files (max. 10MB)"
          templateLinks={[
            { href: "#", text: "Download a sample .xls template" },
            { href: "#", text: "Download a sample .csv template" },
          ]}
        />
      </div>
    </OnboardingLayout>
  );
};

export default PublishersPage;
