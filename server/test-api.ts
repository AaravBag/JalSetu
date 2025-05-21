import 'dotenv/config';
import axios from 'axios';

async function testAPI() {
  try {
    console.log('Testing Farm Data API...');
    
    // Test farm data endpoint
    console.log('\n1. Testing /api/farm-data endpoint...');
    const farmDataResponse = await axios.get('http://localhost:5000/api/farm-data');
    const farmData = farmDataResponse.data;
    
    console.log('\nFarm Status:', farmData.farm.status);
    console.log('Irrigation Tip:', farmData.irrigationTip);
    
    console.log('\nWater Quality:');
    farmData.waterQuality.forEach((metric: any) => {
      console.log(`- ${metric.name}: ${metric.value}`);
    });
    
    console.log('\nWeather Prediction:');
    console.log('Message:', farmData.waterPrediction.message);
    console.log('Advice:', farmData.waterPrediction.advice);
    console.log('\nForecast:');
    farmData.waterPrediction.forecast.forEach((day: any) => {
      console.log(`${day.day}: ${day.temperature}, ${day.weather} (Rain: ${day.chanceOfRain}%)`);
    });
    
    console.log('\nAPI test completed successfully! ✅');
  } catch (error: any) {
    console.error('Error testing API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 