export interface HealthStatusProps {
  status: string;
  uptime: number;
  timestamp: string;
  detail?: {
    memoryUsage: NodeJS.MemoryUsage;
  };
}

export class HealthStatus {
  public readonly status: string;
  public readonly uptime: number;
  public readonly timestamp: string;
  public readonly detail?: {
    memoryUsage: NodeJS.MemoryUsage;
  };

  constructor({ status, uptime, timestamp, detail }: HealthStatusProps) {
    this.status = status;
    this.uptime = uptime;
    this.timestamp = timestamp;
    if (detail !== undefined) {
      this.detail = detail;
    }
  }
}
