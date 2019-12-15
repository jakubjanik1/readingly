<template>
    <div class="reader">
        <ReturnToLibrary />

        <EpubViewer v-if="isEpub" :src="src" />
        <PdfViewer v-else :src="src" />
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
    props: {
        src: {
            type: String,
            required: true
        }
    },
    computed: {
        isEpub() {
            return this.src.includes('epub')
        }
    }
}
</script>