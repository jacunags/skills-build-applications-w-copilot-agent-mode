import { startServer } from './server.js';

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exitCode = 1;
});