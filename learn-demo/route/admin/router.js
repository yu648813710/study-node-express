const express = require('express');
// 引入加密
const {
    md5,
    MD5_SUFFIX
} = require('../../libs/common');
// 引入数据库
const mysql = require('mysql');

// 引入banner模块
const bannerRouter = require('./banner');
const customRouter = require('./custom');

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '648813710',
    port: 3306, // 默认端口3306
    database: 'learn'
})

module.exports = function () {
    const Router = express.Router();
    // 检测登录状态
    // 没有声明请求路径，所有的请求都会从这里走
    // 全局处理
    Router.use((req, res, next) => {
        // 如果没有登录
        if (!req.session['admin_id'] && req.url !== '/login.json') {
            res.send({
                data: "未登录"
            }).end();
        } else {
            next();
        };
    });


    Router.post('/login.json', (req, res) => {
        // 前端传过来的数据
        const {
            name,
            password
        } = req.body;

        // 数据库查询
        db.query(`SELECT * FROM admin_table WHERE username='${name}'`, (err, data) => {
            // 数据库连接失败
            if (err) {
                res.status(500).send('database error').end();
            } else {
                if (data.length > 0) {
                    if (data[0].password === md5(password + MD5_SUFFIX)) {
                        req.session['admin_id'] = data[0].ID;
                        res.send({
                            data: '登陆成功'
                        }).end();
                    } else {

                        res.send({
                            data: '密码错误'
                        }).end();
                    }
                } else {
                    // 没有该用户
                    res.send({
                        data: '没有该用户'
                    }).end();
                };
            }
        })
    });

    Router.use('/banner/', bannerRouter());

    Router.use('/custom/', customRouter());


    return Router;
}