import { useEffect, useState } from 'react';
import { healthService } from './health.service.ts';
import { HealthData } from './health.types.ts';

export function useDashboard() {
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    let active = true;
    healthService.getHealth().then((data) => {
      if (active) setHealth(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return { health };
}
