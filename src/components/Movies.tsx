function Movies(data: any, searchById: boolean) : JSX.Element {
    return(
        <>
        {!searchById && data.Search.map((movieRes: any) => (
            <div className="results movie">
            <img className="poster" src={movieRes.Poster} alt={movieRes.Title + " poster"} />
              <div className="movie-details">
                <h2>{movieRes.Title}</h2>
                <p><span>Type:</span> {movieRes.Type}</p>
                <p><span>imdbID:</span> {movieRes.imdbID}</p>
              </div>
            </div>
          ))}
          {searchById && <div className="movie">
            <img className="poster" src={data?.poster} alt={data?.title + " poster"} />
            <div className="movie-details">
                <h2>{data?.title}</h2>
                <p><span>Year:</span> {data?.year}</p>
                <p><span>Rating:</span> {data?.rating}</p>
                <p><span>Plot:</span><br/>{data?.plot}</p>
            </div>
          </div>}
        </>
    );
}

export default Movies;