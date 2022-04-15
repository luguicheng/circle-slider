import Vue from 'vue'
import App from './App.vue'
import vueCircleSlider from '@luguicheng/vue-circle-slider'

Vue.use(vueCircleSlider)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
