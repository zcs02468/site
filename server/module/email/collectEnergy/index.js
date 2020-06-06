
const {EmailAuth, EmailService, EmailFrom, EmailToArr, EmailSubject} = require('../../../config')
const nodemailer = require("nodemailer"); //发送邮件的node插件
let transporter = nodemailer.createTransport({
    service: EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: EmailAuth,
    pool: true
});

const collectEnergyMail = async function() {
    let mailOptions = {
        from: EmailFrom, // 发送者昵称和地址
        to: EmailToArr[0].to, // 接收者的邮箱地址
        subject: "收取能量", // 邮件主题
        // text: "test mail" //邮件的text
        html: "收取能量1"  //也可以用html发送
    };
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("邮件发送成功 ID：", info.messageId);
    });
};

module.exports = collectEnergyMail;