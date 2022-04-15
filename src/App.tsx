import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';

type FormElement = React.FormEvent<HTMLFormElement>;

const apiKey : string = "9fdb091c";

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [prueba, setPrueba] = useState<boolean>(false);

  const handleClick = () => {
    setPrueba(!prueba);
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); // Avoid default behaviour of a form -> reload page
    if (userInput !== '' && userInput !== query) {
      setQuery(userInput);
      setUserInput('');
      console.log(userInput);
    } else {
      alert("Please enter a valid movie title or a different one.");
    }
  }

  useEffect(() => {
    const getMovies = async () => {
      var response: Response;
      if (!prueba) {
        response = await fetch("http://www.omdbapi.com/?s=" + query + "&apikey=" + apiKey);
      } else {
        response = await fetch("http://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey);
      }
      const data = await response.json();
      console.log(data);
    }

    getMovies();
    
  }, [query]);

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>Movie app</h1>
          <img className='logo' src={ logo } alt="Fabbeiru's logo" />
        </header>

        <div className="input-form-wrapper">
          <div className="search-by-wrapper">
            <h3>Title Id</h3>
            <span>
              <button className={ "" + (prueba ? "search-by-button flip-button" : "search-by-button") } onClick={handleClick}>↖&#xFE0E;</button>
            </span>
          </div>

          <div className="card-wrapper">
              <div className={ "" + (prueba ? "card flip-card" : "card") }>
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
                      <input type="text" placeholder='Search a movie by Id (e.g. tt0121766)' 
                        value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                      <button type="submit" className='input-button' title="Search by id">Search</button>
                    </form>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
