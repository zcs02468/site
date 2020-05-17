const Blog = require('../db').Blog
const xss = require('xss')


module.exports = {
    //保存博客数据
    async saveBlog(ctx, next) {
        let { id ='', title= '', rawContent = '', htmlContent= ''} = ctx.request.body
        try {
            if( id == '' ) {
                //存储用户信息
                let blog = new Blog({ title, rawContent, htmlContent})
                res = await blog.save()
                ctx.body = {
                    code: 200,
                    msg: '保存成功',
                    data: res._id
                }
            }else {
                Blog.findOneAndUpdate(id,{title:title,rawContent:rawContent,htmlContent:htmlContent},{multi: false})
                ctx.body = {
                    code: 200,
                    msg: '更新成功',
                    data: ''
                }
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '保存失败！'
            }
        }
    },

    //获取指定博客数据
    async getPointBlog(ctx, next) {
        let { id = '' } = ctx.request.query
        try {
            let res = await Blog.findById(id,{ rawContent: 0 ,"__v": 0});
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '查询失败！'
            }
        }
    },

    //分页查询博客
    async getBlogList(ctx, next) {
        let { page= 1, pageSize= 10 } = ctx.request.query
        page = Number(page - 1)
        pageSize = Number(pageSize)
        try {
            let res = await Blog.find({}).skip(page * pageSize).limit(pageSize).sort({createTime: -1});
            let count = await Blog.count({});
            ctx.body = {
                code: 200,
                msg: '保存成功',
                data: {
                    list: res,
                    count: count
                }
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '保存失败！'
            }
        }
    }
};
