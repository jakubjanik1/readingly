<template>
    <div>
        <Pdf 
            :src="pdf"
            v-for="page in pages"
            :key="page"
            :page="page"
            :scale.sync="scale"
        />
    </div>
</template>

<script>
import Pdf from 'pdfvuer'

export default {
    name: 'PdfViewer',
    components: {
        Pdf
    },
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            pdf: null,
            pages: 0,
            scale: 'page-width'
        }
    },
    async mounted() {
        this.pdf = Pdf.createLoadingTask(this.src)

        const { numPages } = await this.pdf
        this.pages = numPages
    }
}
</script>