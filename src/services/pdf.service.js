import { post } from 'axios'

export async function createThumbnail(file) {
    try {
        const { data } = await post(`${ process.env.VUE_APP_FIREBASE_API_URL }/createThumbnail`, { file })

        return data
    } catch (err) {
        throw new Error(err.response.data)
    }
}   