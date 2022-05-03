interface Movie {
  title: string;
  year: string;
  rating: string;
  plot: string;
  poster: string;
}

function Movie(movie: Movie) {

    return (
        <div className="movie">
            <img className="poster" src={movie.poster} alt={movie.title + " poster"} />
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p><span>Year:</span> {movie.year}</p>
                <p><span>Rating:</span> {movie.rating}</p>
                <p><span>Plot:</span><br/>{movie.plot}</p>
            </div>
        </div>
    );
}

export default Movie;