import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
// - global functions
// import { getImageUrl, bgcImg } from '@/assets/js/base'
Vue.config.productionTip = false
// -------- import global functions
import { share } from '@/mixins/share.js'

Vue.use(VueAxios, axios)
Vue.mixin(share)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
