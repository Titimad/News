//MediaStackApi.js
const API_TOKEN = 'rGtAyl5Q85lUNKxsE0ZNN7rfQSEXZADx';
export function getMediaFromApiWithSearchedText(filter) {
  const url =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:' +
    filter +
    '&api-key=' +
    API_TOKEN;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}
