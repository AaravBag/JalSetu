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
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white pb-20">
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-4 mt-4">
            <div className="h-24 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
