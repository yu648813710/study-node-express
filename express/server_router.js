const express = require("express");

const server = express();

/**
 * 路由 
 * 目的是为了拆分服务，把一个系统拆分为好几个模块
 */ 

// 用不同的目录处理不同的 模块

// 实例化路由
const userRouter = express.Router();


// 创建路由
userRouter.get('/1.html', (req, res) => {
    res.send('user1')
})


userRouter.get('/2.html', (req, res) => {
    res.send('user2')
})

// 使用路由
server.use("/user", userRouter)


// 实例化路由
const articleRouter = express.Router();

// 创建路由
articleRouter.get('/news.html', (req, res) => {
    res.send("news")
})

// 使用路由
server.use('/article', articleRouter);

/**
 * 嵌套路由
 */

// 实例化路由
const VIPUserRouter = express.Router();

// 创建路由
VIPUserRouter.get('/1.html', (req, res) => {
    res.send('vip1');
});

// 使用路由  访问路径为 user/vip/
userRouter.use('/vip', VIPUserRouter);

server.listen(5080);