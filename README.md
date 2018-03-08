
# 想来用vue 和 node 和 mongodb 做一个完整的系统
### 目录结构
```
| front  (vue 搭建的前端 router 由前端控制)
  | build
  | config
  | src
  | static
  index.html
| server (express 搭建的后端，提供api)
  | database
  | router
  | util
  app.js
package.json
README.md
.gitignore
```
### 运行需要
```
1. 安装mongodb数据库
2. 安装redis
3. npm install 安装包
```
### 体验地址
[尬聊系统体验链接](http://vue.zeroyh.cn/)

### 完成的功能
1. 登录功能
2. 评论话题功能

### 详情介绍
1. front 运用了vue 框架，vux记录登录状态，vue-router路由管理 axios 网络请求
2. server 运用了express框架，输出api接口，与mongodb 数据库数据交互
