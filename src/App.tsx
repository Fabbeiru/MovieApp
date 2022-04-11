import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';

const apiKey : string = "9fdb091c";

function App() {

  const [movies, setMovies] = useState();

  useEffect(() => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      setMovies(data);
    });

    /* const getMovies = async () => {
      const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey);
      const body = await response.json();
      setBody(body);
    }

    getMovies(); */
    
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>Movie app</h1>
          <img className='logo' src={ logo } alt="Fabbeiru's logo" />
        </header>

        <form className='input-form' >
            <input type="text" placeholder='Search a movie by title' autoFocus/>
            <button type="submit" className='input-button' title="Create task">Search</button>
        </form>

        <div className="result-wrapper">
          
        </div>
      </div>
    </div>
  );
}

export default App;
