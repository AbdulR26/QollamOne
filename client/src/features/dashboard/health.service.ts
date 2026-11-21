import { apiRequest } from '../../shared/api/httpClient.ts';
import { HealthData } from './health.types.ts';

export const healthService = {
  async getHealth(): Promise<HealthData | null> {
    try {
      return await apiRequest<HealthData>('/api/health');
    } catch {
      return null;
    }
  },
};
