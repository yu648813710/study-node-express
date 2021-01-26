# express 框架

## 使用

### 安装

- yarn add express

### 配置

- 创建服务
    const server = express()

- 监听
    server.listn(8000)

- 处理请求
    server.use(api, fun);

### 接受请求

- get比较简单 无需中间件

- post比较麻烦，需要中间件 body-parser

### 响应

---

## express特点

### 非侵入式

### 中间件

- 指的是对之前的方法没有修改，但是新增了方法

### 链式操作

- 链式操作是通过 use 高级函数里面的 next 完成的，因为next还有传递参数的作用，所以 可以利用他来写中间件

## node的热加载

- yarn global add nodemon

- ndoemon server.js


## 数据库 mysql

### 简要

一般分为两个端，默认只有命令行工具，管理 工具可以用 navicat

- server端

数据都存在服务端

- client端

客户端 就是一些管理工具，只是去server去取

### 单位

- 库

类似于文件夹，用来管理表的

- 表

类似于文件，用来存数据，表又分为 行 与 列，行是一条数据，列又称字段以及域，一个数据项