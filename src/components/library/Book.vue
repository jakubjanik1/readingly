<template>
    <div class="book" @click="openBook">
        <img class="book__thumbnail" :src="src">
    </div>
</template>

<script>
export default {
    name: 'Book',
    props: {
        src: {
            type: String,
            required: true
        }
    },
    methods: {
        openBook() {
            this.$router.push({ name: 'reader', params: { src: this.src }})
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