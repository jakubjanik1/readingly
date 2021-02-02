const { get } = require('axios')
const { JSDOM } = require('jsdom')

export default async (req, res) => {
    let { word } = req.query   
    word = word.replace(/[^A-Za-z- ']/g, '')
    word = encodeURI(word)
    
    const { data } = await get(`https://www.vocabulary.com/dictionary/${ word }`)
    const dom = new JSDOM(data)

    const definitions = dom.window.document.querySelector('.word-definitions')
    
    if (!definitions) {
        return res.json({ audio: '', meanings: [] })
    }

    const audioPath = dom.window.document.querySelector('a.audio')?.dataset?.audio
    const audio = `https://audio.vocab.com/1.0/us/${audioPath}`

    const meanings = Array.from(definitions.querySelectorAll('ol > li')).map(el => {
        const partOfSpeech = el.querySelector('.pos-icon')?.textContent
        const definition = el.querySelector('.pos-icon')?.nextSibling.textContent.trim()
        const example = el.querySelector('.defContent > .example')?.textContent.replace(/\n/g, '')
        const synonyms = el.querySelector('.defContent > .instances > span:nth-child(2)')?.textContent

        return { partOfSpeech, definition, example, synonyms }
    })

    res.json({ audio, meanings })
}