import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';
import Movie from './Movie';

type FormElement = React.FormEvent<HTMLFormElement>;

const apiKey : string = "9fdb091c";

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [searchById, setSearchById] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const handleClick = () => {
    setSearchById(!searchById);
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); // Avoid default behaviour of a form -> reload page
    if (userInput !== '' && userInput !== query) {
      setQuery(userInput);
      setUserInput('');
      console.log(userInput);
    } else {
      alert("Please enter a valid movie title, id or try with a different one.");
    }
  }

  const getMovies = async () => {
    var response: Response;
    try {
      /* if (searchById) {
        response = await fetch("http://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey);
      } else {
        response = await fetch("http://www.omdbapi.com/?s=" + query + "&apikey=" + apiKey);
      } */
      response = await fetch("https://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey);
      const data = await response.json();
      setData(data);
      setApiResponse(data.Response);
      if (data.Response === "False") {
        alert("Ooops! " + data.Error);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while connecting to the API");
    }
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
          {apiResponse && <Movie title={data.Title} year={data.Year} rating={data.Ratings[1].Value} plot={data.Plot} poster={data.Poster}></Movie>}
        </div>
      </div>
    </div>
  );
}

export default App;
