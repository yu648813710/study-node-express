const express = require('express');
// 中间件 获取 静态文件
const expressStatic = require('express-static');

// const bodyParser = require("body-parser");
const myBodyParser = require("./libs/myBodyParser");

const server = express();

server.listen(8000);

// get请求
// server.get('/', (req, res)=> {
//     console.log("get")
//     res.end();
// })

// post请求
// server.post('/post', (req, res)=> {
//     console.log("post")
//     res.end();
// })


// 所有请求都可以
// server.use('/use', (req, res)=> {
//     console.log("use")
//     res.end();
// })


// 解析参数
// server.use(bodyParser.urlencoded({
//     extended: false, // 扩展模式
//     limit: 2*1024*1024, // 限制大小，最多接受多大数据 默认 100K，这个显示2M
// }));

// 自己写的解析参数
server.use(myBodyParser);


server.post('/login', (req, res, next) => {
    console.log(req.body)
    console.log(req.query)
    // res.send(req.body);
    res.end();
    // next(); // 链式操作 表示操作完成 后 后面还会执行
})

server.post('/login', (req, res) => {
    console.log(2)
    res.end();
})

// 可以直接 拿到www目录下所有的静态文件
server.use(expressStatic('./www'));