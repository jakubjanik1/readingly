<template>
  <div class="settings">
    <TextSizeSlider 
      class="settings__text-size"
      :value="textSize" 
      :min="100"
      :max="200" 
      tooltip="none"
      dotSize="22"
      :height="6"
      @change="setTextSize($event)"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import TextSizeSlider from 'vue-slider-component'

export default {
    name: 'Settings',
    components: {
      TextSizeSlider
    },
    computed: mapState('reader', ['textSize']),
    methods: mapMutations('reader', ['setTextSize'])
}
</script>

<style lang="scss">
 .settings {
   &__text-size {
     margin: 32px;
   }
 }

  $themeColor: #000;
  $dotShadowFocus: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);

  @import '~vue-slider-component/lib/theme/default.scss';
</style>