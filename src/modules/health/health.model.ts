export interface HealthStatusProps {
  status: string;
  database: 'connected' | 'disconnected';
  uptime: number;
  timestamp: string;
  detail?: {
    memoryUsage: NodeJS.MemoryUsage;
  };
}

export class HealthStatus {
  public readonly status: string;
  public readonly database: 'connected' | 'disconnected';
  public readonly uptime: number;
  public readonly timestamp: string;
  public readonly detail?: {
    memoryUsage: NodeJS.MemoryUsage;
  };

  constructor({ status, database, uptime, timestamp, detail }: HealthStatusProps) {
    this.status = status;
    this.database = database;
    this.uptime = uptime;
    this.timestamp = timestamp;
    if (detail !== undefined) {
      this.detail = detail;
    }
  }
}
