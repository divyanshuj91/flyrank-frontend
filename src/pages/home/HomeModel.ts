// HomeModel — business logic for the Home screen

import type { Movie } from '../../types/movie'
import { searchMovies } from '../../services/OmdbMovieService'

export const getMovies = async (query: string): Promise<Movie[]> => {
  const trimmed = query.trim()

  if (trimmed.length < 2) {
    throw new Error('Search query must be at least 2 characters long.')
  }

  return searchMovies(trimmed)
}
