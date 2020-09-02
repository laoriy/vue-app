
/*
 * @Author: liuruijun
 * @Date: 2019-10-10 15:55:49
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 11:14:48
 * @Description: file content
 */

const path = require('path')

const argv = process.argv || []
const IS_PROD = process.env.NODE_ENV === 'production'

const initEnv = 'http://{{proxyIp}}' // 默认代理域名
const initPort = 8000 // 默认启动端口

function setStart(type, defaultVal) {
  let index = 0
  if (argv[2] !== 'serve') {
    return
  }
  argv.forEach((val, key) => {
    if (val === `-${type}`) {
      index = key
    }
  })
  if (index !== 0 && argv[index + 1]) {
    let env = argv[index + 1]
    switch (type) {
      case 'port': // 端口
        console.log(`[HPM] Proxy created: / ->${argv[index + 1]}`)
        return argv[index + 1]
      case 'env': // 代理
        env = env.indexOf('http') > -1 ? env : `http://${env}`
        console.log(`[HPM] Proxy created: / ->${env}`)
        return env
      default:
        console.log(`[HPM] Proxy created: / -> ${defaultVal}`)
        return defaultVal
    }
  }
  console.log(`[HPM] Proxy created: / -> ${defaultVal}`)
  return defaultVal
}

// 全局注入theme.less
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/less/index.less')
      ]
    })
}
module.exports = {
  publicPath: '/{{progectName}}/',
  outputDir: './{{progectName}}',
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src/views'))
      .set('@api', path.resolve(__dirname, './src/api'))
      .set('@assets', path.resolve(__dirname, './src/assets'))
      .set('@components', path.resolve(__dirname, './src/components'))

    config.resolve.symlinks(true) // 修复HMR
    config.output.filename('[name].[hash].js').end()
    config.output.chunkFilename('[name].min.js')

    // 删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  css: {
    extract: false,
    sourceMap: false // 开启 CSS source maps?
  },
  productionSourceMap: !IS_PROD,
  devServer: {
    open: IS_PROD,
    port: setStart('port', initPort),
    proxy: {
      '/api': {
        target: `${setStart('env', initEnv)}`,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
 
}
