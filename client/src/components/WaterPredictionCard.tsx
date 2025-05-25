import { Cloud, Sun, CloudRain, CloudSun, Umbrella, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface ForecastDay {
  day: string;
  temperature: string;
  weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
}

interface WaterPredictionCardProps {
  prediction: string;
  advice: string;
  forecast: ForecastDay[];
  farmId?: number;
}

const WaterPredictionCard = ({ 
  prediction = "Rain expected in 2 days", 
  advice = "Delay irrigation to save water and energy.", 
  forecast = [],
  farmId = 1
}: WaterPredictionCardProps) => {
  
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
        return "from-amber-50 to-orange-50 border-amber-100";
      case "cloudy":
        return "from-gray-50 to-slate-50 border-gray-100";
      case "rainy":
        return "from-blue-50 to-indigo-50 border-blue-100";
      case "partly-cloudy":
        return "from-blue-50 to-amber-50 border-blue-100";
      default:
        return "from-gray-50 to-white border-gray-100";
    }
  };

  // Default forecast if none provided
  const defaultForecast: ForecastDay[] = [
    { day: "Today", temperature: "32°C", weather: "sunny" },
    { day: "Tomorrow", temperature: "30°C", weather: "partly-cloudy" },
    { day: "Thu", temperature: "27°C", weather: "rainy" }
  ];

  const forecastData = forecast.length ? forecast : defaultForecast;

  return (
    <div className="mb-5">
      <h3 className="text-lg font-bold mb-3 flex items-center gradient-text">
        <div className="rounded-full bg-blue-100 p-1.5 mr-2 shadow-sm">
          <Cloud className="h-4 w-4 text-blue-600" />
        </div>
        Water Prediction
      </h3>
      
      <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0 card-highlight enhanced-card">
        <CardContent className="p-5 relative">
          {/* Decorative elements */}
          <div className="absolute top-3 right-3 opacity-20 floating" style={{ animationDelay: '1.5s' }}>
            <CloudRain className="h-14 w-14 text-blue-400" />
          </div>
          <div className="absolute -bottom-6 -left-4 opacity-10 floating" style={{ animationDelay: '0.8s' }}>
            <CloudSun className="h-16 w-16 text-amber-400" />
          </div>
          
          <div className="flex items-center relative z-10">
            <div className="w-18 h-18 rounded-2xl gradient-blue flex items-center justify-center p-3 mr-5 shadow-md border border-blue-200 dark:border-blue-700 pulse-effect">
              <CloudRain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{prediction}</h4>
              <div className="flex items-center mt-2">
                <CloudRain className="h-4 w-4 text-blue-500 mr-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{advice}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 grid grid-cols-3 gap-3">
            {forecastData.map((day, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-b ${getWeatherBackground(day.weather)} rounded-2xl p-3 text-center shadow-sm border hover:shadow-md transition-all dark:border-gray-700`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{day.day}</p>
                <div className="flex justify-center my-1.5 floating" style={{ animationDelay: `${index * 0.2}s` }}>
                  {getWeatherIcon(day.weather)}
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{day.temperature}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-5 text-right">
            <Link href={`/water-prediction/${farmId}`} className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium transition-colors hover:bg-blue-600 shadow-sm">
              View Details
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterPredictionCard;
