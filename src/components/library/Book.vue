<template>
    <div class="book" @click="openBook">
        <img class="book__thumbnail" :src="thumbnail" @error="showDefaultThumbnail">
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
    data() {
        return {
            thumbnail: null
        }
    },
    methods: {
        openBook() {
            const book = /o\/(.*)\?/.exec(this.src)[1]
            this.$router.push({ name: 'reader', params: { book }})
        },
        showDefaultThumbnail() {
            this.thumbnail = process.env.VUE_APP_DEFAULT_BOOK_COVER
        }
    },
    mounted() {    
        this.thumbnail = this.src.replace('epub', 'jpg')
    }
}
</script>

<style lang="scss" scoped>
    .book, .book__thumbnail {
        cursor: pointer;
        width: 120px;
        height: 192px;
        border-radius: 4px;
    }
</style>