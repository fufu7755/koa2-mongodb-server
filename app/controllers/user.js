// 用于封装controllers的公共方法

const mongoose = require('mongoose')
const User = mongoose.model('User')

// GET方法读取用户信息
exports.getInfo = async (ctx, next) => {
  // 获取用户id
  const {
    _id
  } = ctx.query

  let user = await User.findOne({ _id: _id }, {name: 1, email: 1, avatarUrl: 1})

  if (user) {
    ctx.body = {
      success: true,
      data: user
    }
  } else {
    ctx.body = {
      success: false,
      err: '用户不存在'
    }
  }
}
