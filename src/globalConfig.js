/*
 * @Author: liuruijun
 * @Date: 2019-10-10 15:55:49
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-03 10:04:41
 * @Description: file content
 */

function URLCONFIG(w) {
  const { hostname } = w.location
  if (hostname === 'xx.xx.com') {
    // 生产
    w.globalConfig = {
      basePath: '{{proxyIp}}',
      environment: 'idc'
    }
  } else { 
    // dev
    w.globalConfig = {
      basePath: '{{proxyIp}}',
      environment: 'dev' 
    }
  }
}

URLCONFIG(window)
