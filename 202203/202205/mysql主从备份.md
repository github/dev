- [MySQL5.7多主一从同步配置方案](#mysql57多主一从同步配置方案)
  - [1. 简介](#1-简介)
  - [2. 主库4300配置](#2-主库4300配置)
  - [3. 主库4400配置](#3-主库4400配置)
  - [4. 从库4500配置](#4-从库4500配置)
  - [mysql复制数据库](#mysql复制数据库)
  - [MySQL 设置字符长度与实际占有长度问题](#mysql-设置字符长度与实际占有长度问题)

# MySQL5.7多主一从同步配置方案

## 1. 简介

>
>
> 多主一从，也称为多源复制，数据流向：
>
> ``` 数据流向
> 主库1 -> 从库s
> 主库2 -> 从库s
> 主库n -> 从库s
>```
>
> ### 1.1 部署环境
>
> ``` 部署环境
>     数据库：MySQL5.7
>     操作系统： Windows10（Server/Linux均可）
>     主库4300：IP=192.168.153.180;Port=3306;server-id=4300;database=zhhy;table=user;
>     主库4400：IP=192.168.153.193;Port=3306;server-id=4300;database=xy;table=user;    
>     从库4000：IP=192.168.153.112;Port=3306;server-id=4300;database=zhhy,xy;table=user;
>  ```
>
> ### 1.2 配置约束
>
>  ``` 约束
>    主从库必须保证网络畅通
>    主库必须开启binlog日志
>    主从库的server-id必须不同>
>  ```

## 2. 主库4300配置

> ### 2.1 数据库配置[mysqld]
>
> ``` 主库DB配置
> #必须唯一 
> server-id=4300
> #开启及设置二进制日志文件名称
> log_bin=mysql-bin
> binlog_format=MIXED
> sync_binlog=1
> #二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
> expire_logs_days=7
> #要同步的数据库
> binlog-do-db=zhhy
> binlog-ignore-db=mysql
> #不需要同步的数据库
> binlog_ignore_db=information_schema
> binlog_ignore_db=performation_schema
> binlog_ignore_db=sys
> ```
>
> ### 2.2 授权 slave 用户 & 密码
>
> ``` 授权slave
> grant replication slave on *.* to 'slave'@'%' identified by '123456';
> ```
>
> ### 2.3 查看 log_bin 是否开启
>
> ``` 查看log_bin状态
> show variables like '%log_bin%';
> ```
>
> ### 2.4 查看master状态
>
> ``` 查看master状态
> 此处查询的binlog文件及pos均会在后面用到
> show master status \G;
> ```

## 3. 主库4400配置

> ### 3.1 数据库配置 [mysqld]
>
> ``` 主库DB配置
> #必须唯一 
> server-id=4400
> #开启及设置二进制日志文件名称
> log_bin=mysql-bin
> binlog_format=MIXED
> sync_binlog=1
> #二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
> expire_logs_days=7
> #要同步的数据库
> binlog-do-db=xy
> binlog-ignore-db = mysql
> #不需要同步的数据库
> binlog_ignore_db = information_schema
> binlog_ignore_db = performation_schema
> binlog_ignore_db = sys
> ```
>
> ### 3.2 授权slave 用户 & 密码
>
> ``` 授权slave账号
> grant replication slave on *.* to 'slave'@'%' identified by '123456';
> ```
>
> ### 3.3 查看 log_bin是否开启
>
> ``` 查询log_bin状态
> show variables like '%log_bin%';
> ```
>
> ### 3.4 查看 master状态
>
> ``` 查看master状态
> 此处查询的binlog文件及pos均会在后面用到
> show master status \G;
> ```

## 4. 从库4500配置

> ### 4.1 数据库配置[mysqld]
>
> ``` 从库db配置
> #必须唯一 
> server-id=4500
> master_info_repository=table
> relay_log_info_repository=table
> ```
>
> ### 4.2 设置【主库】信息
>
> ``` 配置主库信息
> mysql -u root -pyourPwd
> stop slave;
> CHANGE MASTER TO MASTER_HOST='192.168.153.180',MASTER_PORT=3306,MASTER_USER='slave',MASTER_PASSWORD='123456',MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=438 for channel '4300';
> CHANGE MASTER TO MASTER_HOST='192.168.153.193',MASTER_PORT=3306,MASTER_USER='slave',MASTER_PASSWORD='123456',MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=438 for channel '4300';
> start slave; 
> ```
>
> #### 释义
>
> ``` 释义
> stop slave;     //停止同步
> start slave;     //开始同步
> //必须和【主库】的信息匹配。
> CHANGE MASTER TO
> MASTER_HOST='192.168.10.212', //主库IP
> MASTER_PORT=4300,             //主库端口
> MASTER_USER='slave', //访问主库且有同步复制权限的用户
> MASTER_PASSWORD='123456',     //登录密码
> //【关键处】从主库的该log_bin文件开始读取同步信息，主库show master status返回结果
> MASTER_LOG_FILE='mysql-bin.000003',
> //【关键处】从文件中指定位置开始读取，主库show master status返回结果
> MASTER_LOG_POS=438
> for channel '4300';       //定义通道名称
> ```
>
> ### 4.3 查看同步状态
>
> ``` 查看slave同步状态
> show slave status \G;
> ```
>
> #### 单独启动 / 停止某个同步通道
>
> ``` slave启停单个同步通道
> 若需要单独启动或停止某个同步通道，可使用如下命令：
> start slave for channel '4300';     //启动名称为300的同步通道
> stop slave for channel '4300';     //停止名称为300的同步通道
> ```

## mysql复制数据库

> ##old要复制的数据库名称，new新的数据库名称，root为数据库登录用户，password为root密码
>
> 创建新数据库指令
>
> create database `new` default character set utf8mb4 collate utf8mb4_general_ci
>
> 复制数据库指令
>
> mysqldump `old` -u `root` -p`password` | mysql `new` -u `root` -p`password`

## MySQL 设置字符长度与实际占有长度问题

> 存储时，前者不管实际存储数据的长度，直接按 char 规定的长度分配存储空间；而后者会根据实际存储的数据分配最终的存储空间
>
> ### 相同点
>
> * char(n)，varchar(n)中的n都代表字符的个数
> * 超过char，varchar最大长度n的限制后，字符串会被截断。
>
> ### 不同点
>
> * char不论实际存储的字符数都会占用n个字符的空间，而varchar只会占用实际字符应该占用的字节空间加1（实际长度length，0<=length<255）或加2（length>255）。因为varchar保存数据时除了要保存字符串之外还会加一个字节来记录长度（如果列声明长度大于255则使用两个字节来保存长度）。
> * 能存储的最大空间限制不一样：char的存储上限为255字节。
> * char在存储时会截断尾部的空格，而varchar不会。
>
> char是适合存储很短的、一般固定长度的字符串。例如，char非常适合存储密码的MD5值，因为这是一个定长的值。对于非常短的列，char比varchar在存储空间上也更有效率。
>