<template>
    <div class="return-to-library" @click="navigateToLibrary">
        <ReturnIcon />
    </div>
</template>

<script>
import ReturnIcon from 'vue-material-design-icons/KeyboardBackspace'

export default {
    name: 'ReturnToLibrary',
    components: {
        ReturnIcon
    },
    methods: {
        navigateToLibrary() {
            this.$router.push({ name: 'library' })
        }
    }
}
</script>

<style lang="scss" scoped>
    .return-to-library {
        width: 1.3em;
        cursor: pointer;
    }
</style>