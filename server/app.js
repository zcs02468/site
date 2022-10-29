// require("env2")("./.env"); // 环境变量
// let dotenv =  require('dotenv');
// dotenv.config('./env');
// console.log('NODE_ENV',process.env.NODE_ENV);


const Koa = require('koa')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const path = require('path')
const cors = require('koa2-cors')
const static = require('koa-static')

const index = require('./routes/index')
const { check_token } = require('./utils/token')

const app = new Koa()

const TimeTask = require('./timedTask/index')
const log4js = require('./middlewares/logger');
log4js.use(app);

// const getBlogs = require("./module/blog/index")

// getBlogs()



const staticPath = './static'
// 定时任务
TimeTask()


onerror(app)


//跨域配置
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
// app.use(check_token)
app.use(json())
app.use(logger())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(static(
    path.join( __dirname,  staticPath)
  ))

module.exports = app