// HomeView — UI component for the Home screen

import type { FormEvent } from 'react'
import { useHomeViewModel } from './useHomeViewModel'
import MovieCard from '../../components/MovieCard'
import './HomeView.css'

const HomeView = () => {
  const { query, setQuery, movies, loading, error, handleSearch } = useHomeViewModel()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div className="home-view">
      <form className="home-search-form" onSubmit={onSubmit}>
        <label htmlFor="home-search-input" className="sr-only">
          Search movies
        </label>
        <input
          id="home-search-input"
          type="text"
          className="home-search-input"
          placeholder="Search for movies, series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movies"
        />
        <button
          id="home-search-button"
          type="submit"
          className="home-search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="home-loading">
          <div className="home-loading-spinner" />
          <p>Searching movies...</p>
        </div>
      )}

      {error && <div className="home-error" role="alert">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="home-movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="home-empty">
          <div className="home-empty-icon">🎬</div>
          <p className="home-empty-text">Search for your favorite movies above</p>
        </div>
      )}
    </div>
  )
}

export default HomeView
