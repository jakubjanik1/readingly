import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSlideoutPanel from 'vue2-slideout-panel'
 
Vue.use(VueSlideoutPanel)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
