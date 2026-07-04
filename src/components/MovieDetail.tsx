import { Movie } from '../types';

interface MovieDetailProps {
  movie: Movie;
}

function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="movie">
      <img className="poster" src={movie.Poster} alt={movie.Title + " poster"} />
      <div className="movie-data">
        <h2>{movie.Title}</h2>
        <p><span>Year:</span> {movie.Year}</p>
        <p><span>Rating:</span> {movie.imdbRating}</p>
        <p><span>Runtime:</span> {movie.Runtime}</p>
        <p><span>Plot:</span><br />{movie.Plot}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
