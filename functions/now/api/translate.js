const { get } = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
    const { word } = req.query
    
    const { data } = await get(`https://en.bab.la/dictionary/english-polish/${ word }`)
    const $ = cheerio.load(data)

    let results = $('.content').first().find('.quick-result-entry')

    results = results.map((i, el) => {
        const word = $(el).find('.babQuickResult').text()
        const suffix = $(el).find('.suffix').text()
        let translations = $(el).find('.pl ~ .sense-group-results > li > a')
        
        translations = translations.map((i, el) => $(el).text()).get()
        
        if (translations.length) {
            return { [`${ word + ' ' + suffix }`]: translations }
        }
    }).get()

    res.json({ translations: results })
}