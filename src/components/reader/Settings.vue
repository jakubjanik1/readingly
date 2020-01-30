<template>
  <div class="settings">
    <div class="settings__text-size">
      <TextSizeDecrease />

      <TextSizeSlider   
        :value="textSize" 
        :min="100"
        :max="200" 
        tooltip="none"
        dotSize="22"
        :height="3"
        width="100%"
        :dotStyle="{ border: '2px solid' }"
        @change="setTextSize($event)"
      />

      <TextSizeIncrease />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import TextSizeSlider from 'vue-slider-component'
import TextSizeIncrease from 'vue-material-design-icons/FormatFontSizeIncrease'
import TextSizeDecrease from 'vue-material-design-icons/FormatFontSizeDecrease'

export default {
    name: 'Settings',
    components: {
      TextSizeSlider,
      TextSizeIncrease,
      TextSizeDecrease
    },
    computed: mapState('reader', ['textSize']),
    methods: mapMutations('reader', ['setTextSize'])
}
</script>

<style lang="scss">
 .settings {
   &__text-size {
      margin: 24px;
      display: grid;
      grid-template-columns: 24px auto 24px;
      grid-template-rows: 24px;
      grid-column-gap: 24px;   
    }
 }

  $themeColor: #000;
  $dotShadow: none;
  $dotShadowFocus: none;

  @import '~vue-slider-component/lib/theme/default.scss';
</style>