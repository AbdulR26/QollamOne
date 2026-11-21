import { HealthStatus } from './health.model.js';

export class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  checkHealth({ includeDetail = false } = {}) {
    const systemStatus = this.healthRepository.getSystemStatus();

    return new HealthStatus({
      status: 'ok',
      uptime: systemStatus.uptime,
      timestamp: systemStatus.timestamp,
      detail: includeDetail ? { memoryUsage: process.memoryUsage() } : undefined,
    });
  }
}
