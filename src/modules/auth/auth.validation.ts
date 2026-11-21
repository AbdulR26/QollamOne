import { Request } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (req: Request): string[] => {
  const errors: string[] = [];
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('Valid email is required');
  }

  if (typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required');
  }

  return errors;
};
