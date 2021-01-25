import { Book } from 'epubjs'
import { uploadFile } from '@/firebase/storage'
import reduce from 'image-blob-reduce'

const reduceImage = reduce()

export async function createThumbnail(file) {
    if (! file) {
        throw new Error('File is not specified')
    }
    
    const name = /o\/(.*)\?/.exec(file)[1].replace('.epub', '')
    const book = new Book(file, { openAs: 'epub' })
    await book.loaded.metadata
    
    if (book.cover) {
        const thumbnail = await book.archive.getBlob(book.cover)
        const reducedThumbnail = await reduceImage.toBlob(thumbnail, {max: 300})

        return uploadFile(reducedThumbnail, { name, ext: 'jpg' })
    }
}