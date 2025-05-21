import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import WaterQualityCard from "@/components/WaterQualityCard";
import WaterTurbidityCard from "@/components/WaterTurbidityCard";
import WeatherPredictionCard from "@/components/WeatherPredictionCard";
import SmartIrrigationTipCard from "@/components/SmartIrrigationTipCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface QualityMetric {
  name: string;
  value: string | number;
  unit?: string;
  status: string;
  icon: "ph" | "tds" | "clarity";
}

interface FarmData {
  farmer: {
    id: number;
    name: string;
  };
  farm: {
    id: number;
    name?: string;
    status: string;
  };
  waterQuality: QualityMetric[];
  soilMoisture: {
    level: number;
    status: string;
    fields: Array<{
      id: number;
      name: string;
      value: number;
      status: string;
    }>;
  };
  waterPrediction: {
    message: string;
    advice: string;
    forecast: Array<{
      day: string;
      temperature: string;
      weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
      humidity: number;
      wind: string;
      uvIndex: number;
      chanceOfRain: number;
    }>;
  };
  irrigationTip: string;
}

const defaultWaterQualityMetrics: QualityMetric[] = [
  { name: "pH Level", value: "6.8", status: "Good", icon: "ph" },
  { name: "TDS", value: "320", unit: "ppm", status: "Good", icon: "tds" },
  { name: "Clarity", value: "Clear", status: "Good", icon: "clarity" }
];

const Home = () => {
  const { darkMode } = useTheme();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: farmData, isLoading, error } = useQuery({
    queryKey: ["/api/farm-data"],
    retry: 1,
  }) as UseQueryResult<FarmData, Error>;

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching farm data",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    // Invalidate and refetch on component mount
    queryClient.invalidateQueries({ queryKey: ["/api/farm-data"] });
  }, [queryClient]);

  useEffect(() => {
    if (farmData) {
      console.log('Farm Data:', farmData);
    }
  }, [farmData]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col gap-4 mt-4">
              <div className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
              <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
              <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
              <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="text-red-500 dark:text-red-400">Failed to load farm data</p>
              <button 
                onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/farm-data"] })}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="fade-in">
                <WelcomeCard 
                  farmerName={farmData?.farmer.name || "Farmer"} 
                  farmStatus={farmData?.farm.status || "Loading farm status..."} 
                />
              </div>
              
              <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                <WaterQualityCard 
                  metrics={farmData?.waterQuality || defaultWaterQualityMetrics} 
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.15s' }}>
                <WaterTurbidityCard 
                  currentTurbidity={farmData?.soilMoisture?.level || 0}
                  turbidityData={farmData?.soilMoisture?.fields.map(field => ({
                    fieldName: field.name,
                    value: field.value
                  })) || []}
                />
              </div>
              
              <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
                <WeatherPredictionCard 
                  forecast={farmData?.waterPrediction?.forecast || []}
                  recommendation={farmData?.waterPrediction?.advice || "No weather data available"}
                />
              </div>

              <div className="slide-in-right" style={{ animationDelay: '0.25s' }}>
                <SmartIrrigationTipCard 
                  tip={farmData?.irrigationTip || "No irrigation tips available yet. Check back soon!"}
                />
              </div>
            </>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Home;
