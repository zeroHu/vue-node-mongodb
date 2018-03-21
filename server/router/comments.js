const CommentTitle = require('../database/modules').CommentTitle;
const UserComment = require('../database/modules').UserComment;
const Rjson = require('../util/rejson');
const Util = require('../util/util');
const moment = require('moment');
// 添加评论话题接口
const addCommentTitle = (req, res) => {
    // 这里做 只有管理员有权限添加话题的操作
    if (req.session && req.session.level === 'root') {
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

// 更新评论话题接口
const updateCommentTitle = (req, res) => {
    if (req.session && req.session.level === 'root') {
        Util.UpdataDataBase(req.body.id, {
            "ctitle": req.body.title,
            "createUser": { userId: req.session.userId, userName: req.session.name }
        }, CommentTitle).then(findData => {
            if (findData) {
                res.json(Rjson.right([], '更新成功'));
            } else {
                res.json(Rjson.error('更新话题失败'));
            }
        });
    } else {
        res.json(Rjson.error('sorry~, 只有管理员才有更新话题的权限'));
    }
}

// 删除评论标题接口
const deleteCommentTitle = (req, res) => {
    Util.DeletDataBase(req.body.id, CommentTitle).then(findData => {
        if (findData) {
            res.json(Rjson.right([], '删除话题成功'));
        } else {
            res.json(Rjson.error('删除话题失败'));
        }
    });
}


// 添加评论话题
const addUserComment = (req, res) => {
    if (req.session && req.session.name) {
        if (req.body.content && req.body.titleid && req.body.titlename) {
            let userCommentData = new UserComment({
                content: req.body.content,
                commentTitle: { titleId: req.body.titleid, content: req.body.titlename },
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
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
}
// 分页展示话题的所有评论
const pageShowUserComment = (req, res) => {
    Util.EachQueryDataBase({ "commentTitle.titleId":  req.query.titleid }, req.query.pageSize || 10, req.query.pageSize * (req.query.currentPage - 1)  || 0, UserComment).then(findData => {
        if (findData) {
            res.json(Rjson.right(findData));
        } else {
            res.json(Rjson.error('sorry~ 没有搜索到数据'));
        }
    });
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
    pageShowUserComment: pageShowUserComment,
    updateCommentTitle: updateCommentTitle,
    deleteCommentTitle: deleteCommentTitle
}