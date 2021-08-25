// API/TMDBApi.js

const API_TOKEN = '82bebbb6e892bfa0da42759ad8555c1a';

export function getFilmsFromApiWithSearchedText(text) {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_TOKEN +
    '&language=fr&query=' +
    text;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}
