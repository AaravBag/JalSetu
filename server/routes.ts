import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { z } from "zod";
import { insertUserSchema, insertFarmSchema, insertFieldSchema, insertWaterQualitySchema, insertSoilMoistureSchema, insertWeatherPredictionSchema, insertIrrigationTipSchema } from "@shared/schema";
import passport from "passport";
import { setupAuth, isAuthenticated, hashPassword } from "./auth";
import { handleChatRequest } from "./chatbot";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
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

  // Authentication routes
  app.post("/api/register", asyncHandler(async (req, res) => {
    const userData = insertUserSchema.parse(req.body);
    
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(userData.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(userData.password);
    
    // Create user with hashed password
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword
    });
    
    // Don't return password in response
    const { password, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  }));
  
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: info.message || "Invalid credentials" });
      }
      
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        
        // Don't return password in response
        const { password, ...userWithoutPassword } = user;
        return res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });
  
  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/user", isAuthenticated, (req, res) => {
    // Don't return password in response
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });

  // Farm routes - protected with authentication
  app.post("/api/farms", isAuthenticated, asyncHandler(async (req, res) => {
    const farmData = insertFarmSchema.parse({
      ...req.body,
      userId: (req.user as any).id // Assign farm to current user
    });
    const farm = await storage.createFarm(farmData);
    res.status(201).json(farm);
  }));

  app.get("/api/farms/:id", isAuthenticated, asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.id);
    const farm = await storage.getFarm(farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    // Check if user owns this farm
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to view this farm" });
    }
    
    res.json(farm);
  }));

  app.patch("/api/farms/:id", isAuthenticated, asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.id);
    const farm = await storage.getFarm(farmId);
    
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    // Check if user owns this farm
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to update this farm" });
    }
    
    const farmData = insertFarmSchema.partial().parse(req.body);
    const updatedFarm = await storage.updateFarm(farmId, farmData);
    res.json(updatedFarm);
  }));
  
  // Get user's farms
  app.get("/api/my-farms", isAuthenticated, asyncHandler(async (req, res) => {
    const userId = (req.user as any).id;
    const farms = await storage.getFarmsByUserId(userId);
    res.json(farms);
  }));

  // Field routes - protected with authentication
  app.post("/api/fields", isAuthenticated, asyncHandler(async (req, res) => {
    const fieldData = insertFieldSchema.parse(req.body);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(fieldData.farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to add fields to this farm" });
    }
    
    const field = await storage.createField(fieldData);
    res.status(201).json(field);
  }));

  app.get("/api/farms/:farmId/fields", isAuthenticated, asyncHandler(async (req, res) => {
    const farmId = parseInt(req.params.farmId);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to view fields for this farm" });
    }
    
    const fields = await storage.getFieldsByFarmId(farmId);
    res.json(fields);
  }));

  // Water Quality routes - protected with authentication
  app.post("/api/water-qualities", isAuthenticated, asyncHandler(async (req, res) => {
    const qualityData = insertWaterQualitySchema.parse(req.body);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(qualityData.farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to add water quality data to this farm" });
    }
    
    const quality = await storage.createWaterQuality(qualityData);
    res.status(201).json(quality);
  }));

  // Soil Moisture routes - protected with authentication
  app.post("/api/soil-moistures", isAuthenticated, asyncHandler(async (req, res) => {
    const moistureData = insertSoilMoistureSchema.parse(req.body);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(moistureData.farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to add soil moisture data to this farm" });
    }
    
    const moisture = await storage.createSoilMoisture(moistureData);
    res.status(201).json(moisture);
  }));

  // Weather Prediction routes - protected with authentication
  app.post("/api/weather-predictions", isAuthenticated, asyncHandler(async (req, res) => {
    const predictionData = insertWeatherPredictionSchema.parse(req.body);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(predictionData.farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to add weather predictions to this farm" });
    }
    
    const prediction = await storage.createWeatherPrediction(predictionData);
    res.status(201).json(prediction);
  }));

  // Irrigation Tip routes - protected with authentication
  app.post("/api/irrigation-tips", isAuthenticated, asyncHandler(async (req, res) => {
    const tipData = insertIrrigationTipSchema.parse(req.body);
    
    // Verify the user owns the farm
    const farm = await storage.getFarm(tipData.farmId);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    
    if (farm.userId !== (req.user as any).id) {
      return res.status(403).json({ error: "You don't have permission to add irrigation tips to this farm" });
    }
    
    const tip = await storage.createIrrigationTip(tipData);
    res.status(201).json(tip);
  }));

  // Dashboard data routes - protected with authentication
  app.get("/api/farm-data/:farmId", isAuthenticated, asyncHandler(async (req, res) => {
    try {
      const farmId = parseInt(req.params.farmId);
      
      // Check if farm exists in the database
      const farm = await storage.getFarm(farmId);
      
      if (!farm) {
        return res.status(404).json({ error: "Farm not found" });
      }
      
      // Verify the user owns the farm
      if (farm.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "You don't have permission to view this farm's data" });
      }
      
      // Get dashboard data from database
      const dashboardData = await storage.getFarmDashboardData(farmId);
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching farm data:", error);
      res.status(500).json({ message: "Failed to fetch farm data" });
    }
  }));
  
  // For first-time users who don't have farms yet, return their user info
  app.get("/api/user-dashboard", isAuthenticated, asyncHandler(async (req, res) => {
    const userId = (req.user as any).id;
    const farms = await storage.getFarmsByUserId(userId);
    
    if (farms.length > 0) {
      // Redirect to the first farm's dashboard data
      const farmId = farms[0].id;
      const dashboardData = await storage.getFarmDashboardData(farmId);
      res.json(dashboardData);
    } else {
      // Return just the user info since they don't have farms yet
      res.json({
        farmer: {
          id: (req.user as any).id,
          name: (req.user as any).username,
        },
        needsSetup: true
      });
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

  // Chatbot API endpoint
  app.post("/api/chat", asyncHandler(async (req, res) => {
    await handleChatRequest(req, res);
  }));

  const httpServer = createServer(app);

  return httpServer;
}
