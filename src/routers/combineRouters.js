/*
 * @Author: liuruijun
 * @Date: 2020-05-29 09:26:53
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-01 16:58:23
 * @Description: file content
 */ 
const files = require.context('.', false, /\.js$/)
// eslint-disable-next-line import/no-mutable-exports
let routers = []
const execptRouter = ['./combineRouters', './index'] // 排除自身和路由入口文件

files
  .keys()
  .filter(key => execptRouter.indexOf(key) === -1)
  .forEach((key) => {
    routers = routers.concat(files(key).default || [])
  })

export default routers
