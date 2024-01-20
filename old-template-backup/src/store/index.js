/*
 * @Author: liuruijun
 * @Date: 2019-11-19 14:28:42
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 11:51:06
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex' // 引入对应模块
import example from './modules/example'

Vue.use(Vuex) // 安装Vue插件 vuex

export default new Vuex.Store({
  modules: {
    // 将 store 分割成模块
    example
  }
})
