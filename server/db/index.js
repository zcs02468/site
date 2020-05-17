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
    fromName:String, //发送者名称
    toEmail: String, //接收者邮箱地址
    subject: String, //邮件主题
    fromTime: String, //邮件发送时间
    fromFrequency: String,
    createTime:{
        type: String,
        default: Date.now
    }
})

let blogSchema = new Schema({
    title: String,
    rawContent: String,
    htmlContent: String,
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
