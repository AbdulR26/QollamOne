export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const text = await res.text();
  let json: ApiResponse<T> | null = null;

  try {
    json = text ? (JSON.parse(text) as ApiResponse<T>) : null;
  } catch {
    throw new Error('Server API tidak mengembalikan JSON yang valid. Pastikan backend berjalan.');
  }

  if (!res.ok) {
    throw new Error(
      json?.error || `Request gagal (HTTP ${res.status}). Pastikan backend berjalan di port 3000.`
    );
  }

  if (!json?.data) {
    throw new Error('Respons server tidak valid.');
  }

  return json.data;
}
