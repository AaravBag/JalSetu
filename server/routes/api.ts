import express, { Request, Response, Router } from 'express';

const router = Router();

// Test endpoint to verify router is working
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'API is working' });
});

// Farm data endpoint
router.get('/farm-data', (req: Request, res: Response) => {
  console.log('Farm data endpoint called');
  try {
    const generateRandomValue = (min: number, max: number) => {
      return Number((Math.random() * (max - min) + min).toFixed(1));
    };

    const farmData = {
      farmer: {
        id: 1,
        name: "John Smith"
      },
      farm: {
        id: 1,
        name: "Green Valley Farm",
        status: "Active"
      },
      waterQuality: [
        { name: "pH Level", value: generateRandomValue(6.5, 7.5), status: "Good", icon: "ph" },
        { name: "TDS", value: generateRandomValue(300, 400), unit: "ppm", status: "Good", icon: "tds" },
        { name: "Clarity", value: "Clear", status: "Good", icon: "clarity" }
      ],
      soilMoisture: {
        level: generateRandomValue(1, 5),
        status: "Good",
        fields: [
          { id: 1, name: "Field 1", value: generateRandomValue(1, 5), status: "Good" },
          { id: 2, name: "Field 2", value: generateRandomValue(1, 5), status: "Good" }
        ]
      },
      waterPrediction: {
        message: "Favorable conditions for irrigation",
        advice: "Best time to irrigate is early morning",
        forecast: [
          {
            day: "Today",
            temperature: "24°C",
            weather: "sunny",
            humidity: 65,
            wind: "10 km/h",
            uvIndex: 6,
            chanceOfRain: 10
          },
          {
            day: "Tomorrow",
            temperature: "26°C",
            weather: "partly-cloudy",
            humidity: 70,
            wind: "12 km/h",
            uvIndex: 5,
            chanceOfRain: 30
          },
          {
            day: "Day After",
            temperature: "23°C",
            weather: "rainy",
            humidity: 80,
            wind: "15 km/h",
            uvIndex: 3,
            chanceOfRain: 70
          }
        ]
      },
      irrigationTip: "Consider using drip irrigation for optimal water usage"
    };

    console.log('Sending farm data:', JSON.stringify(farmData, null, 2));
    return res.status(200).json(farmData);
  } catch (error) {
    console.error('Error in farm data endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Turbidity data endpoint
router.get('/turbidity', (req: Request, res: Response) => {
  console.log('Turbidity endpoint called');
  try {
    const generateTurbidityValue = () => {
      // Generate a random value between 1 and 5
      const randomValue = Math.random() * 4 + 1;
      console.log('Generated random value:', randomValue);
      return Number(randomValue.toFixed(1));
    };

    const currentValue = generateTurbidityValue();
    console.log('Current turbidity value:', currentValue);
    
    const turbidityData = {
      currentTurbidity: currentValue,
      fields: [
        { fieldName: "Field 1", value: generateTurbidityValue() },
        { fieldName: "Field 2", value: generateTurbidityValue() }
      ]
    };

    console.log('Sending turbidity data:', JSON.stringify(turbidityData, null, 2));
    return res.status(200).json(turbidityData);
  } catch (error) {
    console.error('Error in turbidity endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 