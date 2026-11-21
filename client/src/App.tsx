import { useEffect, useState } from 'react';

interface HealthData {
  status: string;
  database: 'connected' | 'disconnected';
  uptime: number;
  timestamp: string;
}

interface HealthResponse {
  success: boolean;
  data: HealthData;
}

export function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: HealthResponse = await res.json();
        setHealth(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to API');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <main style={{ maxWidth: 640, margin: '64px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: 8 }}>QollamOne Admin</h1>
      <p style={{ color: '#475569', marginBottom: 24 }}>
        React + Express.js (Modular Monolith + Layered Architecture)
      </p>

      <section
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>System Status</h2>
        {loading && <p>Checking API &amp; database...</p>}
        {error && <p style={{ color: '#dc2626' }}>Error: {error}</p>}
        {health && (
          <dl style={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 8 }}>
            <dt style={{ color: '#64748b' }}>API Status</dt>
            <dd style={{ fontWeight: 600 }}>{health.status}</dd>
            <dt style={{ color: '#64748b' }}>Database (sibikaa)</dt>
            <dd
              style={{
                fontWeight: 600,
                color: health.database === 'connected' ? '#16a34a' : '#dc2626',
              }}
            >
              {health.database}
            </dd>
            <dt style={{ color: '#64748b' }}>Uptime</dt>
            <dd>{health.uptime.toFixed(1)}s</dd>
          </dl>
        )}
      </section>
    </main>
  );
}

export default App;
