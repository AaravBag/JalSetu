import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import WaterQualityCard from "@/components/WaterQualityCard";
import SoilMoistureCard from "@/components/SoilMoistureCard";
import WaterPredictionCard from "@/components/WaterPredictionCard";
import SmartIrrigationTipCard from "@/components/SmartIrrigationTipCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";

// Define the type for farm data
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
  waterQuality: Array<{
    name: string;
    value: string | number;
    unit?: string;
    status: string;
    icon: "ph" | "tds" | "temp";
  }>;
  soilMoisture: {
    level: number;
    status: string;
    fields: Array<{
      id: number;
      name: string;
      value: number;
      status: "optimal" | "warning" | "danger";
    }>;
  };
  waterPrediction: {
    message: string;
    advice: string;
    forecast: Array<{
      day: string;
      temperature: string;
      weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
    }>;
  };
  irrigationTip: string;
}

const Home = () => {
  const { darkMode } = useTheme();
  const { data: farmData, isLoading } = useQuery<FarmData>({
    queryKey: ["/api/user-dashboard"],
  });
  
  // Get user info for personalized experience
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-56 overflow-hidden z-0 opacity-40">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary opacity-10 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-secondary opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 rounded-full bg-accent opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        {isLoading ? (
          <div className="flex flex-col gap-4 mt-4">
            <div className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="fade-in">
              <WelcomeCard 
                farmerName={user?.firstName || farmData?.farmer.name || "Farmer"} 
                farmStatus={farmData?.farm?.status || "Loading farm status..."} 
              />
            </div>
            
            <div className="scale-in" style={{ animationDelay: '0.1s' }}>
              <WaterQualityCard 
                qualityMetrics={farmData?.waterQuality || []} 
              />
            </div>
            
            <div className="slide-in-right" style={{ animationDelay: '0.2s' }}>
              <SoilMoistureCard 
                moistureLevel={farmData?.soilMoisture?.level || 0}
                moistureStatus={farmData?.soilMoisture?.status || ""}
                fieldReadings={farmData?.soilMoisture?.fields || []}
              />
            </div>
            
            <div className="slide-in-left" style={{ animationDelay: '0.3s' }}>
              <WaterPredictionCard 
                prediction={farmData?.waterPrediction?.message || ""}
                advice={farmData?.waterPrediction?.advice || ""}
                forecast={farmData?.waterPrediction?.forecast || []}
              />
            </div>
            
            <div className="slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              <SmartIrrigationTipCard 
                tip={farmData?.irrigationTip || ""}
              />
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
