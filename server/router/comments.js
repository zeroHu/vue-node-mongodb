const CommentTitle = require('../database/modules').CommentTitle;
const UserComment = require('../database/modules').UserComment;
const Rjson = require('../util/rejson');
const Util = require('../util/util');

// 添加评论话题接口
const addCommentTitle = (req, res) => {
    // 这里做 只有管理员有权限添加话题的操作
    if (req.session && req.session.name === 'zero') {
        Util.QueryDataBase({ name:  req.query.ctitle }, CommentTitle).then(findData => {
            if (findData && findData.length > 0) {
                res.json(Rjson.error('这个话题已经存在罗~'));
            } else {
                // 存储用户信息
                let commentTitleData = new CommentTitle({
                    ctitle: req.query.ctitle,
                    createUser: { userId: req.session.userId, userName: req.session.name }
                });
                commentTitleData.save(function(err, doc) {
                    if (err) {
                        res.json(Rjson.error());
                        return;
                    }
                    res.json(Rjson.right([], '添加话题成功'));
                });
            }
        });
    } else {
        res.json(Rjson.error('sorry, 只有管理员才有添加话题的权限哦~'));
    }
}
// 展示评论话题接口
const showCommentTitle = (req, res) => {
    Util.QueryDataBase({}, CommentTitle).then(findData => {
        if (findData && findData.length > 0) {
            res.json(Rjson.right(findData));
        } else {
            res.json(Rjson.error());
        }
    });
}

// 添加评论话题
const addUserComment = (req, res) => {
    if (req.session && req.session.name) {
        let userCommentData = new UserComment({
            content: req.body.content,
            commentTitle: { titleId: req.body.titleid, content: req.body.titlename },
            createUser: { userId: req.session.userId, userName: req.session.name }
        });
        userCommentData.save((err, doc) => {
            if (err) {
                res.json(Rjson.error());
                return;
            }
            res.json(Rjson.right([], '添加评论成功'))
        })
    }
}

// 展示话题的所有的评论
const showUserComment = (req, res) => {
    Util.QueryDataBase({ "commentTitle.titleId":  req.query.titleid }, UserComment).then(findData => {
        if (findData && findData.length > 0) {
            res.json(Rjson.right(findData));
        } else {
            res.json(Rjson.error('sorry~ 没有搜索到数据'));
        }
    });
}


exports = module.exports = {
    addCommentTitle: addCommentTitle,
    showCommentTitle: showCommentTitle,
    addUserComment: addUserComment,
    showUserComment: showUserComment,
}