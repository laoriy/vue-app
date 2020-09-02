/* eslint-disable */

const utils  = {
  {{#if isH5}}
  appUA: '', // app传过来的UserAgent
  /**
     * rem单位计算
     * 设计稿是宽750，当一个div的宽是30px，转换rem为：30px/100px = 0.3rem
     * 设计稿是宽375，当一个div的宽是30px，转换rem为：30px*2/100px = 0.6rem
     */
  initRem: function () {
    const appUA = navigator.userAgent // app的UserAgent信息
    if (appUA && appUA.indexOf('{"appVersion') != -1) {
      utils.appUA = JSON.parse(appUA.substring(appUA.indexOf('{')))
    }

    /* rem控制不同屏幕显示大小 */
    utils.windowSize(document, window)
  },
  /**
     * 计算html字体font-size大小
     * @param doc document对象
     * @param win window对象
     */
  windowSize: function (doc, win) {
    const docEl = doc.documentElement
    const isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi)
    var dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1
    var dpr = window.top === window.self ? dpr : 1 // 被iframe引用时，禁止缩放
    var dpr = 1 // 首页引用IFRAME，强制为1
    const scale = 1 / dpr
    docEl.dataset.dpr = win.devicePixelRatio
    if (navigator.userAgent.match(/iphone/gi) && screen.width == 375 && win.devicePixelRatio == 2) {
      docEl.classList.add('iphone6')
    }
    if (navigator.userAgent.match(/iphone/gi) && screen.width == 414 && win.devicePixelRatio == 3) {
      docEl.classList.add('iphone6p')
    }
    const metaEl = doc.createElement('meta')
    metaEl.name = 'viewport'
    metaEl.content = `initial-scale=${scale},maximum-scale=${scale}, minimum-scale=${scale}`
    docEl.firstElementChild.appendChild(metaEl)
    // deviceWidth通过document.documentElement.clientWidth就能取到
    const recalc = function () {
      let width = docEl.clientWidth
      if (width / dpr > 750) {
        width = 750 * dpr
      }
      docEl.style.fontSize = `${100 * (width / 750)}px`
    }
    recalc()
    if (!doc.addEventListener) return
  },
  {{/if}}
  /**
     * 获取url参数
     * @param param 参数名
     * @returns {*}
     */
  getUrlParams: function (param) {
    const ps = decodeURI(location.href)
    if (ps == '') return ''
    const params = (ps.substr(ps.lastIndexOf('?') + 1)).split('&')
    if (params != null) {
      for (let i = 0; i < params.length; i++) {
        const strs = params[i].split('=')
        if (strs[0] == param && strs[1]) {
          return strs[1]
        }
      }
    }
    return ''
  },
  /**
     * 转换时间格式
     * 用法：format(ms,'yyyy-MM-dd hh:mm:ss')
     * @param time 毫秒数
     * @param fmt 要转换的时间格式
     */
  format: function (time, fmt='yyyy-MM-dd hh:mm:ss') {
    if (!time) {
      return ''
    }
    const d = new Date(time)
    const o = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      S: d.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${d.getFullYear()}`).substr(4 - RegExp.$1.length))
    for (const k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    return fmt
  },
  /**
   * 设置cookie
   */
  setCookie (cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const str = `${window.location.host.split('.')[1]}.${window.location.host.split('.')[2]}`
    document.cookie = `${cname}=${escape(cvalue)};expires=${d.toGMTString()};path=/;domain=${str};`
  },
  /**
   * 获取cookie
   */
  getCookie (cname) {
    const name = `${cname}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  /**
   * 删除cookie
   */
  delCookie (name) {
    utils.setCookie(name, '', -1)
  },

  //js加法防止运算精度问题
  accAdd (arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return ((arg1 * m + arg2 * m) / m)
  },
  //js减法防止运算精度问题
  subtr (arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m - arg2 * m) / m);
  },
  // js乘法防止运算精度问题
  accMul (arg1, arg2) {
    let m = 0; const s1 = arg1.toString(); const s2 = arg2.toString()
    try { m += s1.split('.')[1].length } catch (e) { }
    try { m += s2.split('.')[1].length } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  // js除法防止运算精度问题
  accDiv (arg1, arg2) {
    let t1 = 0; let t2 = 0; let r1; let r2
    try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
    try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  /**
    页面参数跳转
    @param params
  * */
  toUrl (str = '', params) {
    if (params && str) {
      str = str[str.length - 1] === '?' ? str : (`${str}?`)
      for (const name in params) {
        str += `${name}=${params[name]}&`
      }
    }
    str = str.replace(/\&$/g, '')
    return str
  },
  /**
    生成倒计时时间
    @param time 要倒计时时间 ， 默认秒  type 默认 minutes 到分钟
   * */
  createIntervalTime (time, type = 'minutes') {
    let now = new Date()
    //创建一个新日期
    let endDate = time

    let leftTime = (endDate - now.getTime())
    if(leftTime <= 0) {
      return ''
    }

    let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
    let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) //计算剩余的小时
    let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) //计算剩余的分钟
    let seconds = parseInt(leftTime / 1000 % 60, 10) //计算剩余的秒数
    days = utils.checkTime(days)
    hours = utils.checkTime(hours)
    minutes = isNaN(utils.checkTime(minutes))?0: utils.checkTime(minutes)
    seconds = isNaN(utils.checkTime(seconds))?0 :utils.checkTime(seconds)

    if(minutes === 0 && seconds === 0) {
      return 0
    }
    return minutes + '分' + seconds + '秒'
  },
}
export default utils
