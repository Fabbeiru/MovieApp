import { SearchResultItem } from '../types';

interface MovieCardProps {
  movie: SearchResultItem;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="results movie">
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
