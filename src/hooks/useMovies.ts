import { useEffect, useState } from "react";

const apiKey : string = "9fdb091c";

export interface MovieById {
    Title: string,
    Year: string,
    Runtime: string,
    Plot: string,
    imdbRating: string,
    Poster: string
}
  
export interface MovieByTitle {
    Title: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export function useMovies(query: string, searchById: boolean) {

    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        if (query === "")  return;

        setLoading(true);
        const getMovies = async() => {
            try {
                const response = await fetch("https://www.omdbapi.com/?" + (searchById ? "i=" : "s=") + query + "&apikey=" + apiKey);
                if (!response.ok) {
                    throw new Error();
                }
                const data = await response.json();
                if (data.Response === "False") {
                    alert("Ooops! " + data.Error);
                    return;
                }
                if (data === undefined) {
                    alert("Ooops! Please try again");
                    return;
                }
                console.log(data)
                setResult(data);
                console.log(result);

            } catch (error) {
                console.log(error);
                alert("Something went wrong while connecting to the API. Please check spelling");
            }
        }

        getMovies();
        setLoading(false);

    }, [query])

    return {result, loading};
}