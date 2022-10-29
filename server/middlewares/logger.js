const log4js = require('log4js')
const path = require('path')

const levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}

// 普通日志路径
const access_file = 'logs/access.log'
// 错误日志路径
const error_file = 'logs/error.log'

const getPath = function (dirName) {
  return path.resolve(__dirname, `../${dirName}`)
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    everything: {
      type: 'dateFile',
      pattern: 'yyyy-MM-dd',
      filename: getPath(access_file),
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: false
    },
    emergencies: {
      type: 'dateFile',
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      filename: getPath(error_file),
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: false
    },
    info: { type: 'logLevelFilter', appender: 'everything', level: 'info', maxLevel: 'warn' },
    errors: { type: 'logLevelFilter', appender: 'emergencies', level: 'error', maxLevel: 'fatal' }
  },
  categories: {
    default: { appenders: ['errors', 'info', 'console'], level: 'debug' }
  }
})

exports.logger = (name, level) => {
  const logger = log4js.getLogger(name)
  // 默认为debug权限及以上
  logger.level = levels[level] || levels['debug']
  return logger
}

exports.use = (app, level, name) => {
  //加载中间件
  app.use(log4js.connectLogger(log4js.getLogger(name || 'logInfo'), {
      level: levels[level] || levels['debug'],
      //格式化http相关信息
      format: ':method :url :status'
  }));
}