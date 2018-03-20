/**
    声明schemas
*/
const mongoose = require('mongoose');

// 用户表
let UesrSchema = new mongoose.Schema({
    name: String,
    password: String,
    level: String
});

// 评论话题表
let CommentTitleSchema = new mongoose.Schema({
    ctitle: String,
    createUser: { userId: String, userName: String },
    createTime: { type: Date, default: Date.now }
});

// 评论详情表
let UserCommentSchema = new mongoose.Schema({
    content: String,
    commentTitle: { titleId: String, content: String },
    createUser: { userId: String, userName: String },
    time: String,
    createTime: { type: Date, default: Date.now }
});

// 厨艺
let FoodSchema = new mongoose.Schema({
    fTitle: String,
    fDesc: String,
    fShareImg: String,
    step: Array,
    createUser: { userId: String, userName: String },
    time: String,
    createTime: { type: Date, default: Date.now }
});

// Schema 设置
UesrSchema.set('collection', 'users');
CommentTitleSchema.set('collection', 'commenttitles');
UserCommentSchema.set('collection', 'commentcontents');
FoodSchema.set('collection', 'foods');

// 导出所有的schemas
exports = module.exports = {
    UesrSchema: UesrSchema,
    CommentTitleSchema: CommentTitleSchema,
    UserCommentSchema: UserCommentSchema,
    FoodSchema: FoodSchema
}