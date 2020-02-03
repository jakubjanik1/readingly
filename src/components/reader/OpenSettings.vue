<template>
    <div class="open-settings" @click="$emit('click')">
        <SettingsIcon />
    </div>
</template>

<script>
import SettingsIcon from 'vue-material-design-icons/Settings'

export default {
    name: 'OpenSettings',
    components: {
        SettingsIcon
    }
}
</script>

<style lang="scss" scoped>
    .open-settings {
        height: 24px;
        cursor: pointer;
    }
</style>