const Foods = require('../database/modules').Foods;
const Rjson = require('../util/rejson');
const Util = require('../util/util');
const Config = require('../util/qiniuConfig.js');
const moment = require('moment');
const qiniu = require("qiniu");

let nowtime = moment().format('YYYY-MM-DD HH:mm:ss');

// 获取七牛token 上传服务器
const getToken = (req, res) => {
    // 配置
    let options = {
        scope: Config.Bucket,
        deleteAfterDays: 7,
        returnBody:
        '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    let mac = new qiniu.auth.digest.Mac(Config.AccessKey, Config.SecretKey);
    // policy
    let putPolicy = new qiniu.rs.PutPolicy(options);
    // token
    var token = putPolicy.uploadToken(mac);
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.json(Rjson.right({
          uptoken: token,
          domain: Config.Domain
        }, '获取token成功'));
    } else {
        res.json(Rjson.error());
    }
}

// 上传图片到七牛
const uploadFood = (req, res) => {
    // 存储用户信息
    let FoodsData = new Foods({
        fTitle: req.body.ftitle,
        fDesc: req.body.fdesc,
        fShareImg: req.body.shareimg || '',
        time: nowtime,
        createUser: { userId: req.session.userId, userName: req.session.name }
    });
    FoodsData.save(function(err, doc) {
        if (err) {
            res.json(Rjson.error());
            return;
        }
        res.json(Rjson.right([], '上传食谱成功'));
    });
}

exports = module.exports = {
    getToken: getToken,
    uploadFood: uploadFood
}