import { useEffect, useState } from "react"

const apiKey: string = "9fdb091c"

export interface MovieById {
  Title: string
  Year: string
  Runtime: string
  Plot: string
  imdbRating: string
  Poster: string
}

export interface MovieByTitle {
  Title: string
  imdbID: string
  Type: string
  Poster: string
}

export function useMovies(query: string, searchById: boolean) {
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const getMovies = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://www.omdbapi.com/?" +
          (searchById ? "i=" : "s=") +
          query +
          "&apikey=" +
          apiKey
      )
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      if (data.Response === "False") {
        alert("Ooops! " + data.Error)
        return
      }
      if (data === undefined) {
        alert("Ooops! Please try again")
        return
      }
      console.log(data)
      setResult(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert(
        "Something went wrong while connecting to the API. Please check spelling"
      )
    }
  }

  useEffect(() => {
    if (query === "") return
    if (loading === false) {
      getMovies()
    }
  }, [query, loading])

  return { result, loading }
}
