import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'sibikaa',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-insecure-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    cookieName: process.env.COOKIE_NAME || 'qollamone_token',
  },
} as const;
