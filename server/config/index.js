require('dotenv').config('../env')
const { EmianService, EamilAuth_user, EamilAuth_pass, NODE_ENV, MongoDbUser, MongoDbPwd } =  process.env
module.exports = {
    EmailService: EmianService, //发送者邮箱厂家
    EmailAuth: {
        //发送者邮箱账户SMTP授权码
        user: EamilAuth_user,
        pass: EamilAuth_pass
    },
    EmailFrom: '"zcs" <zcs@zcssite.com>', //发送者昵称与邮箱地址
    EmailSubject: "每日一报", //邮件主题
    /**
     * @description: 收信人详细
     */
    EmailToArr: [
        {
            to: "466971601@qq.com",
        }
    ],
    MongoDbUser: MongoDbUser,
    MongoDbPwd: MongoDbPwd,
    NODE_ENV: NODE_ENV
};
