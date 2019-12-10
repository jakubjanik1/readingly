<template>
    <div class="book" @click="openBook">
        <img class="book__thumbnail" v-if="isPdf" :src="src.replace('pdf', 'jpg')">
        <div class="book__thumbnail" v-else>EPUB</div>
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
        isPdf() {
            return this.src.includes('pdf')
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