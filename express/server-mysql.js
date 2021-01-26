/**
 * node 和 mysql的配置
 * 安装依赖，mysql进行数据库操作
 * 1.连接数据库
 * 2.发送请求查询
 */
const express = require("express");
const mysql = require("mysql");

const servers = express();
// 连接地址 名称 密码 连接哪个库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '648813710',
    database: 'node-demo',
    port: 3306, // 默认端口3306
});

servers.use('/', (req, res) => {

    /**
     * sql查询
     * 有四大查询语句 -- 增，删，改，查
     * 数据库不分大小写
     * 关键字一般标准大写，库名 表名 字段也得加上 ``
     * 增 -INSERT
     * INSERT INTO 表 （字段列表） VALUES(值列表)
     * INSERT INTO `user_table` (`ID`, `name`, `password`) VALUES(0, 'sevenflow', '123456')
     * 删 -DELETE
     * DELETE FROM 表 WHERE 条件
     * 改 -UPDATE
     * UPDATE 表 SET 字段=值，字段=值... HWERE 条件
     * 查 -SELECT
     * SELECT
     * SELECT * FROM 表 WHERE 条件
     * SELECT * FROM `user_table`
     * 参数是 sql语句 以及回调函数
     *
     **** 子句： start*****
     * WHERE 条件
     *  示例  WHERE age>18 /  WHERE age>18 AND score<60 /  WHERE age>18 OR score<60
     * 
     * ORDER 排序
     * 示例 ORDER BY age ASC/DESC (ASC升序 从小到大，DESC降序 从大到小)
     * 示例 价格 price 升序，效率 sales 降序, 多条件排序 
     * ORDER BY price ASC, sales DESC 
     * 
     * GROUP 聚类-合并相同的
     * 示例统计每个班的人数
     * SELECT class,COUNT(*) FROM `student_table` GROUP BY class
     * 句型解释，查询  班级列 计数 来自于 `student_table` 表，class进行归组
     * 一般单独使用 GROUP 是没用的，需要配合语句使用 如 COUNT 计数,MIN 最小,MAX 最大,AVG 平均数，SUM 求和
     * 
     * LIMIT - 限制输出
     * 分页 
     * LIMIT 10 前10条
     * LIMIT 5,8 从5开始 要8个
     * 每页 10 条数据 ，当前页 num
     * LIMIT （num-1） * 10， 10
     * 
     * 子句是有顺序的 刚需，不按照顺序会出错
     * 
     * WHERE GROUP ORDER LIMIT
     * 筛选  合并   排序   限制
     *  
     **** 子句 end*****
     * 
     **** 导出导入： start*****
     *
     * 
     **** 导出导入： end*****
     * 
     * 
     */
    db.query("SELECT * FROM `user_table`", (err, data) => {
        if (err) {
            console.log(err);
            res.send('err');
        } else {
            console.log(data);
            res.send(data);
        }
    });

});

servers.listen(5050);