import Loading from './Loading';
import Movies from './Movies';
import { useMovies } from './useMovies';

interface ResultsProps {
    query: string;
    searchById: boolean;
}

function Results({query, searchById} : ResultsProps) : JSX.Element {

    const {result, loading} = useMovies(query, searchById);

    return (
        <div className="results-wrapper">
            {loading && <Loading />}
            {result && <Movies result={result} searchById={searchById}/>}
        </div>
    );
}

export default Results;