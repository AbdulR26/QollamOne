import { LoginFieldErrors, LoginPayload } from './auth.types.ts';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginInput(payload: LoginPayload): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  if (!payload.email.trim()) {
    errors.email = 'Email wajib diisi';
  } else if (!EMAIL_REGEX.test(payload.email.trim())) {
    errors.email = 'Format email tidak valid';
  }

  if (!payload.password) {
    errors.password = 'Password wajib diisi';
  } else if (payload.password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }

  return errors;
}
