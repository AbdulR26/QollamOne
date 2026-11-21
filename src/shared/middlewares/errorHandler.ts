import { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';
import { AppError } from '../errors/AppError.js';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError && err.isOperational ? err.message : 'Internal Server Error';

  if (env.nodeEnv !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
