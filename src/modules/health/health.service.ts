import { HealthStatus } from './health.model.js';
import { HealthRepository } from './health.repository.js';

export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async checkHealth({
    includeDetail = false,
  }: { includeDetail?: boolean } = {}): Promise<HealthStatus> {
    const systemStatus = await this.healthRepository.getSystemStatus();

    return new HealthStatus({
      status: systemStatus.databaseConnected ? 'ok' : 'degraded',
      database: systemStatus.databaseConnected ? 'connected' : 'disconnected',
      uptime: systemStatus.uptime,
      timestamp: systemStatus.timestamp,
      detail: includeDetail ? { memoryUsage: process.memoryUsage() } : undefined,
    });
  }
}
