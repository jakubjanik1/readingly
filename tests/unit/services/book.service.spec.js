import { createThumbnail } from '@/services/book.service'

describe('Book Service', () => {
    describe('createThumbnail', () => {
        it('throws an error when file is not specified', () => {
            expect(createThumbnail()).rejects.toThrowError('File is not specified')
        })  
    })
})