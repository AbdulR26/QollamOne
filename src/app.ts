import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import healthRoutes from './modules/health/health.routes.js';
import { notFoundHandler } from './shared/middlewares/notFoundHandler.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api', notFoundHandler);

const clientDistPath = path.resolve(process.cwd(), 'client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      success: true,
      name: 'QollamOne API',
      status: 'running',
    });
  });
  app.use(notFoundHandler);
}

app.use(errorHandler);

export default app;
