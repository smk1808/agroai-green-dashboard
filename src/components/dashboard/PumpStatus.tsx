import { Droplets } from "lucide-react";

interface Props {
  pumpOn: boolean | null;
  loading: boolean;
}

export function PumpStatus({ pumpOn, loading }: Props) {
  const isOn = pumpOn === true;

  return (
    <div
      className={`glass-card p-6 ${isOn ? "glow-red" : "glow-blue"}`}
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">Pump Control</span>
        <Droplets className={`w-5 h-5 ${isOn ? "text-agro-red" : "text-agro-blue"}`} />
      </div>
      {loading ? (
        <div className="skeleton-loader h-10 w-20" />
      ) : (
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isOn ? "bg-agro-red" : "bg-agro-blue"} status-dot`} />
          <span className={`text-2xl font-bold ${isOn ? "text-agro-red" : "text-agro-blue"}`}>
            {pumpOn !== null ? (isOn ? "ON" : "OFF") : "--"}
          </span>
        </div>
      )}
    </div>
  );
}
