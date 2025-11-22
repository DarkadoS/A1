"use client";

import React from "react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}  // clicking outside closes modal
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        {/* CLOSE (X) BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-500 hover:text-slate-700 text-xl"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
