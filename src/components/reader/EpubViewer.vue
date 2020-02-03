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

        this.rendition.themes.fontSize(this.textSize + '%')
        this.rendition.display()

        this.rendition.on('selected', async cfiRange => {
            const range = await book.getRange(cfiRange)
            
            this.$emit('text-select', range.toString())
        })
    },
    computed: mapState('reader', ['textSize']),
    watch: {
        textSize(newTextSize) {
            this.rendition.themes.fontSize(newTextSize + '%')
        }
    }
}
</script>

<style>
    #epub-viewer {
        height: calc(100vh - 32px);
    }
</style>