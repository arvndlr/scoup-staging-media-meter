// src/components/common/Modal.jsx

import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50  flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div
        className="bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
