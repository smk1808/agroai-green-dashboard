import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";

interface Props {
  isConnected: boolean;
}

export function DashboardHeader({ isConnected }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 glass-card mb-6" style={{ animationDelay: "0s", animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-agro-green/20 flex items-center justify-center">
          <Leaf className="w-5 h-5 text-agro-green" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">AgroAI-Green</h1>
          <p className="text-xs text-muted-foreground">AI-Powered Smart Farming System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className={`status-dot ${isConnected ? "bg-agro-green" : "bg-agro-red"}`} />
          <span className="text-sm text-muted-foreground">
            {isConnected ? "Online" : "Disconnected"}
          </span>
        </div>
        <div className="text-sm font-mono text-muted-foreground tabular-nums">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </div>
      </div>
    </header>
  );
}
