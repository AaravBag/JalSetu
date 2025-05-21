import { Server } from 'http';
import { Express } from 'express';
import apiRouter from './api';

export async function registerRoutes(app: Express): Promise<Server> {
  // Register API routes
  app.use('/api', apiRouter);

  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      resolve(server);
    });
  });
} 