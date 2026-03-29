import { Thermometer, Droplets, Sprout, Sun } from "lucide-react";
import { useAgroData } from "@/hooks/useAgroData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { PumpStatus } from "@/components/dashboard/PumpStatus";
import { AiInsightPanel } from "@/components/dashboard/AiInsightPanel";
import { TemperatureChart } from "@/components/dashboard/TemperatureChart";
import { SystemInfo } from "@/components/dashboard/SystemInfo";
import { CropRecommendation } from "@/components/dashboard/CropRecommendation";
import { CropHealthChart } from "@/components/dashboard/CropHealthChart";

const Index = () => {
  const { data, loading, error, lastUpdated, tempHistory, sensorHistory } = useAgroData();
  const isConnected = !error && !loading;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <DashboardHeader isConnected={isConnected} />

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <SensorCard label="Temperature" value={data?.temp ?? null} unit="°C" icon={Thermometer} loading={loading} accentClass="bg-agro-green/15 text-agro-green" delay={0.1} />
        <SensorCard label="Humidity" value={data?.hum ?? null} unit="%" icon={Droplets} loading={loading} accentClass="bg-agro-blue/15 text-agro-blue" delay={0.15} />
        <SensorCard label="Soil Moisture" value={data?.soil ?? null} unit="%" icon={Sprout} loading={loading} accentClass="bg-agro-green/15 text-agro-green" delay={0.2} />
        <SensorCard label="Light Intensity" value={data?.light ?? null} unit="lux" icon={Sun} loading={loading} accentClass="bg-yellow-500/15 text-yellow-400" delay={0.25} />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <PumpStatus pumpOn={data?.pump ?? null} loading={loading} />
        <AiInsightPanel loading={loading} hasData={!!data} />
        <SystemInfo lastUpdated={lastUpdated} isConnected={isConnected} loading={loading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <TemperatureChart data={tempHistory} loading={loading} />
        <CropHealthChart history={sensorHistory} loading={loading} />
      </div>

      {/* Crop Recommendation */}
      <CropRecommendation data={data} loading={loading} />
    </div>
  );
};

export default Index;
