<template>
  <div class="settings">
    <FontSizeSlider />
    <ThemePicker />
  </div>
</template>

<script>
import FontSizeSlider from './FontSizeSlider'
import ThemePicker from './ThemePicker'

export default {
  name: 'Settings',
  components: {
    FontSizeSlider,
    ThemePicker
  }
}
</script>

<style lang="scss" scoped>
  .settings {
    display: grid;
    margin: 24px;
    grid-gap: 32px;
  }
</style>