import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | null;
  unit: string;
  icon: LucideIcon;
  loading: boolean;
  accentClass: string;
  delay: number;
}

export function SensorCard({ label, value, unit, icon: Icon, loading, accentClass, delay }: Props) {
  return (
    <div
      className="glass-card p-6 flex flex-col gap-4"
      style={{ animation: `fade-up 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentClass}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      {loading ? (
        <div className="skeleton-loader h-10 w-24" />
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground value-update" key={value}>
            {value !== null ? value.toFixed(1) : "--"}
          </span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
      )}
    </div>
  );
}
