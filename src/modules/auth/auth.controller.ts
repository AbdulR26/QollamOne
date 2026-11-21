import { Request, Response } from 'express';
import { env } from '../../config/env.js';
import { AuthenticatedRequest } from '../../shared/middlewares/auth.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { AuthService } from './auth.service.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: env.nodeEnv === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
};

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    const { token, user } = await this.authService.login(email, password);

    res.cookie(env.jwt.cookieName, token, cookieOptions);
    res.status(200).json({
      success: true,
      data: { user },
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie(env.jwt.cookieName, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.nodeEnv === 'production',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });

  me = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await this.authService.getCurrentUser(req.user!.id);

    res.status(200).json({
      success: true,
      data: { user },
    });
  });
}
