
1. mysql动态分表，recv_data按天分表，数据写入根据时间写入相应的表中
    分表方法，使用
    ```
    rename table recv_data to recv_data_20220316
    ```
    即可将当前recv_data表及相应数据转成recv_data_20220316，然后需要重新创建recv_data表
    
2. 需要修改之前的定时备份方法，截断表方法的调用
