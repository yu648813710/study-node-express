# 模拟项目

## 数据字典

开发前，双方要约定开发的相关字段，进行开发

### banner

- 表名

 - banner_table

- id

- title

  - 标题
  
  - 字符串 varchar(32)

- subTitle

  - 副标题
  
  - 字符串 varchar(16)

- src

  - 图片地址
  
  - 字符串 varchar(64)

### 文章

- 表名

 - article_table

- id

- title

  - 标题
  
  - 字符串 varchar(32) // varchar 一般不会太长

- author

  - 作者
  
  - 字符串 varchar(16)

- authorSrc

  - 作者头像
  
  - 字符串 varchar(64)

- postTime

  - 发布时间
  
  - 字符串 int 后端一般是以S为单位计数的

- content

  - 内容
  
  - 字符串 text // text 这个一般是长字符串 一般最大2个G

- link

  - 赞
  
  - 字符串 int

### 用户

- 表名

 - user_table

- id

- userName

  - 用户名
  
  - 字符串 varchar(32)

- password

  - 密码
  
  - 字符串 varchar(16)

- src

  - 作者头像
  
  - 字符串 varchar(64)


## 建立数据库

- 输入字段

- 选择字段类型

- 选择是否为null，一般不为null

- 选择是否自增 一般都是 ID 自增

- 选择字符集  utf-8

- 选择排序规则  utf8_general_ci