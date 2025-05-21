import React from 'react';
import { Cloud, CloudRain, Sun, Umbrella, Wind, Thermometer, Droplets } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherDay {
  day: string;
  temperature: string;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  humidity: number;
  wind: string;
  uvIndex: number;
  chanceOfRain: number;
}

interface WeatherPredictionCardProps {
  forecast: WeatherDay[];
  recommendation?: string;
}

const WeatherIcon = ({ type }: { type: WeatherDay['weather'] }) => {
  switch (type) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-amber-500" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'partly-cloudy':
      return <Cloud className="h-8 w-8 text-gray-400" />;
  }
};

const WeatherPredictionCard = ({ forecast, recommendation }: WeatherPredictionCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800 transition-all duration-200 shadow-sm mb-16">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30">
            <Umbrella className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Weather Prediction
          </h2>
        </div>

        {recommendation && (
          <div className="mb-4 p-3 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-start gap-2">
              <CloudRain className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <p className="text-sm leading-relaxed text-blue-600 dark:text-blue-400">
                {recommendation}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {forecast.map((day, index) => (
            <div
              key={day.day}
              className="p-3 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 transition-all duration-200"
            >
              <div className="text-center">
                <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                  {day.day}
                </p>
                <div className="mb-2 flex justify-center">
                  <WeatherIcon type={day.weather} />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {day.temperature}
                  </p>
                  
                  {/* Humidity */}
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-1.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {day.humidity}% humidity
                      </span>
                    </div>
                  </div>

                  {/* Wind and UV */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-1.5">
                      <div className="flex flex-col items-center gap-0.5">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {day.wind}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-1.5">
                      <div className="flex flex-col items-center gap-0.5">
                        <Thermometer className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          UV {day.uvIndex}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rain Chance */}
                  <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-1.5">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {day.chanceOfRain}% chance of rain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherPredictionCard; 