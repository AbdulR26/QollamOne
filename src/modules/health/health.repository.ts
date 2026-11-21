import { checkDatabaseConnection } from '../../config/database.js';

export interface SystemStatus {
  databaseConnected: boolean;
  uptime: number;
  timestamp: string;
}

export class HealthRepository {
  async getSystemStatus(): Promise<SystemStatus> {
    const databaseConnected = await checkDatabaseConnection();

    return {
      databaseConnected,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
