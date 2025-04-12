import { Cloud, Sun, CloudRain, CloudSun } from "lucide-react";
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
        return <Sun className="h-5 w-5 text-accent" />;
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-secondary" />;
      case "partly-cloudy":
        return <CloudSun className="h-5 w-5 text-gray-500" />;
      default:
        return <Sun className="h-5 w-5 text-accent" />;
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
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <Cloud className="h-5 w-5 text-secondary mr-2" />
        Water Prediction
      </h3>
      
      <Card className="bg-secondary bg-opacity-10 rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 mr-4">
              <CloudRain className="h-10 w-10 text-secondary" />
            </div>
            <div>
              <h4 className="font-bold text-secondary">{prediction}</h4>
              <p className="text-sm text-neutral-dark">{advice}</p>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-3">
            {forecastData.map((day, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-70 rounded-lg p-2 text-center"
              >
                <p className="text-xs text-gray-500">{day.day}</p>
                {getWeatherIcon(day.weather)}
                <p className="text-xs font-bold">{day.temperature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterPredictionCard;
