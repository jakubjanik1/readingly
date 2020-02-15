<template>
  <Slider 
    :value="fontSize" 
    :min="100"
    :max="200" 
    @change="setFontSize($event)"
  >
    <FontDecreaseIcon slot="left-label" />
    <FontIncreaseIcon slot="right-label" />
  </Slider>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Slider from '../ui/Slider'
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