<template>
  <div class="settings">
    <BrightnessSlider />
    <FontSizeSlider />
    <ThemePicker />
  </div>
</template>

<script>
import BrightnessSlider from './BrightnessSlider'
import FontSizeSlider from './FontSizeSlider'
import ThemePicker from './ThemePicker'

export default {
  name: 'Settings',
  components: {
    BrightnessSlider,
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