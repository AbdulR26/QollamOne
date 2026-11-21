import { Request } from 'express';

export const validateHealthQuery = (req: Request): string[] => {
  const errors: string[] = [];
  const { detail } = req.query;

  if (detail !== undefined && detail !== 'true' && detail !== 'false') {
    errors.push('Query parameter "detail" must be "true" or "false"');
  }

  return errors;
};
