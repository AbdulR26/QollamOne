export class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  checkHealth() {
    const systemStatus = this.healthRepository.getSystemStatus();
    return {
      status: 'ok',
      ...systemStatus,
    };
  }
}
