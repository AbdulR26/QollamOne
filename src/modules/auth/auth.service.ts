import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../../shared/errors/AppError.js';
import { AuthUser, LoginResult, toAuthUser } from './auth.model.js';
import { AuthRepository } from './auth.repository.js';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const normalizedEmail = email.trim().toLowerCase();
    const userRow = await this.authRepository.findByEmail(normalizedEmail);

    if (!userRow) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, userRow.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const roles = await this.authRepository.getUserRoles(userRow.id);
    const user = toAuthUser(userRow, roles);

    const signOptions: SignOptions = {
      expiresIn: env.jwt.expiresIn as SignOptions['expiresIn'],
    };

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
      env.jwt.secret,
      signOptions
    );

    return { token, user };
  }

  async getCurrentUser(userId: number): Promise<AuthUser> {
    const userRow = await this.authRepository.findById(userId);
    if (!userRow) {
      throw new AppError('User not found', 404);
    }

    const roles = await this.authRepository.getUserRoles(userRow.id);
    return toAuthUser(userRow, roles);
  }
}
