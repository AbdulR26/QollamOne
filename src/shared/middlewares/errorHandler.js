import { env } from '../../config/env.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  if (env.nodeEnv !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
