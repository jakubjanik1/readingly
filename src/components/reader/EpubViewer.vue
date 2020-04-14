<template>
    <div class="epub">
        <ClipLoader
            class="epub__loading"
            v-show="loading"
            color="#000"
            size="75px"
        />
        <div id="epub__viewer" />
    </div>
</template>

<script>
import { Book } from 'epubjs'
import { mapState, mapMutations } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import $ from 'jquery'

export default {
    name: 'EpubViewer',
    props: {
        src: {
            type: String,
            required: true
        }
    },
    components: {
        ClipLoader
    },
    data() {
        return {
            rendition: null,
            loading: true
        }
    },
    async mounted() {
        const book = new Book(this.src, { openAs: 'epub' })

        const rendition = book.renderTo('epub__viewer', {
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

        rendition.on('rendered', () => {
            this.loading = false
            
            rendition.getContents().forEach(content => {
                $(content.content).click(function(e) {
                    const selection = content.window.getSelection()
                
                    selection.modify('extend', 'backward', 'word')       
                    const b = selection.toString()

                    selection.modify('extend', 'forward', 'word')
                    const a = selection.toString()
                    selection.modify('move','forward','character')
                                        
                    if (b + a) {
                        this.$emit('text-select', b + a)
                    }
                }.bind(this))
            })
        })
    },
    computed: {
        ...mapState('reader', ['fontSize', 'theme', 'progress'])
    },
    methods: {
        ...mapMutations('reader', ['setProgress'])
    },
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

<style scoped>
    #epub__viewer {
        height: calc(100vh - 32px);
    }

    .epub__loading {
        position: fixed;
        height: calc(100% - 32px);
        width: 100%;
        top: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f9f9f9;
    }
</style>