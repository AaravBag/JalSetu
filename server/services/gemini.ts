import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
}

interface SensorData {
  soilMoisture: number;
  tds: number;
  phLevel: number;
  clarity: string;
  weatherForecast?: Array<{
    day: string;
    temperature: string;
    weather: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
    humidity: number;
    wind: string;
    uvIndex: number;
    chanceOfRain: number;
  }>;
}

interface FarmAdvice {
  status: string;
  suggestion: string;
}

export async function generateFarmAdvice(sensorData: SensorData): Promise<FarmAdvice> {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const weatherInfo = sensorData.weatherForecast ? `
    Weather Forecast:
    ${sensorData.weatherForecast.map(day => `
    ${day.day}:
    - Temperature: ${day.temperature}
    - Weather: ${day.weather}
    - Humidity: ${day.humidity}%
    - Wind: ${day.wind}
    - Rain Chance: ${day.chanceOfRain}%`).join('\n')}
    ` : '';

    const prompt = `As an agricultural expert AI, analyze these sensor readings and weather forecast to provide farm status and irrigation suggestions:

    Current Readings:
    - Soil Moisture: ${sensorData.soilMoisture}%
    - TDS (Total Dissolved Solids): ${sensorData.tds} ppm
    - pH Level: ${sensorData.phLevel}
    - Water Clarity: ${sensorData.clarity}
    ${weatherInfo}

    Based on both current conditions and weather forecast, provide a JSON response with:
    1. A brief status of the farm (1 short sentence)
    2. A specific irrigation suggestion considering weather conditions (1-2 sentences)

    Example format:
    {
      "status": "Farm conditions are optimal",
      "suggestion": "Consider early morning irrigation tomorrow as no rain is expected and temperatures will be high."
    }

    Analyze and respond:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    try {
      const advice = JSON.parse(text);
      return {
        status: advice.status || "Farm status being analyzed",
        suggestion: advice.suggestion || "Generating personalized suggestions..."
      };
    } catch (parseError) {
      console.error('Error parsing Gemini advice response:', parseError);
      return {
        status: "Farm is being monitored",
        suggestion: "Analyzing sensor data for personalized recommendations..."
      };
    }
  } catch (error) {
    console.error('Error generating farm advice:', error);
    return {
      status: "Farm is being monitored",
      suggestion: "Analyzing sensor data for personalized recommendations..."
    };
  }
}

export async function generateSensorData(fieldId: number): Promise<SensorData> {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an agricultural IoT sensor system. Generate realistic sensor readings for a farm field.
    
    Rules:
    1. Soil moisture should be between 40-80% (optimal range for most crops)
    2. TDS (Total Dissolved Solids) should be between 300-600 ppm (good range for agriculture)
    3. pH level should be between 6.0-7.2 (optimal for most crops)
    4. Water clarity should be one of: "Clear", "Slightly Turbid", "Turbid"
    5. Return ONLY a JSON object with these exact keys: soilMoisture, tds, phLevel, clarity
    6. All values should be numbers (no units or strings) except clarity which should be a string
    
    Example response format:
    {
      "soilMoisture": 65,
      "tds": 450,
      "phLevel": 6.8,
      "clarity": "Clear"
    }
    
    Generate new values now:`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    console.log('Received response from Gemini:', text);
    
    try {
      // Try to parse the response as JSON
      const data = JSON.parse(text);
      
      // Validate the response has the required fields and types
      if (typeof data.soilMoisture !== 'number' || 
          typeof data.tds !== 'number' || 
          typeof data.phLevel !== 'number' ||
          typeof data.clarity !== 'string') {
        throw new Error('Invalid data types in Gemini response');
      }
      
      // Ensure values are within valid ranges
      return {
        soilMoisture: Math.min(80, Math.max(40, data.soilMoisture)),
        tds: Math.min(600, Math.max(300, data.tds)),
        phLevel: Math.min(7.2, Math.max(6.0, data.phLevel)),
        clarity: ["Clear", "Slightly Turbid", "Turbid"].includes(data.clarity) ? data.clarity : "Clear"
      };
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse Gemini response as JSON');
    }
  } catch (error) {
    console.error('Error generating sensor data:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Fallback to realistic random values if Gemini API fails
    return {
      soilMoisture: Math.floor(Math.random() * (75 - 45) + 45), // 45-75% range
      tds: Math.floor(Math.random() * (550 - 350) + 350),       // 350-550 ppm range
      phLevel: Number((Math.random() * (7.0 - 6.2) + 6.2).toFixed(1)), // 6.2-7.0 range
      clarity: "Clear" // Default to Clear
    };
  }
} 