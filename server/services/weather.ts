import axios from 'axios';
import 'dotenv/config';

interface WeatherResponse {
  message: string;
  advice: string;
  forecast: Array<{
    day: string;
    temperature: string;
    weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
    humidity: number;
    wind: string;
    uvIndex: number;
    chanceOfRain: number;
  }>;
  currentConditions: {
    temperature: string;
    feelsLike: string;
    humidity: number;
    wind: string;
    uvIndex: number;
    pressure: string;
    visibility: string;
  };
}

const WEATHER_API_KEY = 'c1a00d3d8d8b488a95d161226241112';
const NOIDA_LOCATION = "Noida";

function getWeatherType(condition: number): "sunny" | "cloudy" | "rainy" | "partly-cloudy" {
  // WeatherAPI condition codes: https://www.weatherapi.com/docs/weather_conditions.json
  if (condition === 1000) return "sunny";           // Clear, Sunny
  if (condition <= 1003) return "partly-cloudy";    // Partly cloudy
  if (condition <= 1030) return "cloudy";           // Cloudy, Overcast, Mist
  if (condition <= 1063) return "rainy";            // Patchy rain
  if (condition <= 1087) return "partly-cloudy";    // Thunder
  if (condition <= 1189) return "rainy";            // Rain
  if (condition <= 1201) return "rainy";            // Heavy rain
  if (condition <= 1246) return "rainy";            // Torrential rain
  if (condition <= 1264) return "rainy";            // Sleet
  return "partly-cloudy";                           // Default
}

function getUVAdvice(uvIndex: number): string {
  if (uvIndex >= 8) return "Very high UV levels - protect crops sensitive to UV damage";
  if (uvIndex >= 6) return "High UV levels - consider shade for sensitive crops";
  if (uvIndex >= 3) return "Moderate UV levels - good for most crops";
  return "Low UV levels";
}

function getHumidityAdvice(humidity: number): string {
  if (humidity >= 80) return "High humidity - monitor for fungal diseases";
  if (humidity <= 30) return "Low humidity - increase irrigation frequency";
  return "Optimal humidity levels for most crops";
}

function getWindAdvice(windKph: number): string {
  if (windKph >= 20) return "Strong winds - secure young plants and consider windbreaks";
  if (windKph >= 10) return "Moderate winds - increased water evaporation likely";
  return "Light winds - normal irrigation recommended";
}

export async function getNoidaWeather(): Promise<WeatherResponse> {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WeatherAPI key not configured');
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${NOIDA_LOCATION}&days=3&aqi=yes`
    );

    const current = response.data.current;
    const currentConditions = {
      temperature: `${Math.round(current.temp_c)}°C`,
      feelsLike: `${Math.round(current.feelslike_c)}°C`,
      humidity: current.humidity,
      wind: `${current.wind_kph} km/h ${current.wind_dir}`,
      uvIndex: current.uv,
      pressure: `${current.pressure_mb} mb`,
      visibility: `${current.vis_km} km`
    };

    const forecast = response.data.forecast.forecastday.map((day: any, index: number) => ({
      day: index === 0 ? "Today" : 
           index === 1 ? "Tomorrow" : 
           new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      temperature: `${Math.round(day.day.maxtemp_c)}°C`,
      weather: getWeatherType(day.day.condition.code),
      humidity: day.day.avghumidity,
      wind: `${Math.round(day.day.maxwind_kph)} km/h`,
      uvIndex: day.day.uv,
      chanceOfRain: day.day.daily_chance_of_rain
    }));

    // Generate comprehensive advice based on weather conditions
    const tomorrowData = response.data.forecast.forecastday[1].day;
    const tomorrowWeather = getWeatherType(tomorrowData.condition.code);
    const tomorrowTemp = tomorrowData.maxtemp_c;
    const chanceOfRain = tomorrowData.daily_chance_of_rain;
    const tomorrowHumidity = tomorrowData.avghumidity;
    const tomorrowWind = tomorrowData.maxwind_kph;
    const tomorrowUV = tomorrowData.uv;
    
    let message = "Weather forecast for tomorrow:";
    let advice = "";

    // Temperature advice
    if (tomorrowWeather === "rainy") {
      message = `Rain expected tomorrow (${chanceOfRain}% chance)`;
      advice = "Reduce irrigation to conserve water. ";
    } else if (tomorrowWeather === "sunny" && tomorrowTemp > 35) {
      message = `High temperatures expected (${Math.round(tomorrowTemp)}°C)`;
      advice = "Increase irrigation to prevent water stress. ";
    } else if (tomorrowWeather === "partly-cloudy") {
      message = "Partly cloudy conditions expected";
      advice = "Standard irrigation recommended. ";
    }

    // Add other parameter advice
    advice += getHumidityAdvice(tomorrowHumidity) + ". ";
    advice += getWindAdvice(tomorrowWind) + ". ";
    advice += getUVAdvice(tomorrowUV) + ".";

    return {
      message,
      advice,
      forecast,
      currentConditions
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
} 