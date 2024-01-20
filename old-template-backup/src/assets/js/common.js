/*
 * @Author: liuruijun
 * @Date: 2019-10-21 10:04:56
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-03 11:44:28
 * @Description: file content
 */
import FastClick from 'fastclick'
/* eslint-disable */
// 解决iosinput框点击几次or双击才能获取焦点的问题
// todo: 因为与vue-quill-editor，导致editor需要双击才能获得焦点
if (window.location.href.indexOf('wechat-group-data') === -1) {
  FastClick.prototype.focus = function (targetElement) {
    let length; const 
      isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi)
    if (
      isIOS
      && targetElement.setSelectionRange
      && targetElement.type.indexOf('date')
    ) {
      length = targetElement.value.length
      targetElement.setSelectionRange(length, length)
      targetElement.focus()
    } else {
      targetElement.focus()
    }
  }
  
  const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
  const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
  
  // 解决ios视频播放按钮点击不能播放暂停
  FastClick.prototype.needsClick = function (target) {
    switch (target.nodeName.toLowerCase()) {
      case 'button':
      case 'select':
      case 'textarea':
        if (target.disabled) {
          return true
        }
        break
      case 'input':
        if ((deviceIsIOS && target.type === 'file') || target.disabled) {
          return true
        }
        break
      case 'label':
      case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
      case 'video':
        return true
    }
    return /\bneedsclick\b/.test(target.className) || /\bvjs/.test(target.className)
  }
  
  FastClick.attach(document.body)  
}
<% if (isH5) { %>
//  本地环境及测试环境增加vconsole
if (globalConfig.environment !== 'idc') {
  var script = document.createElement('script');
  var style = document.createElement('style');
  style.appendChild(
    document.createTextNode('.vc-table{ line-height: 1.3; }')
  );
  // vConsole v3.3.0
  script.src = '//static.huoxingplan.com/mars/20200804/0a3e695f0c5b44a5ac8fb1170cb37169.js';
  document.body.appendChild(script);
  document.body.appendChild(style);
}
<% } %>

