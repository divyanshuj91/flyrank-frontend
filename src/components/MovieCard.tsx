import type { Movie } from '../types/movie'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <article className="movie-card">
      <div className="movie-card-poster-wrapper">
        {hasPoster ? (
          <img
            className="movie-card-poster"
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="movie-card-no-poster">No Poster</div>
        )}
      </div>

      <div className="movie-card-body">
        <h3 className="movie-card-title">{movie.Title}</h3>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.Year}</span>
          <span className="movie-card-type">{movie.Type}</span>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
