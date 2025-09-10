import React, { useRef, useState } from "react";
import Modal from "../common/Modal";
import {
  IconCloudUpload,
  IconFile,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - onUpload: (file: File) => void          // triggers parsing + progress
 * - onImport: () => void                    // commits pending data to table
 * - onReset?: () => void                    // optional: resets upload state in parent
 * - status: number                          // 0..100
 * - error?: string
 */
const UploadModal = ({
  isOpen,
  onClose,
  onUpload,
  onImport,
  onReset,
  status,
  error,
}) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const isUploading = status > 0 && status < 100;
  const isUploadComplete = status === 100;

  const accept = ".csv,.xls,.xlsx";

  const pickFile = () => inputRef.current?.click();

  const useFile = (f) => {
    if (!f) return;
    if (f.size > MAX_BYTES) {
      alert("File too large. Max 10MB.");
      return;
    }
    setFile({
      name: f.name,
      sizeKb: (f.size / 1024).toFixed(2) + " KB",
      raw: f,
    });
    onUpload?.(f);
  };

  const onChange = (e) => useFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    useFile(e.dataTransfer.files?.[0]);
  };

  const clearFile = () => {
    setFile(null);
    // Optionally reset parent-side state so IMPORT becomes disabled again
    onReset?.();
  };

  const handleCancel = () => {
    // Reset parent-side state and close
    onReset?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="w-full max-w-md p-6 bg-[#f5f4ed] rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Import CSV/Excel File</h2>

        {/* Always-visible drop zone */}
        <div
          onClick={pickFile}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-10 py-6 text-center bg-white transition
            ${isDragging ? "border-gray-500" : "border-gray-300"}`}
        >
          <IconCloudUpload stroke={1} className="h-10 w-10" />
          <p className="mt-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">Click to import</span>{" "}
            or drag and drop
            <br />
            Excel (.xls, .xlsx) or CSV (.csv) files (max. 10MB)
          </p>
          <input
            ref={inputRef}
            id="file-upload"
            type="file"
            accept={accept}
            className="hidden"
            onChange={onChange}
          />
        </div>

        {/* Uploading pill */}
        {isUploading && file && (
          <div className="mt-4 ">
            <div className="relative  rounded-md bg-blue-100 border border-blue-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-blue-400 rounded-full h-6 w-6">
                  <IconCloudUpload className="w-4 h-4 text-gray-100" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">{file.sizeKb}</p>
                </div>
                <p className="text-xs text-gray-600 font-semibold">{status}%</p>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.max(5, status)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Uploaded success pill */}
        {isUploadComplete && file && (
          <div className="mt-4 p-4 bg-green-100 border border-green-600 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-green-400 rounded-full h-6 w-6">
                {" "}
                <IconCheck className="w-4 h-4 text-white" />
              </div>

              <div>
                <p className="font-medium text-sm text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">{file.sizeKb}</p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-1 rounded-full text-gray-400 hover:bg-gray-200"
              aria-label="Remove file"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Error */}
        {!!error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {/* Help links */}
        <div className="text-center mt-3">
          <ul className="list-disc pl-5 text-blue-500">
            <li>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline block text-start"
              >
                Download a sample .xls template
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline block text-start"
              >
                Download a sample .csv template
              </a>
            </li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end space-x-3 mt-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100"
          >
            CANCEL
          </button>
          <button
            onClick={onImport}
            className="px-4 py-2 text-sm font-medium text-white bg-[#121212] rounded-md disabled:opacity-50"
            disabled={!isUploadComplete}
          >
            IMPORT
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
