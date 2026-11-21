import { HealthStatus } from './health.model.js';
import { HealthRepository } from './health.repository.js';

export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  checkHealth({ includeDetail = false }: { includeDetail?: boolean } = {}): HealthStatus {
    const systemStatus = this.healthRepository.getSystemStatus();

    return new HealthStatus({
      status: 'ok',
      uptime: systemStatus.uptime,
      timestamp: systemStatus.timestamp,
      detail: includeDetail ? { memoryUsage: process.memoryUsage() } : undefined,
    });
  }
}
