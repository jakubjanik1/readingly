import { createThumbnail } from '@/services/pdf.service'
import nock from 'nock'

describe('Pdf Service', () => {
    let request

    beforeEach(() => {
        request = nock('https://us-central1-readingly-ab5f7.cloudfunctions.net')
            .post('/createThumbnail')
    })

    describe('createThumbnail', () => {
        it('returns a url of created thumbnail', async () => {
            request = request.reply(200, 'path/to/thumbnail')

            const thumbnailUrl = await createThumbnail('path/to/pdf/file')

            expect(thumbnailUrl).toEqual('path/to/thumbnail')
            expect(request.isDone()).toBe(true)
        })

        it('throws an error when file is not specified', async () => {
            request.reply(400, 'File is not specified')

            await expect(createThumbnail()).rejects.toThrowError('File is not specified')
        })  
    })
})