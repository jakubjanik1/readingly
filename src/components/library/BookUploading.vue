<template>
    <div class="book-uploading">
        <ClipLoader color="#00000050" size="54px" />
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
        width: 140px;
        height: 224px;
        border-radius: 4px;
        background: #e1e1e1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>