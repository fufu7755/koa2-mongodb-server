// Description: 入口文件
const Koa = require('koa')
const session = require('koa-session')
const Router = require('koa-router')
const config = require('./config/config')
const { connect, initSchemas, initUser } = require('./app/database/init')

// 执行函数
;(async () => {
  // 数据库连接
  await connect(config.db)
  // 数据库初始化
  initSchemas()
  // 初始化用户
  await initUser()

  let app = new Koa()
  app.proxy = true
  const router = new Router()
  
  // session
  app.keys = ['ai']
  app.use(session(app))
  
  // 路由
  require('./config/routes')(router)

  // 路由中间件
  app.use(router.routes()).use(router.allowedMethods())

  // 监听端口
  app.listen(config.port)
  console.log('Listen: ' + config.port)
})()
