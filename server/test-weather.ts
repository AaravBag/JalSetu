import 'dotenv/config';
import { getNoidaWeather } from './services/weather';

async function testWeatherAPI() {
  try {
    console.log('Testing Weather API...');
    const weatherData = await getNoidaWeather();
    
    console.log('Weather Data:', JSON.stringify(weatherData, null, 2));
    console.log('API is working! ✅');
  } catch (error: any) {
    console.error('Error testing weather API:', error.message);
  }
}

testWeatherAPI(); 