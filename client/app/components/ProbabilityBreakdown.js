"use client";

const CLASS_COLORS = {
  Hazardous: { bar: "bg-red-500", text: "text-red-400" },
  Recyclable: { bar: "bg-blue-500", text: "text-blue-400" },
  Organic: { bar: "bg-emerald-500", text: "text-emerald-400" },
  "Non-Recyclable": { bar: "bg-amber-500", text: "text-amber-400" },
};

function getBarColor(className) {
  return CLASS_COLORS[className] || { bar: "bg-green-accent", text: "text-green-accent" };
}

export default function ProbabilityBreakdown({ probabilities, predictedClass }) {
  // Sort by probability descending
  const sorted = Object.entries(probabilities).sort(([, a], [, b]) => b - a);

  return (
    <div
      id="probability-breakdown"
      className="w-full max-w-lg mx-auto animate-fade-in-up"
      style={{ animationDelay: "0.15s" }}
    >
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
          All Probabilities
        </p>

        <div className="space-y-4">
          {sorted.map(([className, prob], index) => {
            const percent = (prob * 100).toFixed(2);
            const { bar, text } = getBarColor(className);
            const isPredicted = className === predictedClass;

            return (
              <div
                key={className}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-sm font-medium ${
                      isPredicted ? text + " font-bold" : "text-neutral-400"
                    }`}
                  >
                    {className}
                    {isPredicted && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider bg-green-accent/15 text-green-accent px-2 py-0.5 rounded-full">
                        Top
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-sm font-mono ${
                      isPredicted ? text : "text-neutral-500"
                    }`}
                  >
                    {percent}%
                  </span>
                </div>

                {/* Bar */}
                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${bar} animate-bar-fill ${
                      isPredicted ? "opacity-100" : "opacity-60"
                    }`}
                    style={{
                      width: `${percent}%`,
                      animationDelay: `${0.1 * (index + 1)}s`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
