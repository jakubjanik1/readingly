<template>
    <div class="reading-progress" :style="{ width: progress + '%' }"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ReadingProgress',
    computed: mapState('reader', ['progress'])
}
</script>

<style lang="scss" scoped>
    .reading-progress {
        height: 4px;
        position: fixed;
        bottom: 0;
        background: #000;
    }
</style>