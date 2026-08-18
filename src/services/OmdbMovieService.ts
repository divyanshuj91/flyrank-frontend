import type { Movie, OmdbSearchResponse } from '../types/movie'

const API_BASE = 'https://www.omdbapi.com'

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  if (!apiKey) {
    throw new Error('OMDB API key is not configured. Add VITE_OMDB_API_KEY to your .env file.')
  }

  const url = `${API_BASE}/?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(query)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Network error: failed to fetch movies (status ${response.status})`)
  }

  const data: OmdbSearchResponse = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'No results found for your search.')
  }

  return data.Search ?? []
}
