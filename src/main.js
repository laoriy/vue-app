/*
 * @Author: liuruijun
 * @Date: 2020-09-01 16:24:08
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 11:25:57
 * @Description: file content
 */
/*
 * @Author: liuruijun
 * @Date: 2019-10-10 15:55:49
 * @LastAuthor: WE1ZHANTA0
 * @lastTime: 2020-07-27 10:34:37
 * @Description: main.js
 */
import Vue from 'vue'
import DOMPurify from 'dompurify'
import './assets/less/reset.less'

import App from './App.vue'
import router from './routers'
import store from './store'
import utils from './assets/js/utils'

Vue.prototype.$xss = DOMPurify.sanitize

router.beforeEach((to, from, next) => {
  const bodyEl = document.body
  const htmlEl = bodyEl.parentElement

  // 根据router.js里的meta数据显示背景色
  const { bgColor } = to.meta
  if (bgColor) {
    bodyEl.style.backgroundColor = bgColor
    htmlEl.style.backgroundColor = bgColor
  } else {
    bodyEl.style.backgroundColor = ''
    htmlEl.style.backgroundColor = ''
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

utils.initRem()// 初始化字体rem

const context = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default context
