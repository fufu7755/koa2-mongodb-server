const User = require('../app/controllers/user')

// Api
module.exports = router => {
  // 用户的信息读取路由
  router.get('/user/info', User.getInfo)
}
