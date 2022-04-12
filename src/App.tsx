import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';

type FormElement = React.FormEvent<HTMLFormElement>;

const apiKey : string = "9fdb091c";

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

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
      const response = await fetch("http://www.omdbapi.com/?s=" + query + "&apikey=" + apiKey);
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

        <form className='input-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search a movie by title' autoFocus
              value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
            <button type="submit" className='input-button' title="Create task">Search</button>
        </form>

        <div className="result-wrapper">
          
        </div>
      </div>
    </div>
  );
}

export default App;
