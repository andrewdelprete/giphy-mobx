// @flow
export const defaultTerms: Array<string> = [
  'ace ventura',
  'arnold',
  'chris farley',
  'crying jordan',
  'dwight',
  'fail',
  'futurama',
  'gasp',
  'jean claude',
  'michael scott'
]

export function fetchGifs (text: string): Promise<any> {
  return fetch(`https://api.giphy.com/v1/gifs/search?q=${ text }&api_key=dc6zaTOxFJmzC`)
}

export function randomItemFromArray(items: Array<string>) {
  return items[Math.floor(Math.random()*items.length)]
}

export async function getRandomGif (terms: Array<string> = defaultTerms) {
  const response = await fetchGifs(randomItemFromArray(terms))
  const json = await response.json()
  return randomItemFromArray(json.data)
}
