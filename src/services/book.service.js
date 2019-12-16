import { post } from 'axios'
import { Book } from 'epubjs'
import { uploadFile } from '@/firebase/storage'

export async function createThumbnail(file) {
    if (! file) {
        throw new Error('File is not specified')
    } else if (file.includes('pdf')) {
        const { data } = await post(`${ process.env.VUE_APP_FIREBASE_API_URL }/createThumbnail`, { file })

        return data
    } else if (file.includes('epub')) {
        const name = /o\/(.*)\?/.exec(file)[1].replace('.epub', '')
        const book = new Book(file, { openAs: 'epub' })
        await book.loaded.metadata
        
        if (book.cover) {
            const thumbnail = await book.archive.getBlob(book.cover)

            return uploadFile(thumbnail, { name, ext: 'jpg' })
        }
    }
}