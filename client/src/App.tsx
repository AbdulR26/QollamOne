import { FormEvent, useEffect, useState } from 'react';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  roles: string[];
}

interface HealthData {
  status: string;
  database: 'connected' | 'disconnected';
  uptime: number;
}

export function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          setUser(json.data.user);
        }
      } catch {
        // Not authenticated
      } finally {
        setCheckingAuth(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch('/api/health', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) setHealth(json.data);
      })
      .catch(() => {});
  }, [user]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let json: { data?: { user?: AuthUser }; error?: string } | null = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        throw new Error('Server API tidak mengembalikan JSON yang valid. Pastikan backend berjalan.');
      }

      if (!res.ok) {
        throw new Error(
          json?.error || `Login gagal (HTTP ${res.status}). Pastikan backend berjalan di port 3000.`
        );
      }

      if (!json?.data?.user) {
        throw new Error('Respons server tidak valid.');
      }

      setUser(json.data.user);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    setHealth(null);
  };

  if (checkingAuth) {
    return (
      <main style={{ maxWidth: 420, margin: '80px auto', padding: '0 20px' }}>
        <p style={{ color: '#475569' }}>Memeriksa sesi login...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ maxWidth: 420, margin: '80px auto', padding: '0 20px' }}>
        <section
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: 28,
          }}
        >
          <h1 style={{ fontSize: '1.5rem', marginBottom: 6 }}>QollamOne Admin</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>
            Masuk menggunakan akun database sibikaa
          </p>

          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: '0.875rem',
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label
                htmlFor="email"
                style={{ display: 'block', fontSize: '0.875rem', marginBottom: 6 }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{ display: 'block', fontSize: '0.875rem', marginBottom: 6 }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 4,
                padding: '10px 16px',
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 640, margin: '64px auto', padding: '0 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>QollamOne Admin</h1>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>
            Selamat datang, <strong>{user.name}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 14px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Keluar
        </button>
      </div>

      <section
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: '1.05rem', marginBottom: 12 }}>Profil Akun</h2>
        <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 8 }}>
          <dt style={{ color: '#64748b' }}>Email</dt>
          <dd>{user.email}</dd>
          <dt style={{ color: '#64748b' }}>Roles</dt>
          <dd>{user.roles.length > 0 ? user.roles.join(', ') : '-'}</dd>
        </dl>
      </section>

      {health && (
        <section
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h2 style={{ fontSize: '1.05rem', marginBottom: 12 }}>System Status</h2>
          <dl style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 8 }}>
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
          </dl>
        </section>
      )}
    </main>
  );
}

export default App;
