<template>
    <div id="epub-viewer"></div>
</template>

<script>
import { Book } from 'epubjs'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'EpubViewer',
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            rendition: null
        }
    },
    async mounted() {
        const book = new Book(this.src, { openAs: 'epub' })

        const rendition = book.renderTo('epub-viewer', {
            manager: 'continuous',
            flow: 'scrolled',
            width: '100%',
            height: '100%'
        })

        this.rendition = rendition

        this.setProgress(0)
        rendition.themes.register('white', { body: { background: '#fff', color: '#333' }})
        rendition.themes.register('black', { body: { background: '#333', color: '#e7e7e7' }})
        rendition.themes.register('sepia', { body: { background: '#bfb79d', color: '#e7e7e7' }})
        rendition.themes.fontSize(this.fontSize + '%')
        rendition.themes.select(this.theme)
        
        rendition.display()

        rendition.on('selected', async cfiRange => {
            const range = await book.getRange(cfiRange)
            
            this.$emit('text-select', range.toString())
        })

        await book.ready
        book.locations.generate(1000)

        rendition.on('relocated', (location) => {
            const progress = book.locations.percentageFromCfi(location.start.cfi)
            this.setProgress(progress * 100)
        })
    },
    computed: mapState('reader', ['fontSize', 'theme', 'progress']),
    methods: mapMutations('reader', ['setProgress']),
    watch: {
        fontSize(newFontSize) {
            this.rendition.themes.fontSize(newFontSize + '%')
        },
        theme(newTheme) {
            this.rendition.themes.select(newTheme)
        }
    }
}
</script>

<style>
    #epub-viewer {
        height: calc(100vh - 32px);
    }
</style>