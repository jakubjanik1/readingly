<template>
    <div class="text-size-slider">
      <FontDecreaseIcon />

      <Slider   
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

      <FontIncreaseIcon />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Slider from 'vue-slider-component'
import FontIncreaseIcon from 'vue-material-design-icons/FormatFontSizeIncrease'
import FontDecreaseIcon from 'vue-material-design-icons/FormatFontSizeDecrease'

export default {
    name: 'TextSizeSlider',
    components: {
      Slider,
      FontIncreaseIcon,
      FontDecreaseIcon
    },
    computed: mapState('reader', ['textSize']),
    methods: mapMutations('reader', ['setTextSize'])
}
</script>

<style lang="scss">
    .text-size-slider {
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