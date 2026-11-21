import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export type ValidatorFn = (req: Request) => string[];

export const validate = (validator: ValidatorFn) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors = validator(req);
    if (errors.length > 0) {
      return next(new AppError(errors.join(', '), 400));
    }
    next();
  };
};
