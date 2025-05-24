import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { z } from "zod";
import { insertUserSchema, insertFarmSchema, insertFieldSchema, insertWaterQualitySchema, insertSoilMoistureSchema, insertWeatherPredictionSchema, insertIrrigationTipSchema } from "@shared/schema";
import passport from "passport";
import { setupAuth, isAuthenticated, hashPassword } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to handle errors
  const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => 
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
    const moisture = await storage.createSoilMoisture(moistureData);
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
      // If there's no farm data in the database yet, return mock data
      // In production, you'd typically require farmId as a parameter
      const farmId = 1;
      
      // Check if farm exists in the database
      const farm = await storage.getFarm(farmId);
      
      if (farm) {
        // If farm exists, get dashboard data from database
        const dashboardData = await storage.getFarmDashboardData(farmId);
        res.json(dashboardData);
      } else {
        // If farm does not exist, return mock data for demo purposes
        // In a real application, you should initialize the database with seed data
        const mockFarmData = {
          farmer: {
            id: 1,
            name: "Ramesh",
          },
          farm: {
            id: 1,
            name: "Green Valley Farm",
            status: "Your farm is thriving",
            location: "Karnataka"
          },
          waterQuality: [
            { name: "pH Level", value: "6.8", status: "Good", icon: "ph" },
            { name: "TDS", value: "320", unit: "ppm", status: "Good", icon: "tds" },
            { name: "Temp", value: "28°C", status: "Warm", icon: "temp" }
          ],
          soilMoisture: {
            level: 68,
            status: "Ideal Moisture Level",
            fields: [
              { id: 1, name: "Field 1", value: 68, status: "optimal" },
              { id: 2, name: "Field 2", value: 45, status: "warning" }
            ]
          },
          waterPrediction: {
            message: "Rain expected in 2 days",
            advice: "Delay irrigation to save water and energy.",
            forecast: [
              { day: "Today", temperature: "32°C", weather: "sunny" },
              { day: "Tomorrow", temperature: "30°C", weather: "partly-cloudy" },
              { day: "Thu", temperature: "27°C", weather: "rainy" }
            ]
          },
          irrigationTip: "Based on your soil type and current moisture levels, water your crops early morning (5-7 AM) to minimize evaporation and maximize absorption."
        };
        
        res.json(mockFarmData);
      }
    } catch (error) {
      console.error("Error fetching farm data:", error);
      res.status(500).json({ message: "Failed to fetch farm data" });
    }
  }));

  // Initialize database with seed data route (for development/demo purposes)
  app.post("/api/seed-database", asyncHandler(async (req, res) => {
    // Create user
    const user = await storage.createUser({
      username: "Ramesh",
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
      temperature: "28°C"
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
      forecast: [
        { day: "Today", temperature: "32°C", weather: "sunny" },
        { day: "Tomorrow", temperature: "30°C", weather: "partly-cloudy" },
        { day: "Thu", temperature: "27°C", weather: "rainy" }
      ]
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
