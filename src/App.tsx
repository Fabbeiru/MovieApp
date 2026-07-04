import React, { useEffect, useState } from 'react';
import logo from './blackLogo.png';
import SearchForm from './components/SearchForm';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import RecentSearches from './components/RecentSearches';
import { Movie, SearchApiResult, MovieApiResult } from './types';
import { MIN_TITLE_LENGTH } from './constants';

type FormElement = React.FormEvent<HTMLFormElement>;
type View = 'results' | 'detail';

const apiKey: string = process.env.REACT_APP_OMDB_API_KEY || "";
const RECENT_SEARCHES_KEY = "movieapp_recent_searches";
const MAX_RECENT_SEARCHES = 5;

function loadRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {

  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [searchById, setSearchById] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>('results');
  const [apiResponseById, setApiResponseById] = useState<boolean>(false);
  const [apiResponseByTitle, setApiResponseByTitle] = useState<boolean>(false);
  const [data, setData] = useState<SearchApiResult>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleToggleSearchType = () => {
    setSearchById(!searchById);
  }

  const addRecentSearch = (title: string) => {
    setRecentSearches((prev) => {
      const next = [title, ...prev.filter((t) => t.toLowerCase() !== title.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors (e.g. private browsing)
      }
      return next;
    });
  }

  const searchByTitle = (title: string) => {
    if (title.length < MIN_TITLE_LENGTH) {
      return;
    }
    setErrorMessage(null);
    setSearchById(false);
    setUserInput(title);
    setView('results');
    setHasSearched(true);
    setPage(1);
    setQuery(title);
    addRecentSearch(title);
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); // Avoid default behaviour of a form -> reload page
    if (userInput === '') {
      setErrorMessage("Please enter a valid movie title, id or try with a different one.");
      return;
    }
    setErrorMessage(null);
    if (searchById) {
      setView('detail');
      setHasSearched(true);
      setSelectedId(userInput.trim());
    } else {
      searchByTitle(userInput.trim());
    }
  }

  const handleSelectMovie = (imdbID: string) => {
    setErrorMessage(null);
    setView('detail');
    setHasSearched(true);
    setSelectedId(imdbID);
  }

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    (async () => {
      setApiResponseByTitle(false);
      setErrorMessage(null);
      if (!apiKey) {
        setErrorMessage("Missing OMDB API key. Set REACT_APP_OMDB_API_KEY in your .env file.");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("https://www.omdbapi.com/?s=" + query + "&page=" + page + "&apikey=" + apiKey, { signal: controller.signal });
        const result: SearchApiResult = await response.json();
        setData(result);
        setApiResponseByTitle(result.Response === "True");
        if (result.Response === "False") {
          setErrorMessage("Ooops! " + result.Error);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.log(error);
        setErrorMessage("Something went wrong while connecting to the API");
      }
      setLoading(false);
    })();

    return () => controller.abort();
  }, [query, page]);

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController();
    (async () => {
      setApiResponseById(false);
      setErrorMessage(null);
      if (!apiKey) {
        setErrorMessage("Missing OMDB API key. Set REACT_APP_OMDB_API_KEY in your .env file.");
        return;
      }
      setLoadingDetail(true);
      try {
        const response = await fetch("https://www.omdbapi.com/?i=" + selectedId + "&apikey=" + apiKey, { signal: controller.signal });
        const result: MovieApiResult = await response.json();
        setApiResponseById(result.Response === "True");
        if (result.Response === "True") {
          setMovie(result);
        } else {
          setErrorMessage("Ooops! " + result.Error);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.log(error);
        setErrorMessage("Something went wrong while connecting to the API");
      }
      setLoadingDetail(false);
    })();

    return () => controller.abort();
  }, [selectedId]);

  const hasSearchResults = apiResponseByTitle && data?.Response === "True";

  return (
    <div className="App">
      <div className="header-wrapper">
        <header>
          <button className="logo-button" onClick={() => window.location.reload()} aria-label="Reload Movie app">
            <img className='logo' src={logo} alt="Movie app logo" />
          </button>

          {hasSearched && (
            <SearchForm
              searchById={searchById}
              userInput={userInput}
              onInputChange={setUserInput}
              onToggleSearchType={handleToggleSearchType}
              onSubmit={handleSubmit}
              compact
            />
          )}
        </header>
      </div>

      <div className="wrapper">
        {!hasSearched && (
          <>
            <SearchForm
              searchById={searchById}
              userInput={userInput}
              onInputChange={setUserInput}
              onToggleSearchType={handleToggleSearchType}
              onSubmit={handleSubmit}
            />

            {recentSearches.length > 0 && (
              <RecentSearches searches={recentSearches} onSelect={searchByTitle} />
            )}
          </>
        )}

        {view === 'results' && (
          <>
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <div className="results-wrapper">
              {loading && <Loader count={8} />}
              {hasSearchResults && data.Search.map((movieRes) => (
                <MovieCard key={movieRes.imdbID} movie={movieRes} onSelect={handleSelectMovie} />
              ))}
            </div>

            {hasSearchResults && Number(data.totalResults) > 10 && (
              <Pagination
                page={page}
                totalResults={Number(data.totalResults)}
                onPrevious={() => setPage(page - 1)}
                onNext={() => setPage(page + 1)}
              />
            )}
          </>
        )}

        {view === 'detail' && (
          <>
            {hasSearchResults && (
              <button className="back-button" onClick={() => setView('results')}>← Back to results</button>
            )}

            {errorMessage && <ErrorMessage message={errorMessage} />}

            <div className="results-wrapper">
              {loadingDetail && <Loader variant="detail" />}
              {apiResponseById && movie && <MovieDetail movie={movie} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
