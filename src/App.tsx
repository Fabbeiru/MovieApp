import React, { useState } from 'react';
import logo from './blackLogo.png';
import SearchForm from './components/SearchForm';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NoResults from './components/NoResults';
import Pagination from './components/Pagination';
import RecentSearches from './components/RecentSearches';
import { SearchApiResult, MovieApiResult } from './types';
import { MIN_TITLE_LENGTH, OMDB_API_KEY, EXAMPLE_SEARCHES } from './constants';
import useOmdbFetch from './hooks/useOmdbFetch';

type FormElement = React.FormEvent<HTMLFormElement>;
type View = 'results' | 'detail';

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
  const [page, setPage] = useState<number>(1);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const searchUrl = query
    ? "https://www.omdbapi.com/?s=" + encodeURIComponent(query) + "&page=" + page + "&apikey=" + OMDB_API_KEY
    : null;
  const { data: searchData, loading, error: searchFetchError } = useOmdbFetch<SearchApiResult>(searchUrl);

  const detailUrl = selectedId
    ? "https://www.omdbapi.com/?i=" + encodeURIComponent(selectedId) + "&plot=full&apikey=" + OMDB_API_KEY
    : null;
  const { data: movieData, loading: loadingDetail, error: detailFetchError } = useOmdbFetch<MovieApiResult>(detailUrl);

  const hasSearchResults = searchData?.Response === "True";
  const noSearchResults = searchData?.Response === "False";
  const movie = movieData?.Response === "True" ? movieData : undefined;
  const noMovieResult = movieData?.Response === "False";

  const resultsError = formError || searchFetchError;

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
    setFormError(null);
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
      setFormError("Please enter a valid movie title, id or try with a different one.");
      return;
    }
    setFormError(null);
    if (searchById) {
      setView('detail');
      setHasSearched(true);
      setSelectedId(userInput.trim());
    } else {
      searchByTitle(userInput.trim());
    }
  }

  const handleSelectMovie = (imdbID: string) => {
    setFormError(null);
    setView('detail');
    setHasSearched(true);
    setSelectedId(imdbID);
  }

  const handleReset = () => {
    setQuery("");
    setUserInput("");
    setSearchById(false);
    setSelectedId(null);
    setView('results');
    setPage(1);
    setHasSearched(false);
    setFormError(null);
  }

  return (
    <div className="App">
      <div className="header-wrapper">
        <header>
          <button className="logo-button" onClick={handleReset} aria-label="Back to start">
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

            {recentSearches.length > 0 ? (
              <RecentSearches searches={recentSearches} onSelect={searchByTitle} />
            ) : (
              <RecentSearches searches={EXAMPLE_SEARCHES} onSelect={searchByTitle} label="Try:" />
            )}
          </>
        )}

        {view === 'results' && (
          <>
            {resultsError && <ErrorMessage message={resultsError} />}

            <div className="results-wrapper">
              {loading && <Loader count={8} />}
              {hasSearchResults && searchData.Search.map((movieRes) => (
                <MovieCard key={movieRes.imdbID} movie={movieRes} onSelect={handleSelectMovie} />
              ))}
            </div>

            {!loading && noSearchResults && <NoResults message={'No results for "' + query + '"'} />}

            {hasSearchResults && Number(searchData.totalResults) > 10 && (
              <Pagination
                page={page}
                totalResults={Number(searchData.totalResults)}
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

            {detailFetchError && <ErrorMessage message={detailFetchError} />}

            <div className="results-wrapper">
              {loadingDetail && <Loader variant="detail" />}
              {movie && <MovieDetail movie={movie} />}
            </div>

            {!loadingDetail && noMovieResult && <NoResults message={'No movie found for id "' + selectedId + '"'} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
