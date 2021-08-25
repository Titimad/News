//MediaStackApi.js
//const API_TOKEN = 'e0f8beaa1835d16c22cd2c1e3cfbc066';
const API_TOKEN = 'f15deb24d26ba2a3856724d8698f87b8';
export function getMediaFromApiWithSearchedText() {
  //const url = 'https://reactnative.dev/movies.json';
  const url =
    'http://api.mediastack.com/v1/news?access_key=' +
    API_TOKEN +
    '&languages=en&sources=cnn';
  console.log("L'URL appelé est: " + url);
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
  console.log('Fin de MediaStackApi');
}
