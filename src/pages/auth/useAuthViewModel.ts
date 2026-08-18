// useAuthViewModel — React state and actions for Authentication

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from './AuthModel'

export const useAuthViewModel = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleMode = () => {
    setIsLogin((prev) => !prev)
    setError(null)
  }

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        await login(data.email, data.password)
      } else {
        await register(data.email, data.password)
      }
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    toggleMode,
    loading,
    error,
    handleSubmit,
  }
}
