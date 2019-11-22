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