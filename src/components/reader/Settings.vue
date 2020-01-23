<template>
  <div>
    <div>Settings</div>
    
    <TextSizeSlider 
      :value="textSize"
      min="100"
      max="200"
      @change="setTextSize($event)"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import TextSizeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
    name: 'Settings',
    components: {
      TextSizeSlider
    },
    computed: mapState('reader', ['textSize']),
    methods: mapMutations('reader', ['setTextSize'])
}
</script>