/*
 * @Author: liuruijun
 * @Date: 2020-07-07 16:40:19
 * @LastAuthor: WE1ZHANTA0
 * @lastTime: 2020-07-27 15:45:46
 * @Description: file content
 */ 

import Vue from 'vue'
import VueRouter from 'vue-router'
import routerApi from './combineRouters'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '<%=projectName%>',
  routes: [
    {
      path: '*',
      component: () => import(/* webpackChunkName: "Index" */ '@/Index/Index.vue'),
      meta: { title: '首页' }
    },
    ...routerApi
  ]
})
