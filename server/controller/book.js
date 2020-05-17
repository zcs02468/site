const {searchBook, getBookDetail, getContent} = require('../module/book/index')

module.exports = {
    async search(ctx, next) {
        let { name = '' } = ctx.request.query;
        try {
            let data = await searchBook(name)
            ctx.body = {
                code: 200,
                msg: '搜索成功！',
                data: data
            }
        } catch (error) {
            console.error( 'error', error );
            
            ctx.body = {
                code: 500,
                msg: '搜索失败！'
            }
        }
    },
    async detail(ctx, next) {
        let { url = '' } = ctx.request.query;
        try {
            let data = await getBookDetail(url)
            ctx.body = {
                code: 200,
                msg: '查询成功！',
                data: data
            }
        } catch (error) {
            console.error( 'error', error );
            ctx.body = {
                code: 500,
                msg: '查询失败！'
            }
        }
    },
    async content(ctx, next) {
        let { url = '' } = ctx.request.query;
        try {
            let data = await getContent(url)
            ctx.body = {
                code: 200,
                msg: '查询成功！',
                data: data
            }
        } catch (error) {
            console.error( 'error', error );
            ctx.body = {
                code: 500,
                msg: '查询失败！'
            }
        }
    },
};