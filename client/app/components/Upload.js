"use client";

import { useRef, useState, useCallback } from "react";

export default function Upload({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageSelected({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      id="upload-drop-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative flex flex-col items-center justify-center
        w-full max-w-lg mx-auto
        rounded-2xl border-2 border-dashed
        px-8 py-16
        cursor-pointer
        transition-all duration-300 ease-out
        ${
          isDragging
            ? "border-green-accent bg-green-accent/5 scale-[1.02] shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            : "border-border hover:border-green-accent/50 bg-surface hover:bg-surface-light"
        }
      `}
      onClick={() => fileInputRef.current?.click()}
    >
      {/* Upload Icon */}
      <div
        className={`
        mb-6 p-4 rounded-full transition-colors duration-300
        ${isDragging ? "bg-green-accent/10" : "bg-surface-light"}
      `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-10 h-10 transition-colors duration-300 ${
            isDragging ? "text-green-accent" : "text-neutral-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>

      <p className="text-lg font-medium text-foreground mb-2">
        {isDragging ? "Drop your image here" : "Drag & drop an image"}
      </p>
      <p className="text-sm text-neutral-500">
        or{" "}
        <span className="text-green-accent underline underline-offset-2 decoration-green-accent/40">
          click to browse
        </span>
      </p>
      <p className="text-xs text-neutral-600 mt-3">
        Supports JPG, PNG, WEBP
      </p>

      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
