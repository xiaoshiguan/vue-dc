import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import Main from './components/HelloWorld.vue';
import demo from './components/demo.vue';
import valide from './components/valide.vue';
import table from './components/table.vue';
import exportss from './components/export.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Main', component: Main },
    { path: '/main', name: 'Main', component: Main },
    { path: '/demo', name: 'demo', component: demo },
    { path: '/valide', name: 'valide', component: valide },
    { path: '/table/:id', name: 'table', component: table },
    { path: '/exports', name: 'exports', component: exportss },
    { path: '*', name: 'Main', component: Main },

  ]
})