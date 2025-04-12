import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for farm data
  app.get("/api/farm-data", (req, res) => {
    try {
      // Mock farm data
      const farmData = {
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

      res.json(farmData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch farm data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
