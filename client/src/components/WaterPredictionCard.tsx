import { Cloud, Sun, CloudRain, CloudSun, Umbrella } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ForecastDay {
  day: string;
  temperature: string;
  weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
}

interface WaterPredictionCardProps {
  prediction: string;
  advice: string;
  forecast: ForecastDay[];
}

const WaterPredictionCard = ({ 
  prediction = "Rain expected in 2 days", 
  advice = "Delay irrigation to save water and energy.", 
  forecast = [] 
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
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <div className="rounded-full bg-blue-100 p-1 mr-2">
          <Cloud className="h-4 w-4 text-blue-500" />
        </div>
        Water Prediction
      </h3>
      
      <Card className="glass-effect rounded-3xl shadow-lg overflow-hidden border-0">
        <CardContent className="p-5">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-2 mr-5 shadow-sm border border-blue-100">
              <CloudRain className="h-9 w-9 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{prediction}</h4>
              <div className="flex items-center mt-1">
                <Umbrella className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                <p className="text-sm text-gray-600">{advice}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            {forecastData.map((day, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-b ${getWeatherBackground(day.weather)} rounded-2xl p-3 text-center shadow-sm border`}
              >
                <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
                <div className="flex justify-center my-1">
                  {getWeatherIcon(day.weather)}
                </div>
                <p className="text-sm font-bold">{day.temperature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterPredictionCard;
