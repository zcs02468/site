const nodemailer = require("nodemailer"); //发送邮件的node插件
const FutureEmail = require('../../../db').FutureEmail

const getHtmlData = require("./getHtml");
const {formatTime} = require("../../../utils/formatDate");
const {EmailAuth, EmailService, EmailFrom} = require('../../../config')

const temlFn = require("./template")

let transporter = nodemailer.createTransport({
    service: EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: EmailAuth,
    pool: true
});

const getEmailData = async() => {
    const nowDate = formatTime()
    let targetTime = `${nowDate.Y}-${nowDate.M}-${nowDate.D}`
    let data = await FutureEmail.find({"fromTime":targetTime});
    return data;
}

const send = async(item) => {
    let targetDate = formatTime( new Date( Number( item.createTime ) ) )
    let allData = {
        timeData:{
            date: `${targetDate.Y}-${targetDate.M}-${targetDate.D}`,
            time: `${targetDate.h}-${targetDate.m}-${targetDate.s}`
        },
        // content: JSON.parse(item.rawContent).blocks
        content: item.htmlContent
    }
    let htmlData = temlFn(allData)
    // let htmlData = await getHtmlData(allData);
    let mailOptions = {
        from: EmailFrom, // 发送者昵称和地址
        to: item.toEmail, // 接收者的邮箱地址
        subject: "来自很久以前的一封信", // 邮件主题
        html: htmlData  //也可以用html发送
    };
     //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        htmlData = ''
        console.log("邮件发送成功 ID：", info.messageId);
    });
}


const sendEmail = async()=> {

    const data = await getEmailData()
    
    data.forEach(item => {
        send( item )
    });
};
module.exports = sendEmail;
