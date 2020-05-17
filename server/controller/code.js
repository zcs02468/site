const CheckCode = require('../db').CheckCode
const BMP24 = require('gd-bmp').BMP24
const { create_token } = require('../utils/token')
const svgCaptcha = require('svg-captcha')

module.exports = {
    async getCode(ctx, next) {
        try {
            let { img, code } = getAuthCode()
            let token = create_token(code);
            await new CheckCode({ token, code }).save()
            ctx.body = {
                code: 200,
                msg: '获取验证码成功！',
                data: {
                    token,
                    img: img,
                    // img: "data:image/bmp;base64," + img.getFileData().toString('base64'),
                }
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '获取验证码失败！'
            }
        }
    }
};

function getAuthCode() {
    const cap = svgCaptcha.createMathExpr({
        size: 4, // 验证码长度
        width:100,
        height:38,
        fontSize: 40,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee' // 验证码图片背景颜色
    })
    return {
        img: cap.data,// 验证码
        code: cap.text.toLowerCase()// 验证码字符，忽略大小写
    }
}


// 仿PHP的rand函数
function rand(min, max) {
    return (Math.random() * (max - min + 1) + min) | 0; // 特殊的技巧，|0可以强制转换为整数
}
// 制造验证码图片
function makeCapcha() {
    let img = new BMP24(100, 38);
    img.drawCircle(rand(0, 100), rand(0, 38), rand(10, 38), rand(0, 0xffffff));
    // 边框
    img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
    img.fillRect(0, 0, 100, 38, 0xffffff);
    // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
    img.drawLine(rand(0, 100), rand(0, 38), rand(0, 100), rand(0, 38), rand(0, 0xffffff));
    // return img;

    // 画曲线
    let w = img.w / 2;
    let h = img.h;
    let color = rand(0, 0xffffff);
    let y1 = rand(-5, 5); // Y轴位置调整
    let w2 = rand(10, 15); // 数值越小频率越高
    let h3 = rand(4, 6); // 数值越小幅度越大
    let bl = rand(1, 5);
    for (let i = -w; i < w; i += 0.1) {
        let y = Math.floor((h / h3) * Math.sin(i / w2) + h / 2 + y1);
        let x = Math.floor(i + w);
        for (let j = 0; j < bl; j++) {
            img.drawPoint(x, y + j, color);
        }
    }

    let p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
    let str = "";
    for (let i = 0; i < 4; i++) {
        str += p.charAt((Math.random() * p.length) | 0);
    }

    let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    let x = 15;
    let y = 8;
    for (let i = 0; i < str.length; i++) {
        let f = fonts[(Math.random() * fonts.length) | 0];
        y = 8 + rand(-10, 10);
        img.drawChar(str[i], x, y, f, rand(0, 0xffffff));
        x += f.w + rand(2, 8);
    }
    return { code: str, img };
}
