import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, TestTube, Droplet, Scale, Thermometer, TrendingUp, Waves, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const WaterQualityDetails = () => {
  // Get the farm ID from the URL
  const [, params] = useRoute("/water-quality/:id");
  const farmId = params?.id ? parseInt(params.id) : 1;
  
  // Fetch detailed water quality data
  const { data: waterQualityData, isLoading } = useQuery({
    queryKey: [`/api/farm/${farmId}/water-quality`],
  });
  
  // If we don't have real historical data yet, we'll use this sample data
  const historicalData = [
    { date: "May 22", ph: 6.8, tds: 320, temperature: 28 },
    { date: "May 21", ph: 6.7, tds: 315, temperature: 27 },
    { date: "May 20", ph: 6.9, tds: 330, temperature: 29 },
    { date: "May 19", ph: 7.0, tds: 325, temperature: 28 },
    { date: "May 18", ph: 6.8, tds: 318, temperature: 26 }
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "good":
        return "text-green-500 bg-green-50 dark:bg-green-900/30 dark:text-green-400";
      case "warm":
      case "warning":
        return "text-amber-500 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400";
      case "bad":
      case "danger":
        return "text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "ph":
        return <Droplet className="h-5 w-5 text-secondary" />;
      case "tds":
        return <Scale className="h-5 w-5 text-secondary" />;
      case "temp":
        return <Thermometer className="h-5 w-5 text-accent" />;
      default:
        return <Droplet className="h-5 w-5 text-secondary" />;
    }
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
          <h1 className="text-xl font-bold">Water Quality Details</h1>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-60 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Water Quality Card */}
            <div className="slide-in-right">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-blue-100 p-1 mr-2">
                  <TestTube className="h-4 w-4 text-secondary" />
                </div>
                Current Readings
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {(waterQualityData?.metrics || [
                      { name: "pH Level", value: "6.8", status: "Good", icon: "ph" },
                      { name: "TDS", value: "320", unit: "ppm", status: "Good", icon: "tds" },
                      { name: "Temp", value: "28°C", status: "Warm", icon: "temp" }
                    ]).map((metric, index) => (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-50 dark:border-gray-700"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-2">
                          {getIcon(metric.icon)}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{metric.name}</span>
                        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{metric.value}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${getStatusColor(metric.status)}`}>
                          {metric.unit || metric.status}
                        </span>
                      </div>
                    ))}
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
                              <Droplet className="h-3 w-3 mr-1.5 text-secondary" />
                              pH Level
                            </div>
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Scale className="h-3 w-3 mr-1.5 text-secondary" />
                              TDS (ppm)
                            </div>
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Thermometer className="h-3 w-3 mr-1.5 text-accent" />
                              Temp (°C)
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalData.map((entry, index) => (
                          <tr key={index} className={index !== historicalData.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}>
                            <td className="py-2.5 px-3 text-sm font-medium">{entry.date}</td>
                            <td className="py-2.5 px-3 text-sm">{entry.ph}</td>
                            <td className="py-2.5 px-3 text-sm">{entry.tds}</td>
                            <td className="py-2.5 px-3 text-sm">{entry.temperature}°C</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommendations Card */}
            <div className="fade-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-green-100 p-1 mr-2">
                  <Waves className="h-4 w-4 text-green-500" />
                </div>
                Recommendations
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-xl p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong className="text-green-600 dark:text-green-400">pH Level (6.8):</strong> Your water pH is optimal for most crops. Maintain the current irrigation system.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong className="text-blue-600 dark:text-blue-400">TDS (320 ppm):</strong> Good mineral content for plant growth. Consider testing specific nutrients if growing specialized crops.
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-xl p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong className="text-amber-600 dark:text-amber-400">Temperature (28°C):</strong> Slightly warm. Consider early morning irrigation to minimize evaporation and heat stress on plants.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Reading Schedule Card */}
            <div className="scale-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-purple-100 p-1 mr-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                </div>
                Reading Schedule
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 mb-6">
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 mb-3">
                    Your water quality sensors are currently set to record measurements at the following intervals:
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-sm font-medium">Regular Readings</span>
                      <span className="text-sm text-gray-500">Every 24 hours</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-sm font-medium">Irrigation Events</span>
                      <span className="text-sm text-gray-500">Before & After</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Weather Alerts</span>
                      <span className="text-sm text-gray-500">As needed</span>
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

export default WaterQualityDetails;