export interface AuthUser {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  roles: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginFieldErrors {
  email?: string;
  password?: string;
}
