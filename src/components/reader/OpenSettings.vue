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
        width: 1.3em;
        cursor: pointer;
    }
</style>