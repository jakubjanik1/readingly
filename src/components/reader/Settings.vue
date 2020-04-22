<template>
  <div class="settings">
    <BrightnessSlider />
    <FontSizeSlider />
    <ThemePicker />
    <FontPicker />
  </div>
</template>

<script>
import BrightnessSlider from './BrightnessSlider'
import FontSizeSlider from './FontSizeSlider'
import ThemePicker from './ThemePicker'
import FontPicker from './FontPicker'

export default {
  name: 'Settings',
  components: {
    BrightnessSlider,
    FontSizeSlider,
    ThemePicker,
    FontPicker
  }
}
</script>

<style lang="scss" scoped>
  .settings {
    display: grid;
    margin: 24px;
    grid-gap: 45px;
  }
</style>