<template>
    <div class="book" @click="openBook">
        <img class="book__thumbnail" :src="bookThumbnail">
    </div>
</template>

<script>
export default {
    name: 'Book',
    props: {
        src: {
            type: String,
            required: true,
            default: ''
        }
    },
    methods: {
        openBook() {
            this.$router.push({ name: 'reader', params: { src: this.src }})
        }
    },
    computed: {    
        bookThumbnail() {
            if (this.src.includes('pdf')) {
                return this.src.replace('pdf', 'jpg')
            } else {
                return this.src.replace('epub', 'jpg')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .book, .book__thumbnail {
        width: 120px;
        height: 192px;
        border-radius: 4px;
    }
</style>