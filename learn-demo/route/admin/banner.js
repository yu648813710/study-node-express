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


    Router.post('/add.json', (req, res) => {
        const {
            title,
            descrption,
            href
        } = req.body;
        if (!title || !descrption || !href) {
            res.send({
                data: '缺少必要参数',
            }).end();
            return;
        }
        db.query(`INSERT INTO banner_table (descrption, title, href) VALUE('${descrption}', '${title}', '${href}')`, (err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    data: '数据库出错',
                }).end();
                return;
            };
            res.send({
                data: '添加成功',
            }).end();
        })
    })

    Router.get('/list.json', (req, res) => {
        console.log(req)
        db.query(`SELECT * FROM banner_table`, (err, data) => {
            if (err) {
                res.status(500).send({
                    data: 'err'
                }).end();
            } else {
                res.send({
                    data
                }).end();
            }
        });
    });

    Router.post('/set.json', (req, res) => {
        const {
            ID,
            title,
            descrption,
            href
        } = req.body;
        if (!ID) {
            res.send({
                data: "缺少id"
            }).end();
            return;
        } else {
            // 修改前先要查看是否有该条数据
            db.query(`SELECT * FROM banner_table WHERE ID=${ID}`, (err, data) => {
                if (err) {
                    res.status('500').send({
                        data: '数据库错误'
                    }).end();
                    return;
                }
                if (!data.length) {
                    res.status('404').send({
                        data: '没有该条数据'
                    }).end();
                    return;
                }
                // 有数据那么可以修改
                db.query(`UPDATE banner_table SET title='${title}', descrption='${descrption}', href='${href}' WHERE ID=${ID}`, (err, data) => {
                    if (err) {
                        res.status('500').send({
                            data: '数据库错误'
                        }).end();
                        return;
                    }
                });
                res.send({
                    data: '修改成功'
                }).end();
            })
        }
    });

    Router.delete('/delete.json', (req, res) => {
        const {
            ID
        } = req.query;
        db.query(`DELETE FROM banner_table WHERE ID='${ID}'`, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send({
                    data: '数据库错误'
                }).end();

                return;
            }
            res.send({
                data: '删除成功'
            }).end();
        })
    });
    return Router;
}