const express = require("express");
const static = require("express-static");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const ejs = require('ejs');
const jade = require('jade');

const servers = express();

servers.listen(5080);

// 解析cookie
servers.use(cookieParser('strjiami'));

// 使用session
servers.use(cookieSession({
    name: 'seven_flow',
    keys: ['abc', 'edf'],
    maxAge: 20 * 3600 * 1000
}));

// post数据
servers.use(bodyParser.urlencoded({extended: false}));

// 用户请求
servers.use('/', (req, res, next) => {
    console.log(req.query)
    console.log(req.body)
    console.log(req.cookies)
    console.log(req.session)
});

// 静态数据
servers.use(static('./www'));