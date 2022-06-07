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

    Router.delete('/', (req, res) => {
        const {
            ID
        } = req.query;
        
        if(!ID) {
            res.send({
                data: '缺少必要参数'
            }).end();
            return false;
        };

        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${ID}`, (err, data) => {
            if(err) {
                res.status(500).send({
                    data: '数据库报错'
                }).end();
                return;
            };
            if(!data.length) {
                res.status(404).send({
                    data: '没有当前数据'
                }).end();
                return;
            };
            db.query(`DELETE FROM custom_evaluation_table WHERE ID=${ID}`, (err, data) => {
                if(err) {
                    res.status(500).send({
                        data: '数据库报错'
                    }).end();
                    return;
                };
                res.send({
                    data: '删除成功'
                }).end();
            })
        })
    })

    Router.post('/set.json', (req, res) => {
        const {
            ID,
            title,
            descrption,
            src
        } = req.body;
        
        if(!ID) {
            res.send({
                data: '缺少必要参数'
            }).end();
            return false;
        };

        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${ID}`, (err, data) => {
            if(err) {
                res.status(500).send({
                    data: '数据库报错'
                }).end();
                return;
            };
            if(!data.length) {
                res.status(404).send({
                    data: '没有当前数据'
                }).end();
                return;
            };
            db.query(`UPDATE custom_evaluation_table SET title='${title}', descrption='${descrption}', src='${src}' WHERE ID=${ID}`, (err, data) => {
                if(err) {
                    res.status(500).send({
                        data: '数据库报错'
                    }).end();
                    return;
                };
                res.send({
                    data: '修改成功'
                }).end();
            })
        })
    })

    return Router;
}