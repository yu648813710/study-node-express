# 博客项目

---

## 数据字典

### 首页

- banner

  - 表名 
    
    banenr_table

  - 字段

    - ID 
    - title   varchar （32）
    - descrption  varchar (300) 
    - href   varchar(300)


- 产品介绍

  - 表名 
    
    intro_table
    
  - 字段

    - ID
    - title   varchar （32）
    - descrption  varchar (200) 
    - href   varchar(300)

- 用户评价

  - 表名 
    
    custom_evaluation_table
    
  - 字段
  
    - ID
    - descrption  varchar (200)
    - title   varchar （32）
    - src varchar(300)

### 新闻

  - 表名 

    news_table

- 字段

  - ID
  - summary varchar (500)
  - title   varchar （100）
  - src varchar(300)
  - href  varchar(300)
  - ico_src  varchar(300)
  - big_prc_src  varchar(300)
  - content   text

### blog

  - 表名 
    
    blog_table

- 字段
  - ID
  - summary varchar (500)
  - title   varchar （100）
  - prc_big_src  varchar(300)
  - prc_src  varchar(300)
  - content   text
  - post_time timestamp (时间戳)
  - author varchar(32)
  - n_view  int

### 联系我们

- 地址

    - 表名 
      
        contact_table

    - 字段
      - ID
      - street varchar (50)
      - phone  varchar （20）
      - fax  varchar(20)
      - email  varchar(64)
      - weibo   varchar(40)
      - wx  varchar(40)
      - map  ?

- 发送联系消息

    - 表名 
      
        msg_table
    
    - 字段
      - ID
      - name  varchar (16)
      - email  varchar （64）
      - phone  varchar （20）
      - subject  text


### 关于我们

- 表名 
  
	aboutus_table

- 字段
  - ID
  - title  varchar (200)
  - content  text
  - prc_src  varchar （300）
  - href   varchar （300）

## 安全策略

### 防止拖库

- 数据库里面不能存储明文密码，加密之后存储，其实是签名 MD5 签名