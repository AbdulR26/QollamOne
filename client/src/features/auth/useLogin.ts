import { FormEvent, useState } from 'react';
import { authService } from './auth.service.ts';
import { AuthUser, LoginFieldErrors } from './auth.types.ts';
import { validateLoginInput } from './auth.validation.ts';

export function useLogin(onSuccess: (user: AuthUser) => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errors = validateLoginInput({ email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const user = await authService.login({ email, password });
      onSuccess(user);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login gagal');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    fieldErrors,
    serverError,
    submitting,
    handleSubmit,
  };
}
