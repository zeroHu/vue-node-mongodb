const Users = require('../database/modules').Users;
const Rjson = require('../util/rejson');
const Util = require('../util/util');

// 查询用户接口函数
const index = (req, res) => {
    Util.QueryDataBase({}, Users).then(findData => {
        if (findData && findData.length > 0) {
            res.json(Rjson.right(findData));
        } else {
            res.json(Rjson.error());
        }
    });
}

// 用户注册接口函数
const adduser = (req, res) => {
    Util.QueryDataBase({ name: req.body.name }, Users).then(findData => {
        if (findData && findData.length > 0) {
            res.json(Rjson.error('这个网名已经有人使用了，请换一个~'));
        } else {
            // 存储用户信息
            let userdata = new Users({
                name: req.body.name,
                password: req.body.password
            });
            userdata.save(function(err, doc) {
                if (err) {
                    res.json(Rjson.error());
                    return;
                }
                res.json(Rjson.right([], '注册成功'));
            });
        }
    });
}
// 获取用户信息
const userInfo = (req, res) => {
    if (req.session && req.session.name) {
        res.json(Rjson.right({ name: req.session.name }, '登录成功'))
    } else {
        res.json(Rjson.error('您还未登录'))
    }
}

// 用户登录接口函数
const login = (req, res) => {
    Util.QueryDataBase({ name: req.body.name, password: req.body.password }, Users).then(findData => {
        // 查询是否正确
        if (findData && findData.length > 0) {
            req.session.regenerate(function(err) {
                if (err) {
                    res.json(Rjson.error('登录失败'));
                } else {
                    req.session.userId = findData[0]._id;
                    req.session.name = findData[0].name;
                    res.json(Rjson.right([], '登录成功'));
                }
            })
        } else {
            res.json(Rjson.error('登录名或密码不正确'));
        }
    });
}

const clearLogin = (req, res) => {
    res.clearCookie('connect.sid');
    req.session.userId = null;
    req.session.name = null;
    req.session.regenerate(function() {
        //重新生成session之后后续的处理
        res.json(Rjson.right([], '退出登录成功'));
    });
}

exports = module.exports = {
    index: index,
    addUser: adduser,
    login: login,
    userInfo: userInfo,
    clearLogin: clearLogin
}