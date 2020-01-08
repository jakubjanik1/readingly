<template>
    <div class="reader">
        <ReturnToLibrary />

        <EpubViewer v-if="isEpub" :src="book" @text-select="showDictionary" />
        <PdfViewer v-else :src="book" />

        <Dictionary :word="selectedWord" />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import PdfViewer from '@/components/reader/PdfViewer'
import Dictionary from '@/components/reader/Dictionary'

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary,
        EpubViewer,
        PdfViewer,
        Dictionary
    },
    data() {
        return {
            book: process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book),
            selectedWord: ''
        }
    },
    computed: {
        isEpub() {
            return this.book.includes('epub')
        }
    },
    methods: {
        showDictionary(word) {
            this.selectedWord = word
            this.$modal.show('dictionary')
        }
    }
}
</script>