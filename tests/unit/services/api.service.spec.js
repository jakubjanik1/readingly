import { translate } from '@/services/api.service'
import nock from 'nock'

describe('Api Service', () => {
    const API_URL = process.env.VUE_APP_NOW_API_URL

    it('translate() should work', async () => {
        const response = {
            'humongous {adj.}': ['wielgachny', 'ogromniasty', 'olbrzymi', 'kolosalny', 'potężny']
        }
        const request = nock(API_URL).get('/translate/humongous').reply(200, response)

        const translations = await translate('humongous')

        expect(request.isDone()).toBe(true)
        expect(translations).toEqual(response)
    })
})