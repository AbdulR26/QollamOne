import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../config/database.js';
import { UserRow } from './auth.model.js';

interface UserQueryRow extends UserRow, RowDataPacket {}

interface RoleQueryRow extends RowDataPacket {
  name: string;
}

export class AuthRepository {
  async findByEmail(email: string): Promise<UserRow | null> {
    const [rows] = await pool.query<UserQueryRow[]>(
      'SELECT id, name, email, password, photo FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] ?? null;
  }

  async findById(id: number): Promise<UserRow | null> {
    const [rows] = await pool.query<UserQueryRow[]>(
      'SELECT id, name, email, password, photo FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] ?? null;
  }

  async getUserRoles(userId: number): Promise<string[]> {
    const [rows] = await pool.query<RoleQueryRow[]>(
      `SELECT r.name
       FROM roles r
       INNER JOIN model_has_roles mhr ON mhr.role_id = r.id
       WHERE mhr.model_id = ? AND mhr.model_type = 'App\\\\Models\\\\User'`,
      [userId]
    );
    return rows.map((row) => row.name);
  }
}
