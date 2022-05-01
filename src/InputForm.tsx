import { useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface InputFormProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchById: boolean;
    setSearchById: React.Dispatch<React.SetStateAction<boolean>>;
}

function InputForm({query, setQuery, searchById, setSearchById} : InputFormProps): JSX.Element {

    const [userInput, setUserInput] = useState<string>("");

    const handleClick = () => {
        setSearchById(!searchById);
    }
    
    const handleSubmit = (e: FormElement) => {
        e.preventDefault(); // Avoid default behaviour of a form -> reload page
        if (userInput !== '' && userInput !== query) {
            setQuery(userInput.trim());
            setUserInput('');
            console.log(userInput);
        } else {
            alert("Please enter a valid movie title, id or try with a different one.");
        }
    }

    return(
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
    )
}

export default InputForm;