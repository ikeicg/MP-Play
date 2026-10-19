# MP-Play

A browser music player built with React. Browse 22 tracks, play them with a persistent player bar, and keep a list of favourites.

**Live demo: https://ikeicg.github.io/MP-Play/**

## Features

- Home page with a rotating genre banner and a grid of tracks to pick from
- Player bar with play/pause, previous/next and a clickable progress bar showing elapsed time
- Playback modes: repeat all, repeat one and shuffle
- Favourites page. Favourites are saved in the browser (`localStorage`), so they are still there on your next visit

## Built with

React 18, React Router 6 and Create React App. State is shared through React context. Playback uses the browser's `<audio>` element.

## Run it locally

```bash
npm install
npm start        # http://localhost:3000/MP-Play
```

`npm run deploy` builds the app and publishes it to GitHub Pages (`gh-pages` branch).
