<template>
  <Slider 
    :value="brightness" 
    :min="20"
    :max="100" 
    @change="setBrightness($event)"
  >
    <template v-slot:left-label>
      <BrightnessDecrease />
    </template>

    <template v-slot:right-label>
      <BrightnessIcrease />
    </template>
  </Slider>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Slider from '../ui/Slider'
import BrightnessDecrease from 'vue-material-design-icons/LightbulbOnOutline'
import BrightnessIcrease from 'vue-material-design-icons/LightbulbOn'

export default {
    name: 'BrightnessSlider',
    components: {
      Slider,
      BrightnessDecrease,
      BrightnessIcrease
    },
    computed: mapState('reader', ['brightness']),
    methods: mapMutations('reader', ['setBrightness'])
}
</script>