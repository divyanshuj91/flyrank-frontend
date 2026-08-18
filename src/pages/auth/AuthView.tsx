// AuthView — Login / Register form using react-hook-form + zod

import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

const authSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

type AuthFormData = z.infer<typeof authSchema>

const AuthView = () => {
  const { isLogin, toggleMode, loading, error, handleSubmit: submitAuth } = useAuthViewModel()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: AuthFormData) => {
    submitAuth(data)
  }

  return (
    <div className="auth-view">
      <div className="auth-card">
        <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create account'}</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to access your favorites' : 'Sign up to start saving favorites'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: 'Email is required.',
                validate: (value) => {
                  const result = authSchema.shape.email.safeParse(value)
                  return result.success || result.error.issues[0].message
                },
              })}
            />
            {errors.email && (
              <span className="auth-field-error">{errors.email.message}</span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="auth-input"
              placeholder="••••••••"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: 'Password is required.',
                minLength: { value: 6, message: 'Password must be at least 6 characters.' },
              })}
            />
            {errors.password && (
              <span className="auth-field-error">{errors.password.message}</span>
            )}
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button
            id="auth-submit"
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" className="auth-toggle-button" onClick={toggleMode}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthView
