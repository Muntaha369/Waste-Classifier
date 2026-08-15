"use client";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      id="error-message"
      className="w-full max-w-lg mx-auto animate-fade-in-up"
    >
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        {/* Error icon */}
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <p className="text-red-400 font-medium mb-1">Classification Failed</p>
        <p className="text-sm text-neutral-500 mb-5">{message}</p>

        <button
          id="retry-button"
          onClick={onRetry}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-xl
            text-sm font-medium
            bg-red-500/15 text-red-400
            border border-red-500/30
            hover:bg-red-500/25
            transition-colors duration-200
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
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
          Retry
        </button>
      </div>
    </div>
  );
}
