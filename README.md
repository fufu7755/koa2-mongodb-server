# koa2-mongodb-server
利用koa2+mongodb搭建一套简易的nodejs后台服务，用于为客户端提供数据请求的数据api接口

# 使用说明
- NodeJs  
  基于版本v16.20.2

- 初始化数据
  在 /app/database/init中, initUser初始化一个用户数据。

- 测试路由
  http://XXXXXXXXXXXXXX/user/info?_id = XXXXXXXXXXXXXXXX

# 项目目录结构说明

- 控制器：controllers/user.js  
  用于接收用户模块的接口。

- model层：表结构的定义，model/user.js  
 
- koa2的使用  
  还是贴一下文档吧：https://github.com/koajs/koa

- koa-router的使用  
  再贴文档：https://github.com/alexmingoia/koa-router 

