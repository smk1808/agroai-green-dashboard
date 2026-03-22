import { RefreshCw, Wifi, WifiOff } from "lucide-react";

interface Props {
  lastUpdated: Date | null;
  isConnected: boolean;
  loading: boolean;
}

export function SystemInfo({ lastUpdated, isConnected, loading }: Props) {
  return (
    <div
      className="glass-card p-6"
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">System Info</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">API Status</span>
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <Wifi className="w-3.5 h-3.5 text-agro-green" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-agro-red" />
            )}
            <span className={`text-xs font-medium ${isConnected ? "text-agro-green" : "text-agro-red"}`}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last Update</span>
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {lastUpdated ? lastUpdated.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Refresh</span>
          <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
        </div>
      </div>
    </div>
  );
}
