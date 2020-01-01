<template>
    <div>
        <Pdf :src="src" :page="1" />
        <Pdf :src="src" :page="5" />
    </div>
</template>

<script>
import Pdf from 'vue-pdf'

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
    }
}
</script>