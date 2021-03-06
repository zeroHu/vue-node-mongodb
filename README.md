
# 伪全栈做的 vue,node,mongodb 前后端语言集于一体的做一个全栈网站
**项目持续开发中。。。还未完成。敬请期待~**
### 体验地址
[尬聊系统体验链接](http://vue.zeroyh.cn/)

### 代码功能概述
```
// 前端开发应用点
1. toast，dialog 组件封装和应用
2. 分页组件
3. 上传图片到七牛云

// 后端开发应用点
1. 登录的处理逻辑
2. query update 等查询数据库函数的封装
3. 分页查询数据库函数的封装
4. session 管理和记录
5. 七牛sdk 获取token
6. nodejs 制作海报（海报模板上添加标题，头像，二维码等内容）
```

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

### 目录详情介绍
1. front 运用了vue 框架，vux记录登录状态，vue-router路由管理 axios 网络请求
2. server 运用了express框架，输出api接口，与mongodb 数据库数据交互

### 项目运行需要
```
1. 安装 mongodb 数据库
2. 安装 redis
3. npm install || yarn install 安装依赖包
4. npm run sdev (后端server跑起来)
5. npm run fdev (前端vue跑起来)
6. 打开 localhost:3050
```

### 已完成的功能
1. 登录功能
2. 评论话题功能
3. 管理员管理话题
4. 前后端的分页功能
5. toast dialog 组件的简单粗暴封装
7. 上传图片到七牛云，上传菜谱功能
8. nodejs 给模板海报添加内容
### 未完成功能
1. 菜谱 待完善
2. ... (未想好)


### 服务器端 **nginx** 配置
```nginx
# 直接上原封不动的nginx配置
upstream vuenode {
    server 127.0.0.1:3040;
    keepalive 64;
}
server {
    listen 80;
    # https 配置 如果 http 可不加
    listen 443 ssl;

    server_name vue.zeroyh.cn;

    # https 配置 如果 http 可不加
    ssl_certificate /etc/nginx/ssl/vue.zeroyh.cn.crt;
    ssl_certificate_key /etc/nginx/ssl/vue.zeroyh.cn.key;

    # 配置根目录路劲
    location / {
        root /data/vue-node-mongodb/front/dist;
        try_files $uri $uri/ /index.html =404;
    }
    # 配置 express api
    location /api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_max_temp_file_size 0;
        proxy_pass http://vuenode/api; #转发配置
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
```

### 最后附上网站首页[美图]几张
![首页美图1](http://static.zeroyh.cn/vue-express.jpg)
![首页美图2](http://static.zeroyh.cn/vue-express2.jpg)
![首页美图3](http://static.zeroyh.cn/vue-express3.jpg)
![首页美图4](http://static.zeroyh.cn/vue-express4.jpg)
![首页美图5](http://static.zeroyh.cn/vueexpress5.jpg)
![海报页](http://vue.zeroyh.cn/postmaker/img/1534329350578.png)
