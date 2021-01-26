// 引入 node 的http
const http = require("http");

const fs = require("fs");

const queryString = require("querystring"); // 直接解析 get 形式请求

const urlLib = require('url');

// 引入自定义包 

const sevenflow = require('sevenflow-demo');
console.log(sevenflow.sum(1,2,3,4,5,6));
///////////////////////////////////////////////


// 创建服务器
// const server = http.createServer((req, res) => {
//     console.log(req.url)
//     // 响应内容
//     res.write('abd');
//     res.end();
// });

// // 监听--端口
// server.listen(5050);

///////////////////////////////////////////////

// 如何 进行文件操作 

// 需要参数 文件名 以及 回调函数
// fs.readFile('demo.txt', (err, data) => {
//     console.log(data)
// })

// fs.writeFile('demo.txt', '123', (err) => {

// })

//////////////////////////////////////////////

// 正常访问 

// const server = http.createServer((req, res) => {
//     console.log(req.url)
//     if (req.url === '/favicon.ico') {
//         return;
//     }
//     const fileUrl = `./file${req.url}`
//     fs.readFile(fileUrl, (err, data) => {
//         res.write(data);
//         // 响应内容
//         res.end();
//     })
// });
// server.listen(5050);

//////////////////////////////////////////////

//// get请求 最大32K

// 利用 split 切

// queryString
// http.createServer((req, res)=>{
//     // request 获取请求信息
//     if (req.url === '/favicon.ico') {
//         return;
//     }
//     const data = queryString.parse(req.url.split("?")[1]);
//     console.log(data);
//     res.write(req.url.split("?")[1]);
//     res.end();

// }).listen(8080)

// url
// http.createServer((req, res)=>{
//     // request 获取请求信息

//     const data = urlLib.parse(req.url, true); // true代表解析查询数据
//     console.log(data);
//     res.write(JSON.stringify(data));
//     res.end();

// }).listen(8080)

//// post请求 可以到一个G

// http.createServer((req, res)=>{
//     // request 获取请求信息

//     let newData = ''; // 接受数据 
//     let num = 0; // 接受数据 
//     // 有一段数据到达的时候 就会触发，会触发多次 数据过大的时候才可以
//     req.on('data', (data) => {
//         console.log(`第${++num}次`)
//         newData+=data;
//     })
//     // 数据全部到达，只触发一次
//     req.on('end', () => {
//         console.log(newData);
//     })
//     res.end();

// }).listen(8080)

///// 创建一个 node 应用， 用户登录

/*
 * 第一步定义 接口
 * /user?act=reg 注册，&user=aaa&pass=123456
 * {"ok":false,"meg":"原因"}
 * /user?act=login 登录，&user=aaa&pass=123456
 * {"ok":ture,"meg":"原因"}
 */


const user = {};

const server = http.createServer((req, res) => {
    let str = '';

    // const POST = queryString.parse(str);
    req.on('data', (data) => {
        str += data;
    });

    req.on('end', () => {
        // 解析数据 分为两大类 一个是 文件访问，一个 是接口访问。
        const obj = urlLib.parse(req.url, true);

        const url = obj.pathname;

        const GET = obj.query;
        // 区分接口，文件
        if (url === '/user') {
            switch (GET.act) {
                case 'reg':
                    // 检查用户
                    if (user[GET.user]) {
                        res.write('{"ok":false, "msg":"用户存在"}');
                    } else {
                        user[GET.user] = GET.pass;
                        res.write('{"ok":true, "msg":"注册成功"}');
                    }
                    // 插入suer
                    break;
                case 'login':
                    if (!user[GET.user]) {
                        res.write('{"ok":false, "msg":"没有此用户"}');
                    } else if (user[GET.user] === GET.pass) {
                        res.write('{"ok":true, "msg":"登录成功"}');
                    } else {
                        res.write('{"ok":false, "msg":"密码错误"}');
                    }
                    break;
                default:
                    res.write('{"ok":false, "msg":"未知的act"}');
                    break;
            }

            res.end();
        } else {
            // 读取文件
            const file_name = './file' + url;
            fs.readFile(file_name, (err, data) => {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }

                res.end();
            });
        };

    });
});
server.listen(4040);