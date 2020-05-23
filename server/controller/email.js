const Email = require('../db').Email
// const FutureEmail = require('../db').FutureEmail
// const xss = require('xss')


module.exports = {

    async getEmailList(ctx, next) {
        let { page= 1, pageSize= 10 } = ctx.request.query
        page = Number(page - 1)
        pageSize = Number(pageSize)
        try {
            let res = await Email.find({}).skip(page * pageSize).limit(pageSize).sort({createTime: -1});
            let count = await Email.count({});
            ctx.body = {
                code: 200,
                msg: '保存成功',
                data: {
                    list: res,
                    count: count
                }
            }
        } catch (error) {
            console.error( 'error', error );
            ctx.body = {
                code: 500,
                msg: '保存失败！'
            }
        }
    },

    async createTimingEmail(ctx, next) {
        let { toEmail= '', fromTime= '', open = false,  rawContent= '', htmlContent = '' } = ctx.request.body
        try {
            //存储邮件信息
            let futureEmail = new Email({ toEmail, fromTime, open, rawContent, htmlContent })
            res = await futureEmail.save()
            ctx.body = {
                code: 200,
                msg: '创建完成',
                data: ''
            }
        } catch (error) {
            console.error( 'error', error );
            ctx.body = {
                code: 500,
                msg: '创建失败！'
            }
        }
    },


    //内部调用
    async getTargetDateEmail(targetTime) {
        try {
            let data = await FutureEmail.find({ fromTime: targetTime });
            return data
        } catch (error) {
            console.error("查询失败", error)  
            return []          
        }
    },

    async editorTimingEmailStatus(status) {
        let futureEmail = new Email({ status: status })
        await futureEmail.save()
    },
};
