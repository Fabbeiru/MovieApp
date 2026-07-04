export interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  imdbRating: string;
  Runtime: string;
  Poster: string;
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
