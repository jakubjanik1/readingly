<template>
    <div class="book">
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
    }
}
</script>

<style lang="scss" scoped>
    .book, .book__thumbnail {
        width: 140px;
        height: 224px;
        border-radius: 4px;
    }
</style>