/*
 * @Author: liuruijun
 * @Date: 2020-09-02 14:12:08
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 14:38:21
 * @Description: file content
 */
const IS_CUSTOME_UI = 'use another ui library'
const h5ask = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please enter the project name'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project proxyIp'
  },
  {
    type: 'input',
    name: 'description',
    choices: [
      'mint-ui',
      'vant',
      IS_CUSTOME_UI
    ],
    message: 'Please choose a ui library'
  }]
  
const pcask = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please enter the project name'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project proxyIp'
  },
  {
    type: 'input',
    name: 'description',
    choices: [
      'element-ui',
      'bootstrap',
      IS_CUSTOME_UI
    ],
    message: 'Please choose a ui library'
  }]

module.exports = {
  h5ask,
  pcask,
  IS_CUSTOME_UI
}
