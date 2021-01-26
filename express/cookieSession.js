//  http是无状态的，所以需要一个状态来进行管理。
/**
 * 简述:
 * cookie：在浏览器保存一些数据，每次发送请求的时候 会带上cookie ，不安全，大小有限制 4K
 * session：在服务端保存，安全，服务器空间大小，是基于cookie实现的。浏览器和服务器不能独立实现session，是通过cookie实现的，通过存在cookie里的值，来读取服务器里内存存在的文件，所以 session 设置是 服务器先给 浏览器的cookie存一个 类似于 索引的 id值 ，然后 获取 session的时候 去拿浏览器cookie里存储的id去在服务器找，找到后然后返回即可
 * 隐患：session劫持，意思就是cookie被别人拿走了，别人冒充你的cookie，没有好的办法，只能缓解
 * COOKIE空间非常小---省着用
 * cookie 安全性非常差
 */

/**
 * cookie
 * 读取--cookie-parser
 * 发送
 */

/**
 * session
 * 读取--cookieSession
 * 发送
 */


const express = require('express');
const cookiePasrser = require('cookie-parser');
const cookieSession = require('cookie-session');

const server = express();

// 发送 读取cookie
server.use(cookiePasrser());
server.use(cookieSession({
    name: 'sevenflow',
    keys: ['aaa', 'bbb', 'ccc'], // session强制必需用keys的
    maxAge: 60 * 1000, // session的过期时间
}));
// 发送
// server.use("/", (req, res) => {
//     res.cookie("user", '123', {
//         path: '/aaa',  // 在什么目录下可以读取的，所以只有aaa路径才可以
//         maxAge: 30*24*3600*1000,  // 30天 * 24小时 * 3600 秒 * 1000毫秒，以毫秒为单位的
//     })
//     res.send("ok")
// });
// 读取 也必须是存入页面才可以读取
// cookie是往上访问的，子集可以访问父级所有得cookie
// server.use("/aaa/a", (req, res) => {
//     console.log(req.cookies)
//     res.send(req.cookies)
// });


// cookie的安全操作

// server.use("/", (req, res) => {
//     // req.secure = 'wadas'; // 加密准备 签名
//     // res.cookie("user", '123', {signed: true}); // 签名，保证前台修改可以被知晓，因为修改后 和 签名是不一致得。
//     res.cookie("name", '7流'); // 普通
//     // res.send(req.signedCookies) // 获取签名的cookie
//     res.send(req.cookies) // 获取正常的cookie
// });


// 删除cookie

// server.use("/", (req, res) => {
//     res.clearCookie('name'); // 传入删除的key 就行
//     res.send(req.cookies) // 获取正常的cookie
// });

// 获取 以及 设置 删除，session
server.use("/", (req, res) => {
    res.cookie("name", '7流'); // 普通
    if (!req.session['count']) {
        req.session['count'] = 1;
        req.session = {
            ...req.session,
            test: '123'
        }
    } else {
        ++req.session['count'];
        delete req.session.test; // session 就是一个对象 所以用对象直接删除
    }
    console.log(req.session)
    res.send('ok') // 获取正常的cookie
});

server.listen(8080);