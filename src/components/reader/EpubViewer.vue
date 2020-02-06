<template>
    <div id="epub-viewer"></div>
</template>

<script>
import { Book } from 'epubjs'
import { mapState } from 'vuex'

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
    mounted() {
        const book = new Book(this.src, { openAs: 'epub' })

        this.rendition = book.renderTo('epub-viewer', {
            manager: 'continuous',
            flow: 'scrolled',
            width: '100%',
            height: '100%'
        })

        this.rendition.themes.register('white', { body: { background: '#fff', color: '#333' }})
        this.rendition.themes.register('black', { body: { background: '#333', color: '#e7e7e7' }})
        this.rendition.themes.register('sepia', { body: { background: '#bfb79d', color: '#e7e7e7' }})

        this.rendition.themes.fontSize(this.fontSize + '%')
        this.rendition.themes.select(this.theme)
        this.rendition.display()

        this.rendition.on('selected', async cfiRange => {
            const range = await book.getRange(cfiRange)
            
            this.$emit('text-select', range.toString())
        })
    },
    computed: mapState('reader', ['fontSize', 'theme']),
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