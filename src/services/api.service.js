import axios from 'axios'

const api = axios.create({
    baseURL: 'https://functions.jakubjanik.now.sh/'
})

export async function translate(word) {
    const { data } = await api.get(`translate/${ word }`)

    return data
}