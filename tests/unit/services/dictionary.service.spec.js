import { translate } from '@/services/dictionary.service'
import nock from 'nock'

describe('Dictionary Service', () => {  
    it('translate() should work', async () => {
        nock.disableNetConnect()
        nock.enableNetConnect('localhost')

        const response = {
            'humongous {adj.}': ['wielgachny', 'ogromniasty', 'olbrzymi', 'kolosalny', 'potężny']
        }
        const request = nock('http://localhost/api')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
            .get('/translate?word=humongous')
            .reply(200, response)

        const translations = await translate('humongous')

        expect(request.isDone()).toBe(true)
        expect(translations).toEqual(response)
    })
})