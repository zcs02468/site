const {MongoDbUser, MongoDbPwd, NODE_ENV} = require('../config')
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

if( NODE_ENV === 'dev' ) {
    mongoose.connect(`mongodb://localhost:27017/itc`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connection success!");
        }
    });
}else {
    mongoose.connect(`mongodb://${MongoDbUser}:${MongoDbPwd}@localhost:27017/itc`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connection success!");
        }
    });
}
const Schema = mongoose.Schema;

// 验证码
let checkcodeSchema = new Schema({
    token: String,
    code: String
});

// 用户
let userSchema = new Schema({
    user_name: String,
    user_id: String,
    user_pwd: String,
    token: {
        type: String,
        default: ""
    }
});

let recordSchema = new Schema({
    title: String,
    type: String,
    detail: String,
    create_time: {
        type: String,
        default: Date.now
    },
    img: Array,
    view: 0,
    creater: String,
    avatar: String,
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

let quoteSchema = new Schema({
    content: String,
    quoteImgUrl: String,
    type: String,
    //创建时间./mongod  -dbpath /data/db/
    create_time: {
        type: String,
        default: Date.now
    },
})

let emailSchema = new Schema({
    toEmail: String,        //收信 email 地址
    fromTime: String,       //发送时间
    open: Boolean,          //是否放入公开信箱
    rawContent: String,     //数据内容
    htmlContent: String,    //html内容
    status: {
        type:Number,
        default: 0
    },         //邮件状态  0 未发送  1 发送成功 2发送失败
    like: {
        type: Number,
        default: 0
    },           //点赞数量
    createTime:{
        type: String,
        default: Date.now
    }
})

let blogSchema = new Schema({
    title: String,          //标题
    rawContent: String,     //详情页数据
    htmlContent: String,    //详情页内容
    introduce: String,      //介绍
    coverPhoto: String,     //封面图片
    views: {
        type: Number,
        default: 0
    },          //浏览量
    comments: Object,
    //博客状态:  0--未发布  1---发布
    status: {
        type: Number,
        default: 0
    },
    createTime:{
        type: String,
        default: Date.now
    }
})

exports.CheckCode = mongoose.model("Checkcode", checkcodeSchema);
exports.User = mongoose.model("User", userSchema);
exports.Record = mongoose.model("Record", recordSchema);
exports.Quote = mongoose.model("Quote", quoteSchema);
exports.Email = mongoose.model("Email", emailSchema);
exports.Blog = mongoose.model("Blog", blogSchema);
// exports.FutureEmail = mongoose.model("FutureEmail", futureEmailSchema);

