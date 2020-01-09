<template>
    <div class="reader">
        <ReturnToLibrary />

        <EpubViewer :src="book" @text-select="showDictionary" />

        <Dictionary :word="selectedWord" />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import Dictionary from '@/components/reader/Dictionary'

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary,
        EpubViewer,
        Dictionary
    },
    data() {
        return {
            book: process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book),
            selectedWord: ''
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