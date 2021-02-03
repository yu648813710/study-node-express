const express = require('express');
// 引入数据库
const mysql = require('mysql');


const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '648813710',
    port: 3306, // 默认端口3306
    database: 'learn'
})

module.exports = () => {
    const Router = express.Router();

    Router.get('/', (req, res) => {
        db.query(`SELECT * FROM custom_evaluation_table`, (err, data) => {
            if (err) {
                res.status(500).send({
                    data: "数据库错误"
                }).end();
                return;
            };
            res.send(data).end();
        })
    });

    Router.post('/add.json', (req, res) => {
        const {
            title,
            src,
            descrption
        } = req.body;
        if (!title || !src || !descrption) {
            res.send({
                data: '缺少必要参数'
            }).end();
            return;
        };
        db.query(`INSERT INTO custom_evaluation_table (title, src, descrption) VALUE('${title}','${src}','${descrption}')`, (err, data) => {
            if (err) {
                res.send({
                    data: '添加失败'
                }).end();
                return;
            }
            res.send({
                data: '添加成功'
            }).end();
            return;
        })
    })

    return Router;
}