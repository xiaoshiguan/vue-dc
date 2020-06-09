import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import http from './http/http.js'   //axios实例化后引入取名http
import utils from './utils/utils.js'
// import Blob from './excel/bold.js'
// import Export2Excel from './excel/export.js'
Vue.prototype.$http = http
Vue.prototype.$utils = utils

require('./mock');
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
