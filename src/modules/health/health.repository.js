export class HealthRepository {
  getSystemStatus() {
    return {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
