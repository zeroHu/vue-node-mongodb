const SchemaModules = require('../schemas');
const mongoose = require('mongoose');

// 用户
const Users = mongoose.model('users', SchemaModules.UesrSchema);
// 评论话题表
const CommentTitle = mongoose.model('commenttitles', SchemaModules.CommentTitleSchema);
// 评论详情表
const UserComment = mongoose.model('commentcontents', SchemaModules.UserCommentSchema);

// 导出
exports = module.exports = {
    Users: Users,
    CommentTitle: CommentTitle,
    UserComment: UserComment
}
