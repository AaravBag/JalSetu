import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Farm schema
export const farms = pgTable("farms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").default("Your farm is thriving"),
});

export const insertFarmSchema = createInsertSchema(farms).pick({
  name: true,
  location: true,
  userId: true,
  status: true,
});

// Water Quality schema
export const waterQualities = pgTable("water_qualities", {
  id: serial("id").primaryKey(),
  farmId: integer("farm_id").notNull(),
  phLevel: text("ph_level").notNull(),
  tds: text("tds").notNull(),
  temperature: text("temperature").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertWaterQualitySchema = createInsertSchema(waterQualities).pick({
  farmId: true,
  phLevel: true,
  tds: true,
  temperature: true,
  timestamp: true,
});

// Soil Moisture schema
export const soilMoistures = pgTable("soil_moistures", {
  id: serial("id").primaryKey(),
  farmId: integer("farm_id").notNull(),
  fieldId: integer("field_id").notNull(),
  moistureLevel: integer("moisture_level").notNull(),
  status: text("status").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertSoilMoistureSchema = createInsertSchema(soilMoistures).pick({
  farmId: true,
  fieldId: true,
  moistureLevel: true,
  status: true,
  timestamp: true,
});

// Weather Prediction schema
export const weatherPredictions = pgTable("weather_predictions", {
  id: serial("id").primaryKey(),
  farmId: integer("farm_id").notNull(),
  message: text("message").notNull(),
  advice: text("advice").notNull(),
  forecast: jsonb("forecast").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertWeatherPredictionSchema = createInsertSchema(weatherPredictions).pick({
  farmId: true,
  message: true,
  advice: true,
  forecast: true,
  timestamp: true,
});

// Irrigation Tips schema
export const irrigationTips = pgTable("irrigation_tips", {
  id: serial("id").primaryKey(),
  farmId: integer("farm_id").notNull(),
  tip: text("tip").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertIrrigationTipSchema = createInsertSchema(irrigationTips).pick({
  farmId: true,
  tip: true,
  timestamp: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFarm = z.infer<typeof insertFarmSchema>;
export type Farm = typeof farms.$inferSelect;

export type InsertWaterQuality = z.infer<typeof insertWaterQualitySchema>;
export type WaterQuality = typeof waterQualities.$inferSelect;

export type InsertSoilMoisture = z.infer<typeof insertSoilMoistureSchema>;
export type SoilMoisture = typeof soilMoistures.$inferSelect;

export type InsertWeatherPrediction = z.infer<typeof insertWeatherPredictionSchema>;
export type WeatherPrediction = typeof weatherPredictions.$inferSelect;

export type InsertIrrigationTip = z.infer<typeof insertIrrigationTipSchema>;
export type IrrigationTip = typeof irrigationTips.$inferSelect;
