import React from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface SearchFormProps {
  searchById: boolean;
  userInput: string;
  onInputChange: (value: string) => void;
  onToggleSearchType: () => void;
  onSubmit: (e: FormElement) => void;
}

function SearchForm({ searchById, userInput, onInputChange, onToggleSearchType, onSubmit }: SearchFormProps) {
  return (
    <div className="input-form-wrapper">
      <div className="search-by-wrapper">
        <h3>Title Id</h3>
        <span>
          <button className={"" + (searchById ? "search-by-button flip-button" : "search-by-button")} onClick={onToggleSearchType}>↖&#xFE0E;</button>
        </span>
      </div>

      <div className="card-wrapper">
        <div className={"" + (searchById ? "card flip-card" : "card")}>
          <div className="card-content card-front">
            <h2>Search by title</h2>
            <form className='input-form' onSubmit={onSubmit}>
              <input type="text" placeholder='Search a movie by title' autoFocus
                value={userInput} onChange={(e) => onInputChange(e.target.value)} />
              <button type="submit" className='input-button' title="Search by title">Search</button>
            </form>
          </div>
          <div className="card-content card-back">
            <h2>Search by id</h2>
            <form className='input-form' onSubmit={onSubmit}>
              <input type="text" placeholder='Search a movie by imdbID (e.g. tt0121766)'
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
