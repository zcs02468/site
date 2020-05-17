const Quote = require('../db').Quote

module.exports = {
    async getQuote(ctx, next) {
        try {
            let res = await Quote.find({}).sort('-date');
            let data = res[res.length-1].content
            ctx.body = {
                code: 200,
                msg: '获取每日一句成功！',
                data: data
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '获取每日一句失败！'
            }
        }
    }
};


