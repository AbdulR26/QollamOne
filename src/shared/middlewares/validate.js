import { AppError } from '../errors/AppError.js';

export const validate = (validator) => (req, res, next) => {
  const errors = validator(req);
  if (errors && errors.length > 0) {
    return next(new AppError(errors.join(', '), 400));
  }
  next();
};
