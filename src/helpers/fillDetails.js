import qs from 'qs'

const urlParams = {
  api_key: process.env.API_KEY,
  language: 'en-US',
  page: '1',
  include_adult: 'false'
}
const baseUrl = 'https://api.themoviedb.org/3/'

function urlParamsString () {
  return qs.stringify(urlParams)
}

export function popularUrl () {
  return `${baseUrl}movie/popular?${urlParamsString()}`
}

export function upcomingUrl () {
  return `${baseUrl}movie/upcoming?${urlParamsString()}`
}

export function detailsUrl (url) {
  return `${baseUrl}movie/${url}?${urlParamsString()}`
}

export function collectionUrl (collectionId) {
  return `${baseUrl}collection/${collectionId}?${urlParamsString()}`
}

export function recommendationsUrl (url) {
  return `${baseUrl}movie/${url}/recommendations?${urlParamsString()}`
}

export function fullquery (query) {
  const updUrlParams = Object.assign({query}, urlParams)
  let updParamsString = qs.stringify(updUrlParams)
  return `${baseUrl}search/movie?${updParamsString}`
}

export function getDataFromAPI (url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      return data
      // TODO: move the stop spinning to the HomePage
    })
}
