/*
 * @Author: liuruijun
 * @Date: 2020-09-01 16:24:08
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-03 14:56:31
 * @Description: file content
 */
import Vue from 'vue'
import DOMPurify from 'dompurify'
import './globalConfig'
import './assets/less/reset.less'
<% if (isH5) {%>import './assets/js/common'<% } %>
import App from './App.vue'
import router from './routers'
import store from './store'
<% if (isH5) { %>import utils from './assets/js/utils'<% } %>
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
<% if (isH5) { %>utils.initRem()// 初始化字体rem<% } %>
const context = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default context
