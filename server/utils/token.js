const { TOKEN_ENCODE_STR, URL_YES_PASS } = require('./config')
const CheckCode = require("../db").CheckCode;
const jwt = require('jsonwebtoken')

module.exports = {
    //生成 token
    create_token(str) {
        return jwt.sign({ str }, TOKEN_ENCODE_STR, { expiresIn: "1h" });
    },
    // 判断验证码
    async check_token_code({ token, code }) {
        try {
            // 验证码转大写
            code = code.toUpperCase();
            let { str = '' } = await  jwt.verify(token, TOKEN_ENCODE_STR);
            console.log( str, '111111' );
            
            // 读数据库，删除验证码
            let res = await CheckCode.findOneAndDelete({ token, code });
            if (res == null) {
                return false;
            }
        } catch (e) {
            return false;
        }
        return true;
    },
    //验证登录 token 是否正确   写成中间件   get请求和设置的请求不拦截验证  其余需要拦截
    async check_token(ctx, next) {
        let url = ctx.url
        if( ctx.method !== 'GET' && !URL_YES_PASS.includes(url) ) {
            let token = ctx.get('Authorization')
            if( token === '' ) {
                ctx.status = 401
                ctx.body = '您还没有登录,快去登录吧!'
                return
            }
            //验证 token 是否过期
            try {
                //解析 token 获取用户名
                let { str = '' } = await jwt.verify( token, TOKEN_ENCODE_STR )
                let res = await User.find({ user_id: str, token })
                if( res.length === 0 ) {
                    ctx.status = 401
                    ctx.body = '登录过期,请重新登录!'
                    return
                }
                // 保存用户的_id，便于操作
                ctx._id = res[0]._id
                ctx.name = res[0].user_name
                // ctx.avatar = res[0].avatar
            } catch (error) {
                ctx.status = 401
                ctx.body = '登录已过期,请重新登录!'
                return
            }
        }
        await next()
    }
};
