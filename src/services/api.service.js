import { get } from 'axios'

export async function translate(word) {
    const { data } = await get(`/api/translate?word=${ word }`)

    return data
}