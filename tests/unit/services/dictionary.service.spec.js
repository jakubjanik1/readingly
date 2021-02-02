import { translate, getDictionary } from '@/services/dictionary.service'
import nock from 'nock'
import 'isomorphic-fetch'

nock.disableNetConnect()
nock.enableNetConnect('localhost')

describe('Dictionary Service', () => {  
    it('translate() should work', async () => {   
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

    it('getDictionary() should work', async () => {
        const response = {
            audio: 'https://www.collinsdictionary.com/sounds/hwd_sounds/humongous.mp3',
            meanings: [{
                partOfSpeech: 'adjective',
                definition: 'If you describe something or someone as humongous, you are emphasizing that they are very large or important.',
                example: ' We had a humongous row just because she left.',
                synonyms: ''
            }]
        }

        const request = nock('http://localhost/api')
            .get('/dictionary?word=humongous')
            .reply(200, response)
          
        const {audio, meanings} = await getDictionary('humongous')
          
        expect(request.isDone()).toBe(true)
        expect(audio).toBe('https://www.collinsdictionary.com/sounds/hwd_sounds/humongous.mp3')
        expect(meanings).toEqual([{
            partOfSpeech: 'adjective',
            definition: 'If you describe something or someone as humongous, you are emphasizing that they are very large or important.',
            example: ' We had a humongous row just because she left.',
            synonyms: ''
        }])
  })
})