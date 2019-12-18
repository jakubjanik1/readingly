<template>
    <div class="reader">
        <ReturnToLibrary />

        <EpubViewer v-if="isEpub" :src="book" />
        <PdfViewer v-else :src="book" />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import PdfViewer from '@/components/reader/PdfViewer'

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary,
        EpubViewer,
        PdfViewer
    },
    data() {
        return {
            book: ''
        }
    },
    mounted() {
        this.book = process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book)
    },
    computed: {
        isEpub() {
            return this.book.includes('epub')
        }
    }
}
</script>