import { Leaf, TrendingUp, AlertTriangle } from "lucide-react";
import { SensorData } from "@/hooks/useAgroData";

interface Props {
  data: SensorData | null;
  loading: boolean;
}

interface CropSuggestion {
  name: string;
  score: number;
  reason: string;
}

function getCropRecommendations(data: SensorData): CropSuggestion[] {
  const { temp, hum, soil, light } = data;
  const crops: CropSuggestion[] = [];

  if (temp >= 20 && temp <= 35 && soil >= 40 && hum >= 50) {
    crops.push({ name: "Rice", score: Math.min(98, 80 + (soil - 40) * 0.3 + (hum - 50) * 0.2), reason: "Ideal moisture & humidity" });
  }
  if (temp >= 15 && temp <= 30 && soil >= 30 && light >= 300) {
    crops.push({ name: "Wheat", score: Math.min(95, 75 + (light - 300) * 0.02 + (30 - Math.abs(temp - 22)) * 0.5), reason: "Good temp & light levels" });
  }
  if (temp >= 18 && temp <= 35 && soil >= 20 && light >= 400) {
    crops.push({ name: "Corn", score: Math.min(96, 70 + (temp - 18) * 0.8 + (light - 400) * 0.01), reason: "Warm climate suitable" });
  }
  if (temp >= 10 && temp <= 25 && hum >= 40) {
    crops.push({ name: "Tomato", score: Math.min(94, 72 + (hum - 40) * 0.3), reason: "Moderate temp range" });
  }
  if (temp >= 15 && temp <= 28 && soil >= 35) {
    crops.push({ name: "Soybean", score: Math.min(92, 68 + (soil - 35) * 0.4), reason: "Balanced soil moisture" });
  }

  if (crops.length === 0) {
    crops.push({ name: "Millet", score: 65, reason: "Drought-resistant fallback" });
  }

  return crops
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(c => ({ ...c, score: Math.round(c.score) }));
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-agro-green";
  if (score >= 70) return "text-yellow-400";
  return "text-agro-red";
}

function getScoreBarColor(score: number) {
  if (score >= 85) return "bg-agro-green";
  if (score >= 70) return "bg-yellow-400";
  return "bg-agro-red";
}

export function CropRecommendation({ data, loading }: Props) {
  const recommendations = data ? getCropRecommendations(data) : [];

  return (
    <div
      className="glass-card p-6"
      style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Crop Recommendations</h3>
          <p className="text-xs text-muted-foreground/60 mt-0.5">Based on current sensor data</p>
        </div>
        <Leaf className="w-5 h-5 text-agro-green" />
      </div>

      {loading || !data ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-loader h-14 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((crop, i) => (
            <div
              key={crop.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 transition-all duration-200 hover:bg-muted/50"
              style={{ animation: `fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 * i}s both` }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-agro-green/10">
                {i === 0 ? (
                  <TrendingUp className="w-4 h-4 text-agro-green" />
                ) : (
                  <Leaf className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{crop.name}</span>
                  <span className={`text-xs font-mono font-bold tabular-nums ${getScoreColor(crop.score)}`}>
                    {crop.score}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted/50 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getScoreBarColor(crop.score)}`}
                    style={{ width: `${crop.score}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{crop.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
