"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import Preview from "./components/Preview";
import ResultCard from "./components/ResultCard";
import ProbabilityBreakdown from "./components/ProbabilityBreakdown";
import ErrorMessage from "./components/ErrorMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/classify";

export default function Home() {
  const [imageData, setImageData] = useState(null); // { file, preview }
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelected = useCallback((data) => {
    setImageData(data);
    setResult(null);
    setError(null);
  }, []);

  const handleClassify = useCallback(async () => {
    if (!imageData?.file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", imageData.file);

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [imageData]);

  const handleReset = useCallback(() => {
    setImageData(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          id="page-title"
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3"
        >
          Classify{" "}
          <span className="text-green-accent">Waste</span>
        </h1>
        <p className="text-neutral-500 text-sm sm:text-base max-w-md mx-auto">
          Upload an image of waste and let AI identify its category with
          confidence scores.
        </p>
      </div>

      {/* Content area */}
      <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
        {/* Upload Zone — show only when no image */}
        {!imageData && <Upload onImageSelected={handleImageSelected} />}

        {/* Preview */}
        {imageData && (
          <Preview previewUrl={imageData.preview} isLoading={isLoading} />
        )}

        {/* Continue Button — show when image uploaded but no result yet and not loading */}
        {imageData && !result && !error && !isLoading && (
          <button
            id="continue-button"
            onClick={handleClassify}
            className="
              w-full max-w-lg mx-auto
              flex items-center justify-center gap-2
              px-6 py-3.5 rounded-xl
              text-base font-semibold
              bg-green-accent text-black
              hover:bg-green-500
              active:scale-[0.98]
              transition-all duration-200
              shadow-[0_0_20px_rgba(34,197,94,0.25)]
              hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            Continue
          </button>
        )}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={handleClassify} />}

        {/* Result */}
        {result && (
          <>
            <ResultCard result={result} />
            <ProbabilityBreakdown
              probabilities={result.all_probabilities}
              predictedClass={result.class}
            />

            {/* Reset Button */}
            <button
              id="reset-button"
              onClick={handleReset}
              className="
                w-full max-w-lg mx-auto
                flex items-center justify-center gap-2
                px-6 py-3.5 rounded-xl
                text-base font-medium
                bg-transparent text-green-accent
                border border-green-accent/30
                hover:bg-green-accent/10
                hover:border-green-accent/60
                active:scale-[0.98]
                transition-all duration-200
                cursor-pointer
                animate-fade-in-up
              "
              style={{ animationDelay: "0.3s" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                />
              </svg>
              Upload Another Image
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-12 pb-6 text-center">
        <p className="text-xs text-neutral-600">
          Powered by AI · Waste Classification Tool
        </p>
      </footer>
    </main>
  );
}

