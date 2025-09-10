import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import SocialSourcesTable from "../../components/features/SocialSourcesTable";
import UploadModal from "../../components/features/UploadModal";
import { IconDownload } from "@tabler/icons-react";
import { useOnboardingStore } from "../../state/onboardingStore";

const SourcesPage = () => {
  const [sources, setSources] = useState([
    { twitter: "https://x.com/example", facebook: "https://facebook.com/example", reddit: "https://reddit.com/example", youtube: "https://youtube.com/example" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [pendingData, setPendingData] = useState([]);

  const setSocialSources = useOnboardingStore((s) => s.setSocialSources);
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

      const parsedData = rows.map((item) => ({
        twitter: item.twitter || item.Twitter || "",
        facebook: item.facebook || item.Facebook || "",
        reddit:   item.reddit  || item.Reddit  || "",
        youtube:  item.youtube || item.YouTube || item.youtube_url || "",
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
      console.error("Upload parse error:", err);
      clearInterval(interval);
      setUploadError(err.message || "Failed to parse file.");
      setUploadStatus(0); setPendingData([]);
    }
  };

  // Commit to local page state + global store
  const handleImport = () => {
    if (uploadStatus === 100 && pendingData.length > 0) {
      setSources(pendingData);
      // push into store (arrays of links)
      setSocialSources({
        twitter: pendingData.map(r => r.twitter).filter(Boolean),
        facebook: pendingData.map(r => r.facebook).filter(Boolean),
        reddit: pendingData.map(r => r.reddit).filter(Boolean),
        youtube: pendingData.map(r => r.youtube).filter(Boolean),
      });
      handleCloseModal();
    }
  };

  const handleNext = () => navigate("/onboarding/publishers");
  const canProceed = sources.length > 0;

  return (
    <OnboardingLayout>
      <div className="p-4 flex-1 flex flex-col items-center justify-center archivo">
        <div className="min-w-5xl pb-2 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Sources</h1>
            <div className="flex space-x-2">
              <button onClick={handleOpenModal}
                className="flex flex-row gap-2 items-center px-4 py-2 text-sm font-medium text-[#141413] bg-[#ffba49] rounded-md hover:bg-[#ffba49]">
                <IconDownload stroke={2} className="w-4 h-4" />
                Import CSV/Excel
              </button>
              <button onClick={handleNext}
                className={`px-10 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${canProceed ? "bg-[#cac9c7] text-white hover:bg-[#121212]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                disabled={!canProceed}>
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
          onImport={handleImport}
          onReset={resetUploadState}
          status={uploadStatus}
          error={uploadError}
        />
      </div>
    </OnboardingLayout>
  );
};

export default SourcesPage;
