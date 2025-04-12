import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import WaterQualityCard from "@/components/WaterQualityCard";
import SoilMoistureCard from "@/components/SoilMoistureCard";
import WaterPredictionCard from "@/components/WaterPredictionCard";
import SmartIrrigationTipCard from "@/components/SmartIrrigationTipCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: farmData, isLoading } = useQuery({
    queryKey: ["/api/farm-data"],
  });

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 pb-20">
      {/* Decorative top background pattern */}
      <div className="absolute top-0 left-0 right-0 h-56 overflow-hidden z-0 opacity-40">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary opacity-10"></div>
        <div className="absolute top-20 -left-10 w-36 h-36 rounded-full bg-secondary opacity-10"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 rounded-full bg-accent opacity-10"></div>
      </div>
      
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        {isLoading ? (
          <div className="flex flex-col gap-4 mt-4">
            <div className="h-24 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <WelcomeCard 
              farmerName={farmData?.farmer.name || "Farmer"} 
              farmStatus={farmData?.farm.status || "Loading farm status..."} 
            />
            
            <WaterQualityCard 
              qualityMetrics={farmData?.waterQuality || []} 
            />
            
            <SoilMoistureCard 
              moistureLevel={farmData?.soilMoisture.level || 0}
              moistureStatus={farmData?.soilMoisture.status || ""}
              fieldReadings={farmData?.soilMoisture.fields || []}
            />
            
            <WaterPredictionCard 
              prediction={farmData?.waterPrediction.message || ""}
              advice={farmData?.waterPrediction.advice || ""}
              forecast={farmData?.waterPrediction.forecast || []}
            />
            
            <SmartIrrigationTipCard 
              tip={farmData?.irrigationTip || ""}
            />
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
