
const { check_token_code, create_token } = require('../utils/token')
const User = require('../db').User
const sha1 = require('sha1')
const xss = require('xss')

module.exports = {
    // TODO: 用户登录
    /**
     * @param {*} ctx 
     * @param {*} next 
     */
    async login (ctx, next) {
        let { user_id = '', user_pwd = '', code = '', code_token = '' } = ctx.request.body
        try {
            if( user_id.length < 4 || user_id.length > 10 ) {
                ctx.body = {
                    code: 401,
                    msg: '注册失败,用户名长度为2到8个字符!'
                }
                return
            }
            let mark = await check_token_code({ token: code_token, code })
            if( !mark ) {
                ctx.body = {
                    code: 401,
                    msg: '登录失败，验证码错误!'
                }
                return
            }
            // user_pwd = sha1(sha1(user_pwd + PWD_ENCODE_STR))
            let res = await User.find({ user_id, user_pwd })
            if (res.length === 0) {
                ctx.body = {
                    code: 401,
                    msg: '登录失败，用户名或者密码错误!'
                }
                return
            }
            let token = create_token(user_id)
            res[0].token = token
            res[0].save()
            ctx.body = {
                code: 200,
                msg: '登录成功!',
                data: {
                    _id: res[0]._id,
                    user_name: res[0].user_name,
                    token
                }
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                code: 500,
                msg: '登录失败，服务器异常!'
            }
        }
    },
    async register (ctx, next) {
        // user_name -- 昵称  user_id---用户名  user_pwd---用户密码   re_user_pwd---确认密码  code--验证码
        let { user_name = '', user_id = '', user_pwd = '', re_user_pwd = '', code = '', code_token = '' } = ctx.request.body
        try {
            if( user_name.length < 2 || user_name.length > 8 ) {
                ctx.body = {
                    code: 401,
                    msg: '注册失败,昵称长度为2到8个字符!'
                }
                return
            }
            if( user_id.length < 4 || user_id.length > 10 ) {
                ctx.body = {
                    code: 401,
                    msg: '注册失败,用户名长度为2到8个字符!'
                }
                return
            }
            if( user_pwd !== re_user_pwd ) {
                ctx.body = {
                    code: 401,
                    msg: '注册失败,2次密码不一致!'
                }
                return
            }
            //验证码判断
            let mark = await check_token_code({ token: code_token, code })
            if( !mark ) {
                ctx.body = {
                    code: 401,
                    msg: '注册失败,验证码错误!'
                }
                return
            }
            //判断用户名是否重复
            let res = await User.find({user_id})
            if( res.length !== 0 ) {
                ctx.body = {
                    code: 409,
                    msg: '注册失败，该用户名已存在，换一个吧！'
                }
                return
            }
            // user_pwd = sha1(sha1(user_pwd + PWD_ENCODE_STR))
            // 防止xss攻击， 转义
            user_name = xss(user_name)
            //存储用户信息
            let user = new User({ user_id, user_name, user_pwd })
            res = await user.save()
            if( res._id != null ) {
                ctx.body = {
                    code: 200,
                    msg:'注册成功!',
                }
            }else {
                ctx.body = {
                    code: 500,
                    msg: '注册失败，服务器异常!'
                }
            }
        } catch (error) {
            console.error( 'error', error );
            
            ctx.body = {
                code: 500,
                msg: '注册失败，服务器异常1！'
            }
        }
    }
}
