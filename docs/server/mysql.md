---
sidebar: auto
---
# mysql
## 安装mysql(centos7)
#### 新建mysql文件夹

```bash
cd /
mkdir mysql
cd mysql
```

#### 1. 下载mysql的repo源

```bash
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
```
#### 2. 安装mysql-community-release-el7-5.noarch.rpm包

```bash
sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
```
安装这个包后，会获得两个mysql的yum repo源：
```bash
/etc/yum.repos.d/mysql-community.repo
/etc/yum.repos.d/mysql-community-source.repo
```

#### 3. 安装mysql

```bash
sudo yum install mysql-server
```
根据步骤安装就可以了，不过安装完成后，没有密码，需要重置密码。

#### 4. 重置密码

重置密码前，首先要登录

```bash
mysql -u root
```
::: danger
登录时有可能报这样的错：ERROR 2002 (HY000): Can‘t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock‘ (2)，原因是/var/lib/mysql的访问权限问题。下面的命令把/var/lib/mysql的拥有者改为当前用户：
:::
```bash
sudo chown -R openscanner:openscanner /var/lib/mysql
```
#### 然后，重启服务：

```bash
service mysqld restart
```
#### 接下来登录重置密码：

```bash
mysql -u root
mysql > use mysql;mysql > update user set password=password(‘123456‘) where user=‘root‘;mysql > exit;
```

#### 5. 需要更改权限才能实现远程连接MYSQL数据库

可以通过以下方式来确认：
```sql
root#mysql -h localhost -uroot -p
Enter password: ******
Welcome to the MySQL monitor.   Commands end with ; or \g.
Your MySQL connection id is 4 to server version: 4.0.20a-debug
Type ‘help;’ or ‘\h’ for help. Type ‘\c’ to clear the buffer.
mysql> use mysql; (此DB存放MySQL的各种配置信息)
Database changed
mysql> select host,user from user; (查看用户的权限情况)
mysql> select host, user, password from user;
+-----------+------+-------------------------------------------+
| host       | user | password                                   |
+-----------+------+-------------------------------------------+
| localhost | root | *4ACFE3202A5FF5CF467898FC58AAB1D615029441 |
| 127.0.0.1 | root | *4ACFE3202A5FF5CF467898FC58AAB1D615029441 |
| localhost |       |                                            |
+-----------+------+-------------------------------------------+
4 rows in set (0.01 sec)
```
由此可以看出，只能以localhost的主机方式访问。
解决方法：
```sql
mysql> Grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
(%表示是所有的外部机器，如果指定某一台机，就将%改为相应的机器名；‘root’则是指要使用的用户名，)
mysql> flush privileges;    (运行此句才生效，或者重启MySQL)
Query OK, 0 rows affected (0.03 sec)
再次查看。。
mysql> select host, user, password from user;
+-----------+------+-------------------------------------------+
| host       | user | password                                   |
+-----------+------+-------------------------------------------+
| localhost | root | *4ACFE3202A5FF5CF467898FC58AAB1D615029441 |
| 127.0.0.1 | root | *4ACFE3202A5FF5CF467898FC58AAB1D615029441 |
| localhost |       |                                            |
| %          | root | *4ACFE3202A5FF5CF467898FC58AAB1D615029441 |
+-----------+------+-------------------------------------------+
4 rows in set (0.01 sec)
```

#### 修改权限
1、登陆mysql数据库    
```sql
mysql -u root -p
```
查看user表

```bash
mysql> use mysql;
Database changed
mysql> select host,user,password from user;
+--------------+------+-------------------------------------------+
| host         | user | password                                  |
+--------------+------+-------------------------------------------+
| localhost    | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| 192.168.1.1 | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
+--------------+------+-------------------------------------------+
2 rows in set (0.00 sec)
```
可以看到在user表中已创建的root用户。host字段表示登录的主机，其值可以用IP，也可用主机名，

   有时想用本地IP登录，那么可以将以上的Host值改为自己的Ip即可。

2、实现远程连接(授权法)

   将host字段的值改为%就表示在任何客户端机器上能以root用户登录到mysql服务器，建议在开发时设为%。   
  ```sql
 update user set host = ’%’ where user = ’root’;
```

将权限改为ALL PRIVILEGES

```sql
mysql> use mysql;
Database changed
mysql> grant all privileges  on *.* to root@'%' identified by "password";
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> select host,user,password from user;
+--------------+------+-------------------------------------------+
| host         | user | password                                  |
+--------------+------+-------------------------------------------+
| localhost    | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| 192.168.1.1 | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
| %            | root | *A731AEBFB621E354CD41BAF207D884A609E81F5E |
+--------------+------+-------------------------------------------+
3 rows in set (0.00 sec)
```

这样机器就可以以用户名root密码root远程访问该机器上的MySql.

#### 3、实现远程连接（改表法）

```sql
use mysql;

update user set host = '%' where user = 'root';
```

这样在远端就可以通过root用户访问Mysql.

#### 修改密码

#### 方法1： 用SET PASSWORD命令 
首先登录MySQL。 
格式：
```sql
mysql> set password for 用户名@localhost = password('新密码'); 
```
例子：
```sql
mysql> set password for root@localhost = password('123'); 
```

#### 方法2：用mysqladmin 
格式：
```sql
mysqladmin -u用户名 -p旧密码 password 新密码
``` 
例子：
```sql
mysqladmin -uroot -p123456 password 123 
```

#### 方法3：用UPDATE直接编辑user表 
首先登录MySQL。 
```sql
mysql> use mysql; 
mysql> update user set password=password('123') where user='root' and host='localhost'; 
mysql> flush privileges;
``` 

方法4：在忘记root密码的时候，可以这样 
以windows为例： 
1. 关闭正在运行的MySQL服务。 
2. 打开DOS窗口，转到mysql\bin目录。 
3. 输入mysqld --skip-grant-tables 回车。--skip-grant-tables 的意思是启动MySQL服务的时候跳过权限表认证。 
4. 再开一个DOS窗口（因为刚才那个DOS窗口已经不能动了），转到mysql\bin目录。 
5. 输入mysql回车，如果成功，将出现MySQL提示符 >。 
6. 连接权限数据库： use mysql; 。 
6. 改密码：update user set password=password("123") where user="root";（别忘了最后加分号） 。 
7. 刷新权限（必须步骤）：flush privileges;　。 
8. 退出 quit。 
9. 注销系统，再进入，使用用户名root和刚才设置的新密码123登录。

#### 重启
```bash
service mysqld restart
```

> [mysql安装原文地址](https://www.cnblogs.com/julyme/p/5969626.html) <br>
> [修改mysql密码原文地址](https://blog.csdn.net/zcwforali/article/details/60597124) <br>
> [修改mysql权限](https://www.cnblogs.com/weifeng1463/p/7941625.html)
