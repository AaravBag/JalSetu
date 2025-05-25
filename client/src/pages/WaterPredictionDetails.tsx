import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Cloud, Sun, CloudRain, CloudSun, TrendingUp, Droplet, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

interface ForecastDay {
  day: string;
  temperature: string;
  weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
}

const WaterPredictionDetails = () => {
  // Get the farm ID from the URL
  const [, params] = useRoute("/water-prediction/:id");
  const farmId = params?.id ? parseInt(params.id) : 1;
  
  // Fetch detailed water prediction data
  const { data: predictionData, isLoading } = useQuery({
    queryKey: [`/api/farm/${farmId}/water-prediction`],
  });
  
  // Default prediction if none provided
  const defaultPrediction = {
    message: "Rain expected in 2 days",
    advice: "Delay irrigation to save water and energy.",
    forecast: [
      { day: "Today", temperature: "32°C", weather: "sunny" },
      { day: "Tomorrow", temperature: "30°C", weather: "partly-cloudy" },
      { day: "Thu", temperature: "27°C", weather: "rainy" },
      { day: "Fri", temperature: "26°C", weather: "rainy" },
      { day: "Sat", temperature: "28°C", weather: "partly-cloudy" },
      { day: "Sun", temperature: "30°C", weather: "sunny" },
      { day: "Mon", temperature: "31°C", weather: "sunny" }
    ]
  };
  
  const prediction = predictionData?.message || defaultPrediction.message;
  const advice = predictionData?.advice || defaultPrediction.advice;
  const forecast = predictionData?.forecast || defaultPrediction.forecast;

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "sunny":
        return <Sun className="h-6 w-6 text-amber-500" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "partly-cloudy":
        return <CloudSun className="h-6 w-6 text-gray-500" />;
      default:
        return <Sun className="h-6 w-6 text-amber-500" />;
    }
  };

  const getWeatherBackground = (weather: string) => {
    switch (weather) {
      case "sunny":
        return "from-amber-50 to-orange-50 border-amber-100 dark:from-amber-900/30 dark:to-orange-900/30 dark:border-amber-800";
      case "cloudy":
        return "from-gray-50 to-slate-50 border-gray-100 dark:from-gray-800 dark:to-slate-800 dark:border-gray-700";
      case "rainy":
        return "from-blue-50 to-indigo-50 border-blue-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-800";
      case "partly-cloudy":
        return "from-blue-50 to-amber-50 border-blue-100 dark:from-blue-900/30 dark:to-amber-900/30 dark:border-blue-800";
      default:
        return "from-gray-50 to-white border-gray-100 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600";
    }
  };
  
  // Calculate estimated water needs
  const waterNeeds = [
    { crop: "Rice", currentNeed: "Low", nextWeek: "Medium" },
    { crop: "Vegetables", currentNeed: "Medium", nextWeek: "Low" },
    { crop: "Fruit Trees", currentNeed: "High", nextWeek: "Medium" }
  ];
  
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
          <h1 className="text-xl font-bold">Water Prediction Details</h1>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-60 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Prediction Card */}
            <div className="slide-in-right">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-blue-100 p-1 mr-2">
                  <Cloud className="h-4 w-4 text-blue-500" />
                </div>
                Current Prediction
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-2 mr-5 shadow-sm border border-blue-100">
                      <CloudRain className="h-9 w-9 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{prediction}</h4>
                      <p className="text-sm text-gray-600 mt-1">{advice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 7-Day Forecast Card */}
            <div className="slide-in-left">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-indigo-100 p-1 mr-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                </div>
                7-Day Forecast
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-3 min-w-[500px]">
                      {forecast.map((day, index) => (
                        <div 
                          key={index} 
                          className={`flex-1 bg-gradient-to-b ${getWeatherBackground(day.weather)} rounded-2xl p-3 text-center shadow-sm border`}
                        >
                          <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
                          <div className="flex justify-center my-1">
                            {getWeatherIcon(day.weather)}
                          </div>
                          <p className="text-sm font-bold">{day.temperature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Precipitation Forecast Card */}
            <div className="fade-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-blue-100 p-1 mr-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                </div>
                Precipitation Forecast
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="w-3 h-8 bg-blue-100 rounded-sm mr-3"></span>
                        <span className="text-sm font-medium">Today</span>
                      </div>
                      <span className="text-sm text-gray-500">0 mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="w-3 h-8 bg-blue-200 rounded-sm mr-3"></span>
                        <span className="text-sm font-medium">Tomorrow</span>
                      </div>
                      <span className="text-sm text-gray-500">0-2 mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="w-3 h-8 bg-blue-400 rounded-sm mr-3"></span>
                        <span className="text-sm font-medium">Thursday</span>
                      </div>
                      <span className="text-sm text-gray-500">15-20 mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="w-3 h-8 bg-blue-500 rounded-sm mr-3"></span>
                        <span className="text-sm font-medium">Friday</span>
                      </div>
                      <span className="text-sm text-gray-500">10-15 mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-3 h-8 bg-blue-200 rounded-sm mr-3"></span>
                        <span className="text-sm font-medium">Weekend</span>
                      </div>
                      <span className="text-sm text-gray-500">0-5 mm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Water Needs Analysis Card */}
            <div className="scale-in">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="rounded-full bg-green-100 p-1 mr-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                Crop Water Needs
              </h3>
              
              <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 mb-6">
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Estimated water requirements based on weather forecast and crop growth stage:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Crop Type</th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Current Need</th>
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Next Week</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waterNeeds.map((item, index) => (
                          <tr key={index} className={index !== waterNeeds.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}>
                            <td className="py-2.5 px-3 text-sm font-medium">{item.crop}</td>
                            <td className="py-2.5 px-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                item.currentNeed === "Low" 
                                  ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                                  : item.currentNeed === "Medium" 
                                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" 
                                    : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              }`}>
                                {item.currentNeed}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                item.nextWeek === "Low" 
                                  ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                                  : item.nextWeek === "Medium" 
                                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" 
                                    : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              }`}>
                                {item.nextWeek}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default WaterPredictionDetails;