# Movie app

Project to practise fetching data from API and displaying it. Search a movie by its title or imdbID and get some information about it. Check it out [here](https://fabbeiru.github.io/MovieApp/).

<p align="center"><img src="/MovieApp.png" alt="Movie App"></img></p>

## Setup

This project uses the free [OMDb API](https://www.omdbapi.com/apikey.aspx). Get your own API key and create a `.env` file in the project root:

```
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

Deployment to GitHub Pages runs automatically on push to `master` via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)), which reads the key from the `OMDB_API_KEY` repository secret.

> **Note:** as a static site, the API key ends up embedded in the built JS bundle and is technically visible to anyone. That's an accepted trade-off for a practice project; a real deployment would put a small serverless proxy in front of OMDb to keep the key server-side.

## Features

- Search movies by title (paginated) or look one up directly by imdbID.
- Movie detail view with full plot, genres, ratings (IMDb, Rotten Tomatoes, Metacritic) and cast/crew info.
- Recent searches saved to `localStorage`; example searches are suggested instead when there's no history yet.
- Clearable search inputs (× button) instead of having to select-all or backspace through the text.
- Loading skeletons, a friendly "no results" state, and error handling separate from empty-result handling.
- Poster fallback for movies with a missing or broken poster image.
- Data fetching is centralized in a small generic `useOmdbFetch<T>` hook (`src/hooks/useOmdbFetch.ts`) that handles request cancellation (`AbortController`), loading and error state for both the search and detail views.

## Improvements

- Filter search results by type (movie / series / episode) and year, using OMDb's `type` and `y` query params.
- Hide the API key behind a serverless proxy instead of shipping it in the client bundle.
- Automated tests (component + fetch mocking) for the search and detail flows.
- Denser multi-column results grid on small mobile screens.

## Technologies

- React.js
- TypeScript
- Custom hooks
- HTML + CSS
- Responsive design
- Mobile first approach
