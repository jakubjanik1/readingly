import { translate } from '@/services/api.service'
import nock from 'nock'

describe('Api Service', () => {
    const API_URL = 'https://functions.jakubjanik.now.sh/'
    
    it('translate() should work', async () => {
        const response = {
            'humongous {adj.}': ['wielgachny', 'ogromniasty', 'olbrzymi', 'kolosalny', 'potężny']
        }
        const request = nock(API_URL)
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
            .get('/translate/humongous')
            .reply(200, response)

        const translations = await translate('humongous')

        expect(request.isDone()).toBe(true)
        expect(translations).toEqual(response)
    })
})