export class HealthStatus {
  constructor({ status, uptime, timestamp, detail }) {
    this.status = status;
    this.uptime = uptime;
    this.timestamp = timestamp;
    if (detail !== undefined) {
      this.detail = detail;
    }
  }
}
