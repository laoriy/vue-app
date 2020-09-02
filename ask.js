/*
 * @Author: liuruijun
 * @Date: 2020-09-02 14:12:08
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 14:39:32
 * @Description: file content
 */
const CUSTOME_UI = 'use another ui library'
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
      CUSTOME_UI
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
      CUSTOME_UI
    ],
    message: 'Please choose a ui library'
  }]

module.exports = {
  h5ask,
  pcask,
  CUSTOME_UI
}
