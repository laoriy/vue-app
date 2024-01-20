<!--
 * @Author: liuruijun
 * @Date: 2020-07-07 11:51:47
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-01 16:32:07
 * @Description: file content
--> 

# 安装

- 安装项目依赖：`yarn install`

# 运行

### 启动开发环境

> 开发环境可以通过端口号支持同时运行多个项目。继承于Vue-cli的 yarn serve，它的参数是可以继承使用的

```
// 启动命令如下

yarn serve      默认端口8008，代理至http://<%=proxyIp%>
 
// 设置端口或代理启动(默认http协议，可以自己写协议)

yarn serve -port 8000
yarn serve -env <%=proxyIp%>
yarn serve -port 8000 -env https://<%=proxyIp%>
yarn serve -port 8000 -env 10.3.6.198

```
### 启动打包编译


```
// 启动命令如下
yarn build
```
