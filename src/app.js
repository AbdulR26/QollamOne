import express from 'express';
import cors from 'cors';
import healthRoutes from './modules/health/health.routes.js';
import { notFoundHandler } from './shared/middlewares/notFoundHandler.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'QollamOne API',
    status: 'running',
  });
});

app.use('/api/health', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
