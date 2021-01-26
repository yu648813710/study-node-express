const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');
const ejs = require('ejs');
const e = require('express');


const server = express();

server.listen(8089);

// 解析cookie
server.use(cookieParser('strJiami'));

// 解析session
server.use(cookieSession({
    name: 'sevenflow',
    keys: ['aaa', 'bbb', 'ccc'], // session强制必需用keys的
    maxAge: 60 * 1000, // session的过期时间
}));

// 模板引擎处理
// 输出什么东西
server.set('view engine', 'html');
// 模板引擎放在哪里
server.set('views', './template');
// 哪种模板引擎
server.engine('html', consolidate.ejs);

/**
 * 数据库链接
 * 1. 应该保持一个链接
 * 2. 保持1个链接不够，一般保持多个连接 20-100个，用户来了 可以直接访问查询，预防出现查询卡顿
 * 3. 利用连接池 createPool
 */

// 连接数据库
// 利用 pool 连接池
const db = mysql.createPool({
    host: 'localhost',
    password: "648813710",
    user: 'root',
    port: 3306, // 默认端口3306
    database: 'node-demo',
});

// 接收用户数据

// 首页
server.get('/', (req, res, next) => {
    // 查询banner
    db.query('SELECT * FROM banner_table', (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            // 渲染页面
            res.render('index.ejs', {
                banners: data
            })
        }
    })
});
// 列表
server.get('/list', (req, res) => {
    // 只查询固定字段的数据
    db.query('SELECT title,summary,postTime,authorSrc,ID FROM article_table', (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            // 渲染页面
            res.render('newslist.ejs', {
                banners: res.bannerData,
                news: data
            });
        }
    })
});

// 详情
server.get('/newsDetails', (req, res) => {
    const id = req.query.id;
    const act = req.query.act;
    if (!id) {
        res.status(404).send('你请求文章不在').end();
        return;
    };
    // 查询某一条数据
    db.query(`SELECT * FROM article_table WHERE ID=${id}`, (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            const articleData = data[0];
            articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
            // 渲染页面
            res.render('newsDetails.ejs', {
                details: articleData,
                id,
            });
        }
    })
    // 如果有点赞操作
    if (act === 'link') {
        // 增加一个赞
        db.query(`UPDATE article_table SET link=link+1 WHERE ID=${id}`, (err, data) => {
            if (err) {
                res.status(500).send('database error').end();
            } else {
                // 查询某一条数据
                db.query(`SELECT * FROM article_table WHERE ID=${id}`, (err, data) => {
                    if (err) {
                        res.status(500).send('database error').end();
                    } else {
                        const articleData = data[0];
                        articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                        // 渲染页面
                        res.render('newsDetails.ejs', {
                            details: articleData,
                            id,
                        });
                    }
                })
            }
        })
    };

});

// 可以直接 拿到www目录下所有的静态文件
server.use(static('./template'));