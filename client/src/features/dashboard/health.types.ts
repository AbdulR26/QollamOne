export interface HealthData {
  status: string;
  database: 'connected' | 'disconnected';
  uptime: number;
}
