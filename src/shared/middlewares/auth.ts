import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../errors/AppError.js';

export interface AuthUserPayload {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}

interface TokenClaims {
  sub: number | string;
  email: string;
  name: string;
  roles: string[];
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const cookieToken = req.cookies?.[env.jwt.cookieName] as string | undefined;
  const authHeader = req.headers.authorization;
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  const token = cookieToken || bearerToken;
  if (!token) {
    return next(new AppError('Unauthorized', 401));
  }

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as TokenClaims;
    req.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      name: decoded.name,
      roles: Array.isArray(decoded.roles) ? decoded.roles : [],
    };
    next();
  } catch {
    next(new AppError('Invalid or expired session', 401));
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return next(new AppError('Forbidden', 403));
    }

    next();
  };
};
