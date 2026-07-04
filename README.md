# Movie app

Project to practise fetching data from API and displaying it. Search a movie by its title or imdbID and get some information about it. Check it out [here](https://fabbeiru.github.io/MovieApp/).

<p align="center"><img src="/MovieApp.png" alt="Movie App"></img></p>

## Setup

This project uses the free [OMDb API](https://www.omdbapi.com/apikey.aspx). Get your own API key and create a `.env` file in the project root (see `.env.example`):

```
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

Deployment to GitHub Pages runs automatically on push to `master` via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)), which reads the key from the `OMDB_API_KEY` repository secret.

## Improvements

- Conditional render depending on the rating of the movie.

## Technologies

- React.js
- TypeScript
- HTML + CSS
- Responsive design
- Mobile first approach
