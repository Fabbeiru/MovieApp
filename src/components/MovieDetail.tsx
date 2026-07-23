import { Movie } from '../types';
import Poster from './Poster';

interface MovieDetailProps {
  movie: Movie;
}

const RATING_BADGE_CLASS: Record<string, string> = {
  "Rotten Tomatoes": "badge-rt",
  "Metacritic": "badge-metacritic",
};

function MovieDetail({ movie }: MovieDetailProps) {
  const genres = movie.Genre.split(', ').filter(Boolean);
  const otherRatings = movie.Ratings.filter((rating) => rating.Source !== "Internet Movie Database");

  return (
    <div className="movie detail">
      <Poster key={movie.imdbID} src={movie.Poster} alt={movie.Title + " poster"} />

      <div className="movie-data">
        <h2>{movie.Title}</h2>
        <p className="meta-line">{movie.Year} · {movie.Rated} · {movie.Runtime}</p>

        {genres.length > 0 && (
          <div className="genre-pills">
            {genres.map((genre) => <span className="pill" key={genre}>{genre}</span>)}
          </div>
        )}

        <div className="rating-badges">
          <span className="badge badge-imdb">IMDb {movie.imdbRating}/10</span>
          {otherRatings.map((rating) => (
            <span className={"badge " + (RATING_BADGE_CLASS[rating.Source] || "")} key={rating.Source}>
              {rating.Source}: {rating.Value}
            </span>
          ))}
        </div>

        <p className="plot"><span>Plot:</span><br />{movie.Plot}</p>

        <p><span>Director:</span> {movie.Director}</p>
        <p><span>Writer:</span> {movie.Writer}</p>
        <p><span>Actors:</span> {movie.Actors}</p>
        <p><span>Language:</span> {movie.Language}</p>
        <p><span>Country:</span> {movie.Country}</p>
        <p><span>Awards:</span> {movie.Awards}</p>
        <p><span>Box office:</span> {movie.BoxOffice}</p>
        <p><span>imdbVotes:</span> {movie.imdbVotes}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
