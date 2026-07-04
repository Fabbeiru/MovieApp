import { KeyboardEvent } from 'react';
import { SearchResultItem } from '../types';

interface MovieCardProps {
  movie: SearchResultItem;
  onSelect: (imdbID: string) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(movie.imdbID);
    }
  }

  return (
    <div
      className="results movie clickable"
      role="button"
      tabIndex={0}
      aria-label={"View details for " + movie.Title}
      onClick={() => onSelect(movie.imdbID)}
      onKeyDown={handleKeyDown}
    >
      <img className="poster" src={movie.Poster} alt={movie.Title + " poster"} />
      <div className="movie-data">
        <h2>{movie.Title}</h2>
        <div className="movie-details">
          <p><span>Type:</span> {movie.Type}</p>
          <p><span>imdbID:</span> {movie.imdbID}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
