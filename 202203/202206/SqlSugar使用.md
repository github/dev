# SqlSugar使用说明

## SqlSugar简介

[官方文档教程](https://www.donet5.com/Home/Doc) / 
[Gitee](https://gitee.com/dotnetchina/SqlSugar) / 
[Github](https://github.com/donet5/SqlSugar)

SqlSugar是一款 老牌 .NET 开源ORM框架，由果糖大数据科技团队维护和更新 

1.  .NET中唯一【全自动分表组件】+【读写分离】+【SAAS分库】+【大数据读写】 官方完美整合的ORM框架

2.  .NET 百万级大数据写入、更新和读取  性能最强框架

3.  使用最简单，语法最爽的ORM 【文档，视频教程】

4.  支持 DbFirst、CodeFirst和WebFirst 3种模式开发

5. Github star 数 [查看] 仅次于EF 和 Dapper,每月nuget下载量超过1万[查看]

6.  拥有重多成熟案例 查看用户案例

7. 简单易用、功能齐全、高性能、轻量级、服务齐全、官网教程文档、有专业技术支持一天18小时服务

8. 支持：MySql、SqlServer、Sqlite、Oracle 、 postgresql、达梦、人大金仓、神通数据库、Access 、MySqlConnector、自定义扩展

## SqlSugar简单使用入门

### SqlSugar创建对象

创建多连接连接池对象

``` code
    //创建对象
    SqlSugarScope db = new SqlSugarScope(new List<ConnectionConfig> {
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Local_Common_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Local_Read
        },
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Local_Common_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Local_Write
        },
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Master_Common_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Master_Common_Read
        },
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Master_Common_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Master_Common_Write
        },
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Master_Raw_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Master_Raw_Read
        },
        new ConnectionConfig()
        {
            DbType = DbType.MySql,
            IsAutoCloseConnection = true,
            ConnectionString = DbConnection.Master_Raw_Conn_Str.ConnectionString,
            ConfigId = ConfigIdz.Master_Raw_Write
        }
    });
```

### 查询信息

处理过程中，需要自己添加异常捕获处理

```code
    //连接池获取连接对象，本地写连接及主库写连接
    var local_common_db = db.GetConnectionScope(ConfigIdz.Local_Write);
    var master_common_write_db = db.GetConnectionScope(ConfigIdz.Master_Common_Write);
    TopeInfo info = new TopeInfo()
    {
        Index = 1,
        Name = "氢",
        Symbol = "H",
        Tope_name = "氕",
        Tope_symbol = "H-1",
        Tope_mass = 1,
        Tope_mass_acce = 1.00783,
        Mass_tolerance_mev = 7.289,
        Mass_tolerance_amu = 0.00783,
        Nuclide_type = 0,
        Nuclide_para1 = 0.99985,
        Nuclide_para2 = "5",
        Angular_momentum_J = 0.5,
        Ground_state_parity = 0
    };
    //开启事务
    db.BeginTran();

    //本机插入数据
    local_common_db.Insertable<TopeInfo>(info).ExecuteCommand();
    //主库插入数据
    master_common_write_db.Insertable<TopeInfo>(info).ExecuteCommand();
    //本机获取数据表数据列表
    var result = local_common_db.Queryable<TopeInfo>().ToList();
    //主库获取数据表数据数量
    var count1 = master_common_write_db.Queryable<TopeInfo>().Count();
    //默认获取Local_Read本机数据库数据表数据总数
    var count2 =  db.Ado.GetInt("select count(*) from t_iso_tope");
    //提交事务
    db.CommitTran();
```

### 主动切换数据库

主从读写分离及本地数据库读写项目中都存在，当需要读取不同库的数据时，需要手动切换SqlSugarScope对象的数据库连接（其默认为列表中队首的连接）

```code
    db.Queryable<TopeInfo>().ToList();  //默认获取Local_Read本机数据库数据表数据列表
    db.ChangeDatabase(ConfigIdz.Master_Common_Read);    //切换为主共有数据库读连接
    db.Queryable<TopeInfo>().ToList();  //获取Master_Common_Read主共有数据库数据表数据列表
```
