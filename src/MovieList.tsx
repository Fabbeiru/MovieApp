import { MovieByTitle } from "./useMovies";

function MovieList(data: any) : JSX.Element {
    return (
        data.Search.map((movieRes: MovieByTitle, i: number) => (
            <div className="results movie" key={i}>
              <img className="poster" src={movieRes.Poster} alt={movieRes.Title + " poster"} />
                <div className="movie-details">
                  <h2>{movieRes.Title}</h2>
                  <p><span>Type:</span> {movieRes.Type}</p>
                  <p><span>imdbID:</span> {movieRes.imdbID}</p>
                </div>
            </div>
        ))
    );
}

export default MovieList;