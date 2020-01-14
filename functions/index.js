const express = require('express')
const { get } = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true }))

app.get('/translate/:word', async (req, res) => {
    let { word } = req.params
    word = word.replace(/[^A-Za-z-']/g, '')
    word = encodeURI(word)
    
    const { data } = await get(`https://en.bab.la/dictionary/english-polish/${ word }`)
    const $ = cheerio.load(data)

    const results = $('.content').first().find('.quick-result-entry')

    let response = {}
    results.map((i, el) => {
        const word = $(el).find('.babQuickResult').text()
        const suffix = $(el).find('.suffix').text()
        let translations = $(el).find('.pl ~ .sense-group-results > li > a')
        
        translations = translations.map((i, el) => $(el).text()).get()
        
        if (translations.length) {
            response = { ...response, [`${ word + ' ' + suffix }`]: translations }
        }
    }).get()

    res.json({ ...response })
})

app.listen(3000)