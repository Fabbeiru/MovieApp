import { useState } from 'react';
import Header from './Header';
import InputForm from './InputForm';
import Results from './Results';

function App() {

  const [query, setQuery] = useState<string>("");
  const [searchById, setSearchById] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />

      <div className="wrapper">
        <InputForm query={query} setQuery={setQuery} searchById={searchById} setSearchById={setSearchById}/>

        <Results query={query} searchById={searchById}/>

      </div>
    </div>
  );
}

export default App;
