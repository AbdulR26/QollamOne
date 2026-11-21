export interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string | null;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  roles: string[];
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export const toAuthUser = (row: UserRow, roles: string[]): AuthUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  photo: row.photo,
  roles,
});
