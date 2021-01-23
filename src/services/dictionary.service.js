import { get } from 'axios'

export async function translate(word) {
    const { data } = await get(`/api/translate?word=${ word }`)

    return data
}

export async function getDictionary(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const results = await response.json()

  const meanings = results.flatMap(result => result.meanings)
  const audio = results[0].phonetics[0].audio

  return {meanings, audio}
}