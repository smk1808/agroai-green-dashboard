import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

interface Props {
  data: { time: string; value: number }[];
  loading: boolean;
}

export function TemperatureChart({ data, loading }: Props) {
  return (
    <div
      className="glass-card p-6"
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Temperature Trend</h3>
          <p className="text-xs text-muted-foreground/60 mt-0.5">Last {data.length} readings</p>
        </div>
        <Activity className="w-5 h-5 text-agro-green" />
      </div>

      {loading || data.length === 0 ? (
        <div className="skeleton-loader h-48 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 20%)" />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(215 20% 50%)", fontSize: 10 }}
              axisLine={{ stroke: "hsl(217 33% 20%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(215 20% 50%)", fontSize: 10 }}
              axisLine={{ stroke: "hsl(217 33% 20%)" }}
              tickLine={false}
              domain={["auto", "auto"]}
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
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(142 71% 45%)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(142 71% 45%)" }}
              animationDuration={400}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
