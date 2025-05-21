import { config } from 'dotenv';
import { z } from 'zod';

export function validateEnv() {
  config(); // Load environment variables

  const envSchema = z.object({
    GEMINI_API_KEY: z.string().min(1),
    WEATHER_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    PORT: z.string().optional().default("3000"),
    NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
  });

  try {
    const env = envSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join(".")).join(", ");
      throw new Error(`Missing required environment variables: ${missingVars}`);
    }
    throw error;
  }
} 