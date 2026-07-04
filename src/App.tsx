import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';
import SearchForm from './components/SearchForm';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import { Movie, SearchApiResult, MovieApiResult } from './types';

type FormElement = React.FormEvent<HTMLFormElement>;

const apiKey: string = process.env.REACT_APP_OMDB_API_KEY || "";

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [searchById, setSearchById] = useState<boolean>(false);
  const [apiResponseById, setApiResponseById] = useState<boolean>(false);
  const [apiResponseByTitle, setApiResponseByTitle] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [data, setData] = useState<SearchApiResult>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const handleToggleSearchType = () => {
    setSearchById(!searchById);
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); // Avoid default behaviour of a form -> reload page
    if (userInput !== '' && userInput !== query) {
      setErrorMessage(null);
      setPage(1);
      setQuery(userInput.trim());
      setUserInput('');
    } else {
      setErrorMessage("Please enter a valid movie title, id or try with a different one.");
    }
  }

  const getMovies = async (signal: AbortSignal) => {
    setApiResponseById(false);
    setApiResponseByTitle(false);
    setErrorMessage(null);
    if (!apiKey) {
      setErrorMessage("Missing OMDB API key. Set REACT_APP_OMDB_API_KEY in your .env file.");
      return;
    }
    setLoading(true);
    try {
      if (searchById) {
        const response = await fetch("https://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey, { signal });
        const result: MovieApiResult = await response.json();
        setApiResponseById(result.Response === "True");
        if (result.Response === "True") {
          setMovie(result);
        } else {
          setErrorMessage("Ooops! " + result.Error);
        }
      } else {
        const response = await fetch("https://www.omdbapi.com/?s=" + query + "&page=" + page + "&apikey=" + apiKey, { signal });
        const result: SearchApiResult = await response.json();
        setData(result);
        setApiResponseByTitle(result.Response === "True");
        if (result.Response === "False") {
          setErrorMessage("Ooops! " + result.Error);
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      console.log(error);
      setErrorMessage("Something went wrong while connecting to the API");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    const controller = new AbortController();
    getMovies(controller.signal);
    return () => controller.abort();

  }, [query, page]);

  return (
    <div className="App">
      <div className="header-wrapper">
        <header>
          <h1>Movie app</h1>
          <img className='logo' src={logo} alt="Fabbeiru's logo" />
        </header>
      </div>

      <div className="wrapper">
        <SearchForm
          searchById={searchById}
          userInput={userInput}
          onInputChange={setUserInput}
          onToggleSearchType={handleToggleSearchType}
          onSubmit={handleSubmit}
        />

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div className="results-wrapper">
          {loading && <Loader />}
          {apiResponseByTitle && data?.Response === "True" && data.Search.map((movieRes) => (
            <MovieCard key={movieRes.imdbID} movie={movieRes} />
          ))}
        </div>

        {apiResponseByTitle && data?.Response === "True" && Number(data.totalResults) > 10 && (
          <Pagination
            page={page}
            totalResults={Number(data.totalResults)}
            onPrevious={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        )}

        <div className="results-wrapper">
          {apiResponseById && movie && <MovieDetail movie={movie} />}
        </div>
      </div>
    </div>
  );
}

export default App;
