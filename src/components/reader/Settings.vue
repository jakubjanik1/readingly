<template>
  <div class="settings">
    <BrightnessSlider />
    <FontSizeSlider />
    <FontPicker />
    <ThemePicker />
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
    padding: 24px;
    grid-gap: 45px;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--theme-bg-color);
    color: var(--theme-text-color);
  }
</style>