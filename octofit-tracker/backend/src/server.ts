import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import apiRoutes from './routes/api.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });
  app.use(apiRoutes);
  app.use((_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });
  app.use(((error, _request, response, _next) => {
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
      response.status(400).json({ error: error.message });
      return;
    }
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
      response.status(409).json({ error: 'A record with that unique value already exists' });
      return;
    }

    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  }) satisfies ErrorRequestHandler);

  return app;
}

export async function startServer(): Promise<void> {
  await connectDatabase();
  createApp().listen(port, () => {
    console.log(`OctoFit API listening on port ${port} at ${apiBaseUrl}`);
  });
}
