import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_NOW_API_URL
})

export async function translate(word) {
    const { data } = await api.get(`translate/${ word }`)

    return data
}