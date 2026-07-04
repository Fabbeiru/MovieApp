export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
}

export interface OmdbErrorResponse {
  Response: "False";
  Error: string;
}

export interface SearchResultItem {
  Title: string;
  Type: string;
  imdbID: string;
  Poster: string;
}

export interface SearchApiResponse {
  Response: "True";
  Search: SearchResultItem[];
  totalResults: string;
}

export interface MovieApiResponse extends Movie {
  Response: "True";
}

export type SearchApiResult = SearchApiResponse | OmdbErrorResponse;
export type MovieApiResult = MovieApiResponse | OmdbErrorResponse;
