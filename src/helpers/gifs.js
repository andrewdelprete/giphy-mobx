export const terms = [
  'ace ventura',
  'chris farley',
  'crying jordan',
  'dwight',
  'gasp',
  'fail',
  'michael scott',
  'jean claude',
  'arnold',
  'futurama'
]
export function fetchGifs (text) {
  return fetch(`https://api.giphy.com/v1/gifs/search?q=${ text }&api_key=dc6zaTOxFJmzC`)
    .then(response => response.json())
}

export function randomItemFromArray(array) {
  return array[Math.floor(Math.random()*array.length)]
}

export async function getRandomGif (array = terms) {
  const response = await fetchGifs(randomItemFromArray(array))
  return randomItemFromArray(response.data)
}
