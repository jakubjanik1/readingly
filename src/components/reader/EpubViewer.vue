<template>
    <div id="epub-viewer"></div>
</template>

<script>
import { Book } from 'epubjs'

export default {
    name: 'EpubViewer',
    props: {
        src: {
            type: String,
            required: true
        }
    },
    mounted() {
        const book = new Book(this.src, { openAs: 'epub' })

        const rendition = book.renderTo('epub-viewer', {
            manager: 'continuous',
            flow: 'scrolled',
            width: '100%',
            height: '100%'
        })

        rendition.display()

        rendition.on('selected', async cfiRange => {
            const range = await book.getRange(cfiRange)
            
            this.$emit('text-select', range.toString())
        })
    }
}
</script>

<style>
    #epub-viewer {
        height: calc(100vh - 28px);
    }
</style>