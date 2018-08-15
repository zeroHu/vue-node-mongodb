const express = require('express');
const path = require('path');
const hbs = require('express-hbs');
const config = require('./config');
const app = express();

// 中间件定义
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// 引入路劲文件
const router = require('./router');

// 引用中间插件
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// redis配置
const options = config.redis;
// session
app.use(cookieParser('vue express mongodb'));
app.use(session({
    store: new RedisStore(options), // 存储方式
    secret: 'vue express mongodb', // 与cookieParser中的一致
    resave: true, // 是否每次都重新保存会话，建议false
    saveUninitialized: true // 是否自动保存未初始化的会话，建议false
}));

// 注册路由
app.use('/api', router);

// 监听端口号运行
app.listen(config.port, function() {
    console.log('vue-express-mongodb port is 3040 is running');
});



