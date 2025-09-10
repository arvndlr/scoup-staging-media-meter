import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import UploadModal from "../../components/features/UploadModal";
import PublishersTable from "../../components/features/PublishersTable";
import { IconDownload } from "@tabler/icons-react";
import { useOnboardingStore } from "../../state/onboardingStore";

const PublishersPage = () => {
  const [publishers, setPublishers] = useState([
    { id: 1, websiteLink: "https://example.com", publicationName: "Publisher Name" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [pendingData, setPendingData] = useState([]);

  const setPublishersStore = useOnboardingStore((s) => s.setPublishers);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const resetUploadState = () => { setUploadStatus(0); setUploadError(""); setPendingData([]); };
  const handleCloseModal = () => { setIsModalOpen(false); resetUploadState(); };

  const parseCSV = (file) =>
    new Promise((resolve, reject) => {
      Papa.parse(file, { header: true, skipEmptyLines: true,
        complete: (r) => resolve(r.data), error: reject });
    });

  const parseExcel = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          resolve(XLSX.utils.sheet_to_json(ws, { defval: "" }));
        } catch (err) { reject(err); }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

  const handleUpload = async (file) => {
    setUploadError(""); setUploadStatus(0); setPendingData([]);
    const keyframes = [8,18,32,47,63,78,88,93,96]; let k = 0;
    const start = Date.now();
    const minVisibleMs = Math.min(4200, Math.max(1400, Math.round(file.size/50000)*250));
    const interval = setInterval(() => { if (k < keyframes.length) setUploadStatus(keyframes[k++]); }, 220);

    try {
      const ext = file.name.toLowerCase().split(".").pop();
      const rows = ext === "csv" ? await parseCSV(file)
        : ["xls","xlsx"].includes(ext) ? await parseExcel(file)
        : (()=>{ throw new Error("Unsupported file type. Use CSV, XLS, or XLSX."); })();

      const parsedData = rows.map((item, idx) => ({
        id: publishers.length + idx + 1,
        websiteLink: item["Website Link"] || item.websiteLink || "",
        publicationName: item["Publication Name"] || item.publicationName || "",
      }));
      setPendingData(parsedData);

      const elapsed = Date.now() - start;
      await new Promise((r) => setTimeout(r, Math.max(0, minVisibleMs - elapsed)));
      clearInterval(interval);
      let v = 96;
      const step = setInterval(() => {
        v += 1.5;
        if (v >= 100) { setUploadStatus(100); clearInterval(step); }
        else setUploadStatus(Math.floor(v));
      }, 60);
    } catch (err) {
      console.error("CSV/Excel parse error:", err);
      clearInterval(interval);
      setUploadError(err.message || "Failed to parse file.");
      setUploadStatus(0); setPendingData([]);
    }
  };

  const handleImport = () => {
    if (uploadStatus === 100 && pendingData.length > 0) {
      setPublishers(pendingData);
      setPublishersStore(pendingData); // persist in store
      handleCloseModal();
    }
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    const newRow = { id: publishers.length + 1, websiteLink: "", publicationName: "" };
    setPublishers([...publishers, newRow]);
  };

  const handleNext = () => navigate("/onboarding/review");
  const canProceed = publishers.some((p) => p.websiteLink && p.publicationName);

  return (
    <OnboardingLayout>
      <div className="p-4 flex-1 flex flex-col items-center justify-center archivo">
        <div className="flex w-2xl justify-between mb-4 space-x-2">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Publishers</h1>
            <p>Upload an Excel or CSV file with your publishers list</p>
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
              className={`py-2 px-8 h-10 rounded-md shadow-sm transition-colors duration-200 ${
                canProceed ? "bg-[#cac9c7] text-white hover:bg-[#121212]" : "bg-[#cac9c7] text-gray-500 cursor-not-allowed"
              }`}
              disabled={!canProceed}
            >
              Next
            </button>
          </div>
        </div>

        <PublishersTable publishers={publishers} setPublishers={setPublishers} />

        <div className="fixed w-2xl h-12 text-sm space-x-2 bottom-0 left-auto right-auto px-4 py-2 bg-white shadow-lg flex items-center justify-start border-t border-gray-200 rounded-tl-lg rounded-tr-lg">
          <button onClick={handleAddRow} className="font-semibold text-gray-500 hover:text-gray-900">
            Add
          </button>
          <input type="number" defaultValue={1} min={1} className="w-16 p-1 border border-gray-300 rounded-md text-center" />
          <span className="text-gray-500 ml-2">more rows</span>
        </div>

        <UploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleUpload}
          onImport={handleImport}
          onReset={resetUploadState}
          status={uploadStatus}
          error={uploadError}
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
