import React from 'react';
import { MIN_TITLE_LENGTH } from '../constants';

type FormElement = React.FormEvent<HTMLFormElement>;

const TITLE_PLACEHOLDER = "Search a movie by title";
const ID_PLACEHOLDER = "Search a movie by imdbID (e.g. tt0121766)";

interface SearchFormProps {
  searchById: boolean;
  userInput: string;
  onInputChange: (value: string) => void;
  onToggleSearchType: () => void;
  onSubmit: (e: FormElement) => void;
  compact?: boolean;
}

function SearchForm({ searchById, userInput, onInputChange, onToggleSearchType, onSubmit, compact }: SearchFormProps) {
  const isTitleTooShort = !searchById && userInput.length > 0 && userInput.trim().length < MIN_TITLE_LENGTH;

  if (compact) {
    return (
      <form className="navbar-search" onSubmit={onSubmit}>
        <div className="search-type-toggle" role="group" aria-label="Search type">
          <button type="button" className={!searchById ? "active" : ""} onClick={() => searchById && onToggleSearchType()}>Title</button>
          <button type="button" className={searchById ? "active" : ""} onClick={() => !searchById && onToggleSearchType()}>Id</button>
        </div>
        <label className="sr-only" htmlFor="navbar-search-input">
          {searchById ? ID_PLACEHOLDER : TITLE_PLACEHOLDER}
        </label>
        <input
          id="navbar-search-input"
          type="text"
          placeholder={searchById ? ID_PLACEHOLDER : TITLE_PLACEHOLDER}
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button type="submit">Search</button>
        {isTitleTooShort && <p className="field-hint">Type at least {MIN_TITLE_LENGTH} characters.</p>}
      </form>
    );
  }

  return (
    <div className="input-form-wrapper">
      <div className="search-by-wrapper">
        <h3>Title Id</h3>
        <span>
          <button
            className={"" + (searchById ? "search-by-button flip-button" : "search-by-button")}
            onClick={onToggleSearchType}
            aria-label={searchById ? "Switch to search by title" : "Switch to search by id"}
          >↖&#xFE0E;</button>
        </span>
      </div>

      <div className="card-wrapper">
        <div className={"" + (searchById ? "card flip-card" : "card")}>
          <div className="card-content card-front">
            <h2>Search by title</h2>
            <form className='input-form' onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="search-by-title">{TITLE_PLACEHOLDER}</label>
              <input id="search-by-title" type="text" placeholder={TITLE_PLACEHOLDER} autoFocus
                value={userInput} onChange={(e) => onInputChange(e.target.value)} />
              {isTitleTooShort && <p className="field-hint">Type at least {MIN_TITLE_LENGTH} characters.</p>}
              <button type="submit" className='input-button' title="Search by title">Search</button>
            </form>
          </div>
          <div className="card-content card-back">
            <h2>Search by id</h2>
            <form className='input-form' onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="search-by-id">{ID_PLACEHOLDER}</label>
              <input id="search-by-id" type="text" placeholder={ID_PLACEHOLDER}
                value={userInput} onChange={(e) => onInputChange(e.target.value)} />
              <button type="submit" className='input-button' title="Search by id">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
