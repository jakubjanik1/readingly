import { translate, getDictionary } from '@/services/dictionary.service'
import nock from 'nock'
import 'isomorphic-fetch'

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

    it('getDictionary() should work', async () => {
      const response = [{
          word: 'humongous',
          phonetics: [{
            text: '/hjuˈməŋɡəs/',
            audio: 'https://lex-audio.useremarkable.com/mp3/humongous_us_1.mp3'
          }],
          meanings: [{
              partOfSpeech: 'adjective',
              definitions: [{
                  definition: 'Huge; enormous.',
                  synonyms: ['large', 'sizeable']
              }]
          }]
      }]

      const request = nock('https://api.dictionaryapi.dev')
          .get('/api/v2/entries/en/humongous')
          .reply(200, response)
          
      const {audio, meanings} = await getDictionary('humongous')
          
      expect(request.isDone()).toBe(true)
      expect(audio).toBe('https://lex-audio.useremarkable.com/mp3/humongous_us_1.mp3')
      expect(meanings).toEqual([{
        partOfSpeech: 'adjective',
        definitions: [{
            definition: 'Huge; enormous.',
            synonyms: ['large', 'sizeable']
        }]
    }])
  })
})