import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { validateEnv } from "./utils/validateEnv";
import apiRouter from './routes/api';
import { setupVite } from "./vite";

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', apiRouter);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    validateEnv();
    
    const server = app.listen(PORT, () => {
      console.log(`API Server running on http://localhost:${PORT}`);
    });

    if (process.env.NODE_ENV === 'development') {
      await setupVite(app, server);
    }

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
