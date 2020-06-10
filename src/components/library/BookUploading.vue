<template>
    <div class="book-uploading">
        <ClipLoader color="#333" size="45px" />
    </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'BookUploading',
    components: {
        ClipLoader
    }
}
</script>

<style lang="scss" scoped>
    .book-uploading {
        width: 120px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
</style>