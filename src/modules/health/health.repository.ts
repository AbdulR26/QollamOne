export interface SystemStatus {
  uptime: number;
  timestamp: string;
}

export class HealthRepository {
  getSystemStatus(): SystemStatus {
    return {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
