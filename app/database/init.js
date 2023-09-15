const mongoose = require('mongoose')
const { resolve } = require('path')
const glob = require('glob')

// 使mongoose支持es6的promise
mongoose.Promise = global.Promise

// 初始化所有schema
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

// 初始化数据
exports.initUser = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    name: 'Fu'
  })

  if (!user) {
    const user = new User({
      name: 'Fu',
      email: 'fufu7755@gmail.com',
      avatarUrl: 'http://pic.china-op.cn/hq1y3xfm55ckr4lofxbtuxw98swd8ac2',
      password: '123456'
    })
    // 保存用户
    await user.save()
  }
}

// 连接数据库
exports.connect = (db) => {
  // 最大连接次数
  let maxConnectTimes = 0
  // 连接数据库
  return new Promise(resolve => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, { useNewUrlParser: true })
    mongoose.connection.on('disconnect', () => {
      maxConnectTimes++
      // 进行重连
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了吧少年')
      }
    })
    // 数据库出错
    mongoose.connection.on('error', err => {
      maxConnectTimes++
      console.log(err)

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧少年')
      }
    })
    // 数据库连接成功
    mongoose.connection.on('open', () => {
      resolve()
      console.log('Mongodb connected!')
    })
  })
}