<template>
    <div class="book-uploading">
        <ClipLoader color="#00000050" size="45px" />
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
        height: 192px;
        border-radius: 4px;
        background: #e1e1e1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>