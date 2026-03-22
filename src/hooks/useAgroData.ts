import { useState, useEffect, useCallback, useRef } from "react";

const BASE_URL = "http://localhost:5000";

export interface SensorData {
  temp: number;
  hum: number;
  soil: number;
  light: number;
  pump: boolean;
}

export interface AgroState {
  data: SensorData | null;
  loading: boolean;
  error: boolean;
  lastUpdated: Date | null;
  tempHistory: { time: string; value: number }[];
}

export function useAgroData() {
  const [state, setState] = useState<AgroState>({
    data: null,
    loading: true,
    error: false,
    lastUpdated: null,
    tempHistory: [],
  });
  const historyRef = useRef<{ time: string; value: number }[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/data`);
      if (!res.ok) throw new Error("Failed");
      const json: SensorData = await res.json();
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      
      historyRef.current = [
        ...historyRef.current.slice(-19),
        { time: timeStr, value: json.temp },
      ];

      setState({
        data: json,
        loading: false,
        error: false,
        lastUpdated: now,
        tempHistory: [...historyRef.current],
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false, error: true }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return state;
}
