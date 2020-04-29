<template>
    <div class="return-to-library" @click="navigateToLibrary">
        <ReturnIcon fillColor="#333" />
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
        height: 24px;
        cursor: pointer;
    }
</style>