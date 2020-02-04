<template>
  <div class="settings">
    <TextSizeSlider />
    <ThemePicker />
  </div>
</template>

<script>
import TextSizeSlider from './TextSizeSlider'
import ThemePicker from './ThemePicker'

export default {
  name: 'Settings',
  components: {
    TextSizeSlider,
    ThemePicker
  }
}
</script>