import React from 'react';
import logo from './blackLogo.png';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>Movie app</h1>
          <img className='logo' src={ logo } alt="Fabbeiru's logo" />
        </header>

        <form className='input-form' >
            <input type="text" placeholder='Search a movie by title' autoFocus
              />
            <button type="submit" className='input-button' title="Create task">Search</button>
        </form>

        <div className="result-wrapper">
          
        </div>
      </div>
    </div>
  );
}

export default App;
