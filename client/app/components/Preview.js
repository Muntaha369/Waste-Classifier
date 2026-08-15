"use client";

export default function Preview({ previewUrl, isLoading }) {
  return (
    <div
      id="image-preview-container"
      className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden border border-border bg-surface"
    >
      {/* Image */}
      <img
        id="preview-image"
        src={previewUrl}
        alt="Uploaded waste image"
        className={`
          w-full h-auto max-h-[420px] object-contain
          transition-all duration-500 ease-in-out
          ${isLoading ? "blur-md scale-105 brightness-50" : "blur-0 scale-100 brightness-100"}
        `}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {/* Spinner ring */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-accent/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-accent animate-spin-slow" />
          </div>
          <p className="text-sm font-medium text-green-accent tracking-wide animate-pulse">
            Analyzing image…
          </p>
        </div>
      )}
    </div>
  );
}
