const express = require('express');
const static = require('express-static');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const expressRoute = require('express-router');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({
    dist: './static/upload', // 确认上传目录
})

// 引入web路由
const webRouter = require('./route/web/router');

// 引入adminb路由
const adminRouter = require('./route/admin/router');

// 创建服务
const server = express();

// 监听端口
server.listen(8090);


// 1. 获取前端请求数据
// get自带
server.use(bodyParser.urlencoded());
server.use(multerObj.any());


// 2. cookie session
server.use(cookieParser());

(function () {
    const keys = [];
    for (let i = 0; i < 1000; i++) {
        keys[i] = 'num_' + Math.random();
    }

    server.use(cookieSession({
        name: 'sess_id',
        keys,
        maxAge: 20 * 60 * 1000, // 20min
    }));
})()
// 3. 模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('views engine', 'html');
// 4. route

/**
 * 正常使用router 
  
const r1 = express.Router();

r1.get('/1.html', (req, res) => {
    res.send('我是文章').end();
})
server.use('/news/', r1);

*/


/**
 * 方法使用
 * 
 
const createRouter = () => {
    const Router = express.Router();
    Router.get('/2.html', (req, res) => {
        res.send('我是文章').end();
    });
    return Router;
}
server.use('/news/', createRouter());

所以也可以利用module规范来使用了 

*/

// 使用module的规范来使用
// 前端页面路由
server.use('/web/', webRouter(express));
// 管理后台路由
server.use('/admin/', adminRouter());

// 5. 默认情况
server.use(static('./static/'));