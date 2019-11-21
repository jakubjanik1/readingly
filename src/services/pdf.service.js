import axios from 'axios'

export async function createThumbnail(file) {
    try {
        const response = await axios.post('https://us-central1-readingly-ab5f7.cloudfunctions.net/createThumbnail', { file })

        return response.data
    } catch (err) {
        throw new Error(err.response.data)
    }
}   