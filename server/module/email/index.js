//vrckkvikbnxwbicc
const nodemailer = require("nodemailer"); //发送邮件的node插件
const Quote = require('../../db').Quote
const getWeatherData = require('./getWeatherData');
const getHtmlData = require("../email/getHtmlData");
const formatDate = require("../../utils/formatDate");
const {EmailAuth, EmailService, EmailFrom, EmailToArr, EmailSubject} = require('../../config')
// const aa = require('../../config/index')

let transporter = nodemailer.createTransport({
    service: EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: EmailAuth,
    pool: true
});

const getOneData = async() => {
    let res = await Quote.find({}).sort('-date');
    let data = res[res.length-1]
    return {
        one: {
            content: data.content,
            quoteImgUrl: data.quoteImgUrl,
            type: data.type
        }
    }
}

const getToEmail = async() => {
    
}

const getAllData = async() => {
    let oneData = await getOneData();
    let weatherData = await getWeatherData();
    const allData = { today: formatDate(), ...oneData, ...weatherData }
    return allData;
}

const sendMail = async function() {
    let allData = await getAllData()
    let htmlData = await getHtmlData(allData);

    let mailOptions = {
        from: EmailFrom, // 发送者昵称和地址
        to: EmailToArr[0].to, // 接收者的邮箱地址
        subject: EmailSubject, // 邮件主题
        // text: "test mail" //邮件的text
        html: htmlData  //也可以用html发送
    };
    
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("邮件发送成功 ID：", info.messageId);
    });
};

module.exports = sendMail;
