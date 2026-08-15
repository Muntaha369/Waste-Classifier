"use client";

const CLASS_COLORS = {
  Hazardous: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    hex: "#ef4444",
  },
  Recyclable: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    hex: "#3b82f6",
  },
  Organic: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    hex: "#10b981",
  },
  "Non-Recyclable": {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    hex: "#f59e0b",
  },
};

function getClassStyle(className) {
  return (
    CLASS_COLORS[className] || {
      bg: "bg-green-accent/15",
      text: "text-green-accent",
      border: "border-green-accent/30",
      hex: "#22c55e",
    }
  );
}

export default function ResultCard({ result }) {
  const { bg, text, border, hex } = getClassStyle(result.class);
  const confidencePercent = (result.confidence * 100).toFixed(2);
  const angle = result.confidence * 360;

  return (
    <div
      id="result-card"
      className="w-full max-w-lg mx-auto animate-fade-in-up"
    >
      <div
        className={`rounded-2xl border ${border} ${bg} p-6 backdrop-blur-sm`}
      >
        {/* Predicted Class Badge */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Prediction
            </p>
            <span
              id="predicted-class"
              className={`inline-block text-2xl font-bold ${text}`}
            >
              {result.class}
            </span>
          </div>

          {/* Confidence circle */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-20 h-20 rounded-full flex items-center justify-center
                border-2 ${border} animate-pulse-glow
              `}
              style={{
                background: `conic-gradient(${hex} ${angle}deg, transparent ${angle}deg)`,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                <span className={`text-sm font-bold ${text}`}>
                  {confidencePercent}%
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
