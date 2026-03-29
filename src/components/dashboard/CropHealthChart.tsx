import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { HeartPulse } from "lucide-react";
import { SensorData } from "@/hooks/useAgroData";

interface Props {
  history: { time: string; data: SensorData }[];
  loading: boolean;
}

function computeHealthScore(d: SensorData): number {
  // Weighted health score based on optimal ranges
  let score = 100;

  // Temperature: optimal 20-30°C
  if (d.temp < 10 || d.temp > 45) score -= 30;
  else if (d.temp < 15 || d.temp > 38) score -= 20;
  else if (d.temp < 20 || d.temp > 30) score -= 5;

  // Humidity: optimal 50-80%
  if (d.hum < 20 || d.hum > 95) score -= 25;
  else if (d.hum < 40 || d.hum > 85) score -= 10;

  // Soil moisture: optimal 30-70%
  if (d.soil < 10 || d.soil > 90) score -= 25;
  else if (d.soil < 25 || d.soil > 75) score -= 10;

  // Light: optimal 200-800 lux
  if (d.light < 50 || d.light > 1200) score -= 20;
  else if (d.light < 150 || d.light > 900) score -= 8;

  return Math.max(0, Math.min(100, score));
}

function getHealthLabel(score: number) {
  if (score >= 85) return { label: "Healthy", color: "text-agro-green" };
  if (score >= 60) return { label: "Warning", color: "text-yellow-400" };
  return { label: "Critical", color: "text-agro-red" };
}

export function CropHealthChart({ history, loading }: Props) {
  const chartData = history.map(h => ({
    time: h.time,
    health: computeHealthScore(h.data),
  }));

  const latestScore = chartData.length > 0 ? chartData[chartData.length - 1].health : null;
  const healthInfo = latestScore !== null ? getHealthLabel(latestScore) : null;

  return (
    <div
      className="glass-card p-6"
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Crop Health Status</h3>
          <div className="flex items-center gap-2 mt-1">
            {healthInfo && (
              <>
                <span className={`w-2 h-2 rounded-full ${latestScore! >= 85 ? 'bg-agro-green' : latestScore! >= 60 ? 'bg-yellow-400' : 'bg-agro-red'} status-dot`} />
                <span className={`text-xs font-semibold ${healthInfo.color}`}>{healthInfo.label}</span>
                <span className="text-xs text-muted-foreground font-mono tabular-nums">— {latestScore}%</span>
              </>
            )}
          </div>
        </div>
        <HeartPulse className="w-5 h-5 text-agro-green" />
      </div>

      {loading || chartData.length === 0 ? (
        <div className="skeleton-loader h-48 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 20%)" />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(215 20% 50%)", fontSize: 10 }}
              axisLine={{ stroke: "hsl(217 33% 20%)" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "hsl(215 20% 50%)", fontSize: 10 }}
              axisLine={{ stroke: "hsl(217 33% 20%)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(217 33% 14%)",
                border: "1px solid hsl(217 33% 24%)",
                borderRadius: "12px",
                color: "hsl(210 40% 96%)",
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(215 20% 60%)" }}
              formatter={(value: number) => [`${value}%`, "Health Score"]}
            />
            <Area
              type="monotone"
              dataKey="health"
              stroke="hsl(142 71% 45%)"
              strokeWidth={2.5}
              fill="url(#healthGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(142 71% 45%)" }}
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
