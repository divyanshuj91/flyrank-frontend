// useHomeViewModel — React state and actions for the Home screen

import { useState } from 'react'
import type { Movie } from '../../types/movie'
import { getMovies } from './HomeModel'

export const useHomeViewModel = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return { query, setQuery, movies, loading, error, handleSearch }
}
