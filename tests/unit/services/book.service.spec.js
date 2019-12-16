import { createThumbnail } from '@/services/book.service'
import nock from 'nock'

describe('Pdf Service', () => {
    let request

    beforeEach(() => {
        request = nock(process.env.VUE_APP_FIREBASE_API_URL)
            .post('/createThumbnail')
    })

    describe('createThumbnail', () => {
        it('returns a url of created thumbnail of pdf', async () => {
            request = request.reply(200, 'path/to/thumbnail')

            const thumbnailUrl = await createThumbnail('path/to/file.pdf')

            expect(thumbnailUrl).toEqual('path/to/thumbnail')
            expect(request.isDone()).toBe(true)
        })

        it('throws an error when file is not specified', () => {
            expect(createThumbnail()).rejects.toThrowError('File is not specified')
        })  
    })
})