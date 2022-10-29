// index.js

"use strict";

// Nodemailer是一个简单易用的Node.js邮件发送组件
const nodeMailer = require("nodemailer");
// 易用、简洁且高效的http库
const axios = require("axios");
const logger = require('../../middlewares/logger').logger('juejin.js', 'info');

const {EmailAuth, EmailService, EmailPort, EmailFrom, EmailToArr} = require('../../config/index')

// 请求签到、抽奖的接口
const checkInApi = "https://api.juejin.cn/growth_api/v1/check_in";
const drawApi = "https://api.juejin.cn/growth_api/v1/lottery/draw";
const luckyApi = "https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky";
// 请求接口的cookie配置 cookie的获取见下面的图片说明
const headers = {
  Referer: "https://juejin.cn/",
  "Upgrade-Insecure-Requests": 1,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
  cookie: `_ga=GA1.2.554120579.1636025951; MONITOR_WEB_ID=023ad0a1-c1e8-4a60-a8ac-a73eb39011ca; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227026677936595256836%2522%252C%2522web_id%2522%253A%25227026677936595256836%2522%252C%2522timestamp%2522%253A1641806276010%257D; passport_csrf_token=cbaf52bceb37d270e3e27d30cc9e26c9; passport_csrf_token_default=cbaf52bceb37d270e3e27d30cc9e26c9; n_mh=zOxajXQVIXMDeXwfz5JxKfooyOM1jQSmoVUtCBrqcig; passport_auth_status=ab475b6dcc425bd87600cce170526f73%2C; passport_auth_status_ss=ab475b6dcc425bd87600cce170526f73%2C; sid_guard=37b178417f9238af4d2a03b7b42fdca0%7C1654485430%7C31536000%7CTue%2C+06-Jun-2023+03%3A17%3A10+GMT; uid_tt=74dbceb70e6655cbfa13611a2f980dcb; uid_tt_ss=74dbceb70e6655cbfa13611a2f980dcb; sid_tt=37b178417f9238af4d2a03b7b42fdca0; sessionid=37b178417f9238af4d2a03b7b42fdca0; sessionid_ss=37b178417f9238af4d2a03b7b42fdca0; sid_ucp_v1=1.0.0-KGIzZmY5YmNiOWJjY2RmMDI5MzU0NzdkZjIzNTE0ODUzOTA2ZTQxNmUKFwi-ybC__fXRAxC24_WUBhiwFDgCQPEHGgJsZiIgMzdiMTc4NDE3ZjkyMzhhZjRkMmEwM2I3YjQyZmRjYTA; ssid_ucp_v1=1.0.0-KGIzZmY5YmNiOWJjY2RmMDI5MzU0NzdkZjIzNTE0ODUzOTA2ZTQxNmUKFwi-ybC__fXRAxC24_WUBhiwFDgCQPEHGgJsZiIgMzdiMTc4NDE3ZjkyMzhhZjRkMmEwM2I3YjQyZmRjYTA; _gid=GA1.2.587627732.1655687403; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}`
}


//邮件信息
function  getEmailOptions(subject, html) {
  return {
    from: EmailFrom, // 发送者昵称和地址
    to: EmailToArr[0].to, // 接收者的邮箱地址
    subject: subject, // 邮件主题
    // text: "test mail" //邮件的text
    html: html, //也可以用html发送
  };

}

//邮件服务
const transporter = nodeMailer.createTransport({
  service:  EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
  port: EmailPort, // SMTP 端口
  secureConnection: true, // SSL安全链接
  auth: EmailAuth,
  pool: true,
});

// 请求签到接口
const checkIn = async () => {
  let { data } = await axios({ url: checkInApi, method: "post", headers });
  return data;
};

// 请求抽奖接口
const draw = async () => {
  let { data } = await axios({ url: drawApi, method: "post", headers });
  return data;
};

//沾喜气接口 https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=2608&uuid=7026677936595256836
const withLucky = async () => {
  let { data } = await axios({
    url: luckyApi,
    method: "post",
    headers,
    params: {
      aid: 2608,
      uuid: "7026677936595256836",
    },
  });
  return data;
};


const sendMail = async function (subject, html) {
  const emailOptions = getEmailOptions(subject, html)

  //发送邮件
  await transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    logger.info("邮件发送成功 ID：", info.messageId)
  });
};

// 触发签到和抽奖的方法
const signIn = async () => {
  const withLuckyData = await withLucky();
  const checkInData = await checkIn();
  const drawData = await draw();

  let subject = "";
  let htmlStr = "";
  //掘金签到
  if(checkInData.data) {
    subject += "掘金签到成功--";
    htmlStr += `掘金签到成功！今日获得${checkInData.data.incr_point}积分，当前总积分：${checkInData.data.sum_point}。`
    logger.info("掘金签到成功")
  }else {
    subject += "掘金签到失败--";
    htmlStr += `掘金签到失败！${JSON.stringify(checkInData)}。`
    logger.error("掘金签到失败")
  }
  //掘金抽奖
  if(drawData.data) {
    subject += "掘金抽奖成功--";
    htmlStr += `掘金免费抽奖成功, 获得：${drawData.data.lottery_name}。`
    logger.info("掘金抽奖成功")
  }else {
    subject += "掘金抽奖失败--";
    htmlStr += `掘金免费抽奖失败, ${JSON.stringify(drawData)}。`
    logger.error("掘金抽奖失败")
  }
  //沾喜气
  if (withLuckyData.data) {
    subject += ", 沾喜气成功";
    htmlStr += `获得幸运值${withLuckyData.data.dip_value}。`;
    logger.info("沾喜气成功")
  } else {
    subject += "沾喜气失败";
    htmlStr += `沾喜气${JSON.stringify(withLuckyData)}。`;
    logger.error("沾喜气失败")
  }
  await sendMail(subject, htmlStr);
};

module.exports = signIn