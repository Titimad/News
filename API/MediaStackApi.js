//MediaStackApi.js
const API_TOKEN = 'e0f8beaa1835d16c22cd2c1e3cfbc066';

export function getMediaFromApiWithSearchedText() {
  //const url = 'https://reactnative.dev/movies.json';
  const url = 'http://api.mediastack.com/v1/news?access_key=' + API_TOKEN;
  console.log("L'URL appelé est: " + url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
  console.log('Fin de MediaStackApi');
}
