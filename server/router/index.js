const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
const router = express.Router();
const app = express();

// 引入文件
const users = require('./users');
const comments = require('./comments');

// 连接数据库
mongoose.connect('mongodb://localhost/vueexpress');

// 连接数据库报错
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// 数据库连接成功提示
mongoose.connection.once('open', function () {
    console.log('========mongodb is connect success========');
});

// 登录相关
router.get('/users', users.index);
router.post('/regist', users.addUser);
router.post('/login', users.login);
router.get('/userInfo', users.userInfo);
router.get('/clearLogin', users.clearLogin);

// 评论相关
router.get('/addcotit', comments.addCommentTitle);
router.get('/showcotit', comments.showCommentTitle);
router.post('/addcomment', comments.addUserComment);
router.get('/showcomment', comments.showUserComment);
// 导出router
exports = module.exports = router;


