const request = require("request");
const Visitors = require('../../db').Visitors

function getClientIP(req) {
    return (
        req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
        req.headers["x-real-ip"] ||
        ""
    );
}

module.exports = {
    //添加访客数据
    async addUserVisitorsLog(ctx, next) {
        let ip = getClientIP(ctx.request);
        let { browserInfo = "", detectOS = "", screenResolution = "", digits = "", language = "" } = ctx.request.body;
        if( ctx.cookies.get('site_visitor') ) {
        }else {
            ctx.cookies.set('site_visitor', 'hello', {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                // maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
                // maxAge: 2 * 60 * 1000, // cookie有效时长
                // expires: new Date('2018-02-08'), // cookie失效时间
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            })
            request(`https://apis.map.qq.com/ws/location/v1/ip?ip=${ ip }&key=SHCBZ-7BMA6-AMZS2-ELQJO-IOM22-YXBSB`,async function (err, res, body) {
                let location;
                if( !err && res.statusCode == 200 && body.status == 0 ) {
                    let result = body.result
                    location = {
                        lat: result.location.lat,
                        lng: result.location.lng,
                        nation: result.ad_info.nation,
                        province: result.ad_info.province,
                        city: result.ad_info.city,
                    }
                }else {
                    console.error('err:'+body);
                }
                let data = new Visitors({ ip, browserInfo, detectOS, screenResolution, digits, language, location });
                res = await data.save()
            })
        }
        ctx.body = {
            code: 200,
            msg: "保存成功",
            data: "",
        };
    },
};
