import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';

type FormElement = React.FormEvent<HTMLFormElement>;

const apiKey : string = "9fdb091c";

export interface Movie {
  Title: string,
  Year: string,
  Plot: string,
  Poster: string
}

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [searchById, setSearchById] = useState<boolean>(false);
  const [apiResponseById, setApiResponseById] = useState<boolean>(false);
  const [apiResponseByTitle, setApiResponseByTitle] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setSearchById(!searchById);
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); // Avoid default behaviour of a form -> reload page
    if (userInput !== '' && userInput !== query) {
      setQuery(userInput.trim());
      setUserInput('');
      console.log(userInput);
    } else {
      alert("Please enter a valid movie title, id or try with a different one.");
    }
  }

  const getMovies = async () => {
    setApiResponseById(false);
    setApiResponseByTitle(false);
    setLoading(true);
    var response: Response;
    var data: any;
    try {
      if (searchById) {
        response = await fetch("https://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey);
        data = await response.json();
        setData(data);
        setApiResponseById(data.Response);
        setMovie(data)
      } else {
        response = await fetch("https://www.omdbapi.com/?s=" + query + "&apikey=" + apiKey);
        data = await response.json();
        setData(data);
        setApiResponseByTitle(data.Response);
      }
      if (data.Response === "False") {
        alert("Ooops! " + data.Error);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while connecting to the API");
    }
    setLoading(false);
  }

  useEffect(() => {

    !firstTime ? getMovies() : setFirstTime(false);

  }, [query]);

  return (
    <div className="App">
      <div className="header-wrapper">
        <header>
          <h1>Movie app</h1>
          <img className='logo' src={ logo } alt="Fabbeiru's logo" />
        </header>
      </div>

      <div className="wrapper">
        <div className="input-form-wrapper">
          <div className="search-by-wrapper">
            <h3>Title Id</h3>
            <span>
              <button className={ "" + (searchById ? "search-by-button flip-button" : "search-by-button") } onClick={handleClick}>↖&#xFE0E;</button>
            </span>
          </div>

          <div className="card-wrapper">
              <div className={ "" + (searchById ? "card flip-card" : "card") }>
                  <div className="card-content card-front">
                    <h2>Search by title</h2>
                    <form className='input-form' onSubmit={handleSubmit}>
                      <input type="text" placeholder='Search a movie by title' autoFocus
                        value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                      <button type="submit" className='input-button' title="Search by title">Search</button>
                    </form>
                  </div>
                  <div className="card-content card-back">
                    <h2>Search by id</h2>
                    <form className='input-form' onSubmit={handleSubmit}>
                      <input type="text" placeholder='Search a movie by imdbID (e.g. tt0121766)' 
                        value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                      <button type="submit" className='input-button' title="Search by id">Search</button>
                    </form>
                  </div>
              </div>
          </div>
        </div>

        <div className="results-wrapper">
          {loading && 
          <div className="movie loading">
            <div className="poster"></div>
            <div className="movie-details">
              <h2> </h2>
              <p></p>
            </div>
          </div>}
          {apiResponseByTitle && data.Search.map((movieRes: any, i: number) => (
            <div className="results movie" key={i}>
            <img className="poster" src={movieRes.Poster} alt={movieRes.Title + " poster"} />
              <div className="movie-details">
                <h2>{movieRes.Title}</h2>
                <p><span>Type:</span> {movieRes.Type}</p>
                <p><span>imdbID:</span> {movieRes.imdbID}</p>
              </div>
            </div>
          ))}
          {apiResponseById && <div className="movie">
            <img className="poster" src={movie?.Poster} alt={movie?.Title + " poster"} />
            <div className="movie-details">
                <h2>{movie?.Title}</h2>
                <p><span>Year:</span> {movie?.Year}</p>
                <p><span>Rating:</span> </p>
                <p><span>Plot:</span><br/>{movie?.Plot}</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
