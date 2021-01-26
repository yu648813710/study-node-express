const mod = require("./mod");
console.log(mod)
console.log(module.exports === exports)
/**
 * 模块相关使用
 * require 请求：引入模块
 * module 模块 多个导出
 * export 输出  单个输出
 * node modules 里的模块 引入 不需要相对路径 直接引入即可 require(package)
 *    找的顺序 是 先从node的系统模块找，再从node modules找
 * 
*/



/**
 * npm 发布 模块
 * 先再npm注册账号
 * npm login
 * npm init 按照步骤一点点填入歇息
 * 写index。js 入口文件
 * npm publish 进行发布 发布之前 邮箱一定要验证，否则会报错 403，发布完成后就可以下载使用
 * 如果要更新npm包 ,需要再package.json里 升版本号 version 不能和上次重复即可，否则会报错，然后继续 npm publish就行
 * 使用这个包的项目 直接 npm update <package> 就行
 * 删除之前发布的包 直接 npm unpublish <package>,输入后 会让你确认是否需要删除，确认删除 需要带上 --force 强制命令
*/