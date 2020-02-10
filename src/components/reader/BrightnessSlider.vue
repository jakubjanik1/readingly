<template>
    <div class="brightness-slider">
      <BrightnessDecrease />

      <Slider   
        :value="brightness" 
        :min="20"
        :max="100" 
        tooltip="none"
        dotSize="22"
        :height="3"
        width="100%"
        :dotStyle="{ border: '2px solid' }"
        @change="setBrightness($event)"
      />

      <BrightnessIcrease />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Slider from 'vue-slider-component'
import BrightnessDecrease from 'vue-material-design-icons/LightbulbOnOutline'
import BrightnessIcrease from 'vue-material-design-icons/LightbulbOn'

export default {
    name: 'FontSizeSlider',
    components: {
      Slider,
      BrightnessDecrease,
      BrightnessIcrease
    },
    computed: mapState('reader', ['brightness']),
    methods: mapMutations('reader', ['setBrightness'])
}
</script>

<style lang="scss">
    .brightness-slider {
        display: grid;
        grid-template-columns: 24px auto 24px;
        grid-template-rows: 24px;
        grid-column-gap: 24px;   
    }

    $themeColor: #000;
    $dotShadow: none;
    $dotShadowFocus: none;

    @import '~vue-slider-component/lib/theme/default.scss';
</style>