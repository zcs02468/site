const router = require('koa-router')()
// const upload = require('../utils/upload')
const controller = require('../controller')



router.get('/', async (ctx, next) => {
  ctx.body = 'Hello world!'
})

router.get('/api/code/getCode', controller.code.getCode)// 验证码获取
router.post('/api/user/register', controller.user.register)// 注册
router.post('/api/user/login', controller.user.login)// 登陆
router.get('/api/user/getQuote', controller.quote.getQuote)// 登陆


//邮件管理
router.post('/api/email/createTimingEmail', controller.email.createTimingEmail)
router.get('/api/email/getEmailList', controller.email.getEmailList)

//书
router.get('/book/search', controller.book.search)// 登陆
router.get('/book/detail', controller.book.detail)// 书籍详情
router.get('/book/content', controller.book.content)// 书籍内容


//博客
router.get('/api/blog/getBlogList', controller.blog.getBlogList)
router.post("/api/blog/saveBlog", controller.blog.saveBlog)
router.get("/api/blog/getPointBlog", controller.blog.getPointBlog)



module.exports = router