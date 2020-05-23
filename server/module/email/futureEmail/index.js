const { EmailAuth, EmailService, EmailFrom } = require("../../../config");
const nodemailer = require("nodemailer"); //发送邮件的node插件
const temlFn = require("./template");
const { editorTimingEmailStatus, getTargetDateEmail } = require("../../../controller/email");
const { formatTime } = require("../../../utils/formatDate");

let transporter = nodemailer.createTransport({
    service: EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: EmailAuth,
    pool: true,
});

const getEmailData = async () => {
    const nowDate = formatTime();
    let targetTime = `${nowDate.Y}-${nowDate.M}-${nowDate.D}`;
    let data = await getTargetDateEmail(targetTime);
    return data;
};

const send = async (item) => {
    let targetDate = formatTime(new Date(Number(item.createTime)));
    let allData = {
        timeData: {
            date: `${targetDate.Y}-${targetDate.M}-${targetDate.D}`,
            time: `${targetDate.h}-${targetDate.m}-${targetDate.s}`,
        },
        content: item.htmlContent,
    };
    let htmlData = temlFn(allData);
    let mailOptions = {
        from: EmailFrom, // 发送者昵称和地址
        to: item.toEmail, // 接收者的邮箱地址
        subject: "来自很久以前的一封信", // 邮件主题
        html: htmlData, //也可以用html发送
    };
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            editorTimingEmailStatus(2);
            return console.log(error);
        }
        htmlData = "";
        editorTimingEmailStatus(1);
        console.log("邮件发送成功 ID：", info.messageId);
    });
};

const sendEmail = async () => {
    const data = await getEmailData();
    data.forEach((item) => {
        send(item);
    });
};
module.exports = sendEmail;
