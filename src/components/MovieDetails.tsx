import { MovieById } from "../hooks/useMovies";

function MovieDetails(movieById: MovieById) : JSX.Element {
    return (
        <div className="movie">
            <img className="poster" src={movieById.Poster} alt={movieById.Title + " poster"} />
            <div className="movie-details">
                <h2>{movieById.Title}</h2>
                <p><span>Year:</span> {movieById.Year}</p>
                <p><span>Duration:</span> {movieById.Runtime}</p>
                <p><span>Rating:</span> {movieById.imdbRating}</p>
                <p><span>Plot:</span><br/>{movieById.Plot}</p>
            </div>
        </div>
    );
}

export default MovieDetails;