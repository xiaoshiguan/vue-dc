import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Main from './components/HelloWorld.vue';
import demo from './components/demo.vue';
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/', name: 'Main', component: Main },
    { path: '/main', name: 'Main', component: Main },
    {path:'/demo',name:'demo',component:demo}
   
  ]
})