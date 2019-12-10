import { post } from 'axios'

export async function createThumbnail(file) {
    if (! file) {
        throw new Error('File is not specified')
    } else if (file.includes('pdf')) {
        const { data } = await post(`${ process.env.VUE_APP_FIREBASE_API_URL }/createThumbnail`, { file })

        return data
    }
}   