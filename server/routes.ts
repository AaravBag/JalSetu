import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { z } from "zod";
import { insertUserSchema, insertFarmSchema, insertFieldSchema, insertWaterQualitySchema, insertSoilMoistureSchema, insertWeatherPredictionSchema, insertIrrigationTipSchema } from "@shared/schema";
import { generateSensorData } from './services/gemini.js';
import { getNoidaWeather } from './services/weather';
import { generateFarmAdvice } from './services/gemini';

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to handle errors
  const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>) => 
    (req: Request, res: Response) => {
      Promise.resolve(fn(req, res)).catch(err => {
        console.error("API Error:", err);
        res.status(500).json({ 
          error: err.message || "Internal Server Error",
        });
      });
    };

  // User routes
  app.post("/api/users", asyncHandler(async (req, res) => {
    const userData = insertUserSchema.parse(req.body);
    const user = await storage.createUser(userData);
    res.status(201).json(user);
  }));

  // Farm routes
  app.post("/api/farms", asyncHandler(async (req, res) => {
    const farmData = insertFarmSchema.parse(req.body);
    const farm = await storage.createFarm(farmData);
    res.status(201).json(farm);
  }));

  app.get("/api/farms/:id", asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.id);
    const farm = await storage.getFarm(farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    res.json(farm);
  }));

  app.patch("/api/farms/:id", asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.id);
    const farmData = insertFarmSchema.partial().parse(req.body);
    const farm = await storage.updateFarm(farmId, farmData);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    res.json(farm);
  }));

  // Field routes
  app.post("/api/fields", asyncHandler(async (req, res) => {
    const fieldData = insertFieldSchema.parse(req.body);
    const field = await storage.createField(fieldData);
    res.status(201).json(field);
  }));

  app.get("/api/farms/:farmId/fields", asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.farmId);
    const fields = await storage.getFieldsByFarmId(farmId);
    res.json(fields);
  }));

  // Water Quality routes
  app.post("/api/water-qualities", asyncHandler(async (req, res) => {
    const qualityData = insertWaterQualitySchema.parse(req.body);
    const quality = await storage.createWaterQuality(qualityData);
    res.status(201).json(quality);
  }));

  // Soil Moisture routes
  app.post("/api/soil-moistures", asyncHandler(async (req, res) => {
    const moistureData = insertSoilMoistureSchema.parse(req.body);
    
    // Generate sensor data using Gemini
    const sensorData = await generateSensorData(moistureData.fieldId);
    
    // Create soil moisture record with generated data
    const moisture = await storage.createSoilMoisture({
      ...moistureData,
      moistureLevel: sensorData.soilMoisture,
      status: sensorData.soilMoisture > 60 ? "optimal" : sensorData.soilMoisture > 40 ? "warning" : "danger"
    });

    // Create water quality record with generated data
    await storage.createWaterQuality({
      farmId: moistureData.farmId,
      phLevel: sensorData.phLevel.toFixed(1),
      tds: `${Math.round(sensorData.tds)} ppm`,
      clarity: sensorData.clarity
    });

    res.status(201).json(moisture);
  }));

  // Weather Prediction routes
  app.post("/api/weather-predictions", asyncHandler(async (req, res) => {
    const predictionData = insertWeatherPredictionSchema.parse(req.body);
    const prediction = await storage.createWeatherPrediction(predictionData);
    res.status(201).json(prediction);
  }));

  // Irrigation Tip routes
  app.post("/api/irrigation-tips", asyncHandler(async (req, res) => {
    const tipData = insertIrrigationTipSchema.parse(req.body);
    const tip = await storage.createIrrigationTip(tipData);
    res.status(201).json(tip);
  }));

  // Dashboard data routes
  app.get("/api/farm-data", asyncHandler(async (req, res) => {
    try {
      console.log('Starting to fetch farm data...');

      // Get real weather data for Noida
      console.log('Fetching weather data...');
      const weatherData = await getNoidaWeather().catch(error => {
        console.error('Weather API error:', error);
        throw new Error(`Weather API failed: ${error.message}`);
      });
      console.log('Weather data received:', weatherData);
      
      // Get sensor data for AI advice
      console.log('Generating sensor data...');
      const sensorData = await generateSensorData(1).catch(error => {
        console.error('Sensor data generation error:', error);
        throw new Error(`Sensor data generation failed: ${error.message}`);
      });
      console.log('Sensor data generated:', sensorData);
      
      // Generate AI advice based on both sensor data and weather
      console.log('Generating AI advice...');
      const aiAdvice = await generateFarmAdvice({
        ...sensorData,
        weatherForecast: weatherData.forecast
      }).catch(error => {
        console.error('AI advice generation error:', error);
        throw new Error(`AI advice generation failed: ${error.message}`);
      });
      console.log('AI advice generated:', aiAdvice);

      // Create weather prediction record
      console.log('Creating weather prediction record...');
      const weatherPrediction = await storage.createWeatherPrediction({
        farmId: 1,
        message: weatherData.message,
        advice: weatherData.advice,
        forecast: JSON.stringify(weatherData.forecast)
      }).catch(error => {
        console.error('Weather prediction creation error:', error);
        throw new Error(`Weather prediction creation failed: ${error.message}`);
      });
      console.log('Weather prediction created:', weatherPrediction);

      // Create new irrigation tip
      console.log('Creating irrigation tip...');
      const irrigationTip = await storage.createIrrigationTip({
        farmId: 1,
        tip: aiAdvice.suggestion
      }).catch(error => {
        console.error('Irrigation tip creation error:', error);
        throw new Error(`Irrigation tip creation failed: ${error.message}`);
      });
      console.log('Irrigation tip created:', irrigationTip);

      const farmData = {
        farmer: {
          id: 1,
          name: "Ramesh",
        },
        farm: {
          id: 1,
          name: "Green Valley Farm",
          status: aiAdvice.status,
          location: "Noida"
        },
        waterQuality: [
          { name: "pH Level", value: sensorData.phLevel.toFixed(1), status: "Good", icon: "ph" },
          { name: "TDS", value: `${Math.round(sensorData.tds)} ppm`, status: "Good", icon: "tds" },
          { name: "Clarity", value: sensorData.clarity, status: "Good", icon: "clarity" }
        ],
        soilMoisture: {
          level: sensorData.soilMoisture,
          status: sensorData.soilMoisture > 60 ? "Ideal Moisture Level" : 
                 sensorData.soilMoisture > 40 ? "Moderate Moisture Level" : "Low Moisture Level",
          fields: [
            { id: 1, name: "Field 1", value: sensorData.soilMoisture, status: "optimal" }
          ]
        },
        waterPrediction: {
          message: weatherPrediction.message,
          advice: weatherPrediction.advice,
          forecast: weatherData.forecast
        },
        irrigationTip: irrigationTip.tip
      };
      
      console.log('Sending response...');
      return res.json(farmData);
    } catch (error) {
      console.error("Error in farm data endpoint:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      res.status(500).json({ 
        message: "Failed to fetch farm data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }));

  // Initialize database with seed data route (for development/demo purposes)
  app.post("/api/seed-database", asyncHandler(async (req, res) => {
    // Create user
    const user = await storage.createUser({
      name: "Ramesh",
      email: "ramesh@example.com",
      password: "password123" // In production, this should be hashed
    });

    // Create farm
    const farm = await storage.createFarm({
      name: "Green Valley Farm",
      location: "Karnataka",
      userId: user.id,
      status: "Your farm is thriving"
    });

    // Create fields
    const field1 = await storage.createField({
      name: "Field 1",
      farmId: farm.id
    });

    const field2 = await storage.createField({
      name: "Field 2",
      farmId: farm.id
    });

    // Create water quality
    const waterQuality = await storage.createWaterQuality({
      farmId: farm.id,
      phLevel: "6.8",
      tds: "320 ppm",
      clarity: "Clear"
    });

    // Create soil moistures
    const soilMoisture1 = await storage.createSoilMoisture({
      farmId: farm.id,
      fieldId: field1.id,
      moistureLevel: 68,
      status: "optimal"
    });

    const soilMoisture2 = await storage.createSoilMoisture({
      farmId: farm.id,
      fieldId: field2.id,
      moistureLevel: 45,
      status: "warning"
    });

    // Create weather prediction
    const weatherPrediction = await storage.createWeatherPrediction({
      farmId: farm.id,
      message: "Rain expected in 2 days",
      advice: "Delay irrigation to save water and energy.",
      forecast: JSON.stringify([
        { 
          day: "Today", 
          temperature: "32°C", 
          weather: "sunny",
          humidity: 65,
          wind: "10 km/h",
          uvIndex: 6,
          chanceOfRain: 0
        },
        { 
          day: "Tomorrow", 
          temperature: "30°C", 
          weather: "partly-cloudy",
          humidity: 70,
          wind: "12 km/h",
          uvIndex: 5,
          chanceOfRain: 20
        },
        { 
          day: "Thu", 
          temperature: "27°C", 
          weather: "rainy",
          humidity: 85,
          wind: "15 km/h",
          uvIndex: 3,
          chanceOfRain: 80
        }
      ])
    });

    // Create irrigation tip
    const irrigationTip = await storage.createIrrigationTip({
      farmId: farm.id,
      tip: "Based on your soil type and current moisture levels, water your crops early morning (5-7 AM) to minimize evaporation and maximize absorption."
    });

    res.status(201).json({
      message: "Database seeded successfully",
      data: {
        user,
        farm,
        fields: [field1, field2],
        waterQuality,
        soilMoistures: [soilMoisture1, soilMoisture2],
        weatherPrediction,
        irrigationTip
      }
    });
  }));

  const httpServer = createServer(app);

  return httpServer;
}
