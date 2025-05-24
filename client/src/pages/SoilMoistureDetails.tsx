import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Shrub, DropletIcon, TrendingUp, ClipboardList, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const SoilMoistureDetails = () => {
  // Get the farm ID from the URL
  const [, params] = useRoute("/soil-moisture/:id");
  const farmId = params?.id ? parseInt(params.id) : 1;
  
  // Fetch detailed soil moisture data
  const { data: soilMoistureData, isLoading } = useQuery({
    queryKey: [`/api/farm/${farmId}/soil-moisture`],
  });
  
  // Sample historical data
  const historicalData = [
    { date: "May 22", average: 68, field1: 70, field2: 65 },
    { date: "May 21", average: 65, field1: 67, field2: 63 },
    { date: "May 20", average: 61, field1: 64, field2: 58 },
    { date: "May 19", average: 72, field1: 75, field2: 69 },
    { date: "May 18", average: 69, field1: 71, field2: 67 }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-primary/10 text-primary border-primary/20";
      case "warning":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "danger":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getMoistureColor = (level: number) => {
    if (level >= 60) return "text-primary";
    if (level >= 40) return "text-amber-500";
    return "text-red-500";
  };
  
  // Default field readings if none provided
  const defaultFieldReadings = [
    { id: 1, name: "Field 1", value: 68, status: "optimal" },
    { id: 2, name: "Field 2", value: 45, status: "warning" }
  ];
  
  const fieldReadings = soilMoistureData?.fields || defaultFieldReadings;
  const moistureLevel = soilMoistureData?.level || 68;
  const moistureStatus = soilMoistureData?.status || "Ideal Moisture Level";
  
  // Calculate the stroke-dashoffset based on the moisture level
  const calculateOffset = (percent: number) => {
    const circumference = 2 * Math.PI * 40;
    return circumference - (percent / 100) * circumference;
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 px-5 pt-2 pb-4 overflow-y-auto z-10">
        <div className="flex items-center mb-5">
          <Link href="/" className="mr-3">
            <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800 flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          </Link>
          <h1 className="text-xl font-bold">Soil Moisture Details</h1>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-60 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Soil Moisture Card */}
            <div className="slide-in-right">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-green-100 p-1 mr-2">
                  <Shrub className="h-4 w-4 text-primary" />
                </div>
                Current Readings
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-[100px] h-[100px] relative flex items-center justify-center">
                        <svg className="w-[100px] h-[100px] transform -rotate-90" viewBox="0 0 100 100">
                          <circle 
                            className="text-gray-100" 
                            strokeWidth="8" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="40" 
                            cx="50" 
                            cy="50"
                          />
                          <circle 
                            className={`${getMoistureColor(moistureLevel)}`}
                            strokeWidth="8" 
                            strokeLinecap="round" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="40" 
                            cx="50" 
                            cy="50"
                            strokeDasharray="251.2"
                            strokeDashoffset={calculateOffset(moistureLevel)}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-2xl font-bold ${getMoistureColor(moistureLevel)}`}>
                            {moistureLevel}%
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium -mt-1">MOISTURE</span>
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="absolute -right-1 top-1/4 opacity-20">
                          <DropletIcon className={`h-5 w-5 ${getMoistureColor(moistureLevel)}`} />
                        </div>
                        <div className="absolute -left-2 bottom-1/4 opacity-10">
                          <DropletIcon className={`h-8 w-8 ${getMoistureColor(moistureLevel)}`} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 ml-5">
                      <h4 className="font-bold text-gray-800">{moistureStatus}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Current soil moisture is optimal for your crops.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {fieldReadings.map((field) => (
                          <span 
                            key={field.id}
                            className={`px-3 py-1 rounded-full text-xs border ${getStatusClass(field.status)} font-medium shadow-sm`}
                          >
                            {field.name}: {field.value}%
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Historical Data Card */}
            <div className="slide-in-left">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-indigo-100 p-1 mr-2">
                  <TrendingUp className="h-4 w-4 text-indigo-500" />
                </div>
                Historical Data
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Date</th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <DropletIcon className="h-3 w-3 mr-1.5 text-primary" />
                              Average (%)
                            </div>
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Shrub className="h-3 w-3 mr-1.5 text-green-500" />
                              Field 1 (%)
                            </div>
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Shrub className="h-3 w-3 mr-1.5 text-green-500" />
                              Field 2 (%)
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalData.map((entry, index) => (
                          <tr key={index} className={index !== historicalData.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}>
                            <td className="py-2.5 px-3 text-sm font-medium">{entry.date}</td>
                            <td className="py-2.5 px-3 text-sm">{entry.average}%</td>
                            <td className="py-2.5 px-3 text-sm">{entry.field1}%</td>
                            <td className="py-2.5 px-3 text-sm">{entry.field2}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Field Analysis Card */}
            <div className="fade-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-green-100 p-1 mr-2">
                  <Sprout className="h-4 w-4 text-green-500" />
                </div>
                Field Analysis
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                      <h4 className="text-sm font-bold text-green-700 mb-1">Field 1 - North Paddy</h4>
                      <p className="text-sm text-gray-700">
                        Currently at <strong>70%</strong> moisture level. Optimal for rice cultivation at current growth stage. No irrigation needed for the next 48 hours.
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                      <h4 className="text-sm font-bold text-amber-700 mb-1">Field 2 - South Vegetable Patch</h4>
                      <p className="text-sm text-gray-700">
                        Currently at <strong>45%</strong> moisture level. Below optimal for vegetable crops. Schedule irrigation within the next 24 hours to avoid potential crop stress.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommendations Card */}
            <div className="scale-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-purple-100 p-1 mr-2">
                  <ClipboardList className="h-4 w-4 text-purple-500" />
                </div>
                Irrigation Recommendations
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 mb-6">
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 mb-4">
                    Based on current soil moisture readings, crop types, and forecasted weather:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-500 font-bold">1</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-800">Field 1:</strong> Skip irrigation for the next 2 days to maintain optimal moisture levels.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-amber-500 font-bold">2</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-800">Field 2:</strong> Irrigate tomorrow morning (5-7 AM) with 2.5 cm of water to reach optimal moisture level.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-500 font-bold">3</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-800">Next check:</strong> Monitor Field 2 moisture levels 24 hours after irrigation to ensure proper absorption.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default SoilMoistureDetails;