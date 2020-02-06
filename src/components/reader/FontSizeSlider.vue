<template>
    <div class="font-size-slider">
      <FontDecreaseIcon />

      <Slider   
        :value="fontSize" 
        :min="100"
        :max="200" 
        tooltip="none"
        dotSize="22"
        :height="3"
        width="100%"
        :dotStyle="{ border: '2px solid' }"
        @change="setFontSize($event)"
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
    name: 'FontSizeSlider',
    components: {
      Slider,
      FontIncreaseIcon,
      FontDecreaseIcon
    },
    computed: mapState('reader', ['fontSize']),
    methods: mapMutations('reader', ['setFontSize'])
}
</script>

<style lang="scss">
    .font-size-slider {
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