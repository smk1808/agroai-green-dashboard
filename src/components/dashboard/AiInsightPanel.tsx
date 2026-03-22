import { Brain } from "lucide-react";

interface Props {
  loading: boolean;
  hasData: boolean;
}

export function AiInsightPanel({ loading, hasData }: Props) {
  // Placeholder AI analysis — would come from backend in production
  const status = "Healthy";
  const confidence = 94.7;
  const recommendation = "All parameters within optimal range. No intervention needed.";

  return (
    <div
      className="glass-card p-6 glow-green"
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">Crop Health Analysis</span>
        <Brain className="w-5 h-5 text-agro-green" />
      </div>

      {loading || !hasData ? (
        <div className="space-y-3">
          <div className="skeleton-loader h-6 w-32" />
          <div className="skeleton-loader h-4 w-48" />
          <div className="skeleton-loader h-4 w-full" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-agro-green status-dot" />
            <span className="text-lg font-semibold text-agro-green">{status}</span>
            <span className="text-xs text-muted-foreground ml-auto font-mono tabular-nums">{confidence}% confidence</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{recommendation}</p>
        </div>
      )}
    </div>
  );
}
