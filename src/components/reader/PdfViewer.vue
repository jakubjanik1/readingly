<template>
    <div>{{ src }}</div>
</template>

<script>
export default {
    name: 'PdfViewer',
    props: {
        src: {
            type: String,
            required: true
        }
    }
}
</script>