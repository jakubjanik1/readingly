<template>
  <div id="app" :class="theme">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: mapState('reader', ['theme'])
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Zilla+Slab:400,500&display=swap');

  .white {
    --theme-bg-color: #f9f9f9;
    --theme-text-color: #333;
  }

  .black {
    --theme-bg-color: #333;
    --theme-text-color: #e7e7e7;
  }

  .sepia {
    --theme-bg-color: #fbf0d9;
    --theme-text-color: #5f4b32;
  }

  body {
    margin: 0;
    font-family: 'Zilla Slab', serif;
    letter-spacing: 0.1em;
  }
</style>
