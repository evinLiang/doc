---
sidebar: auto
---
# linux
## Liunx安装node
#### 注：记得开启端口
```Bash
iptables -A INPUT -p tcp -m tcp --dport 3000 -j ACCEPT
```

#### 配置完成，重启nginx
```Bash
systemctl restart nginx
```

##### 去node官网找下载链接 ( [http://nodejs.cn/download/](http://nodejs.cn/download/ "http://nodejs.cn/download/") )

<!--more-->

![](https://vin668.oss-cn-hangzhou.aliyuncs.com/linux_node1.jpg)

##### 找到相对应的安装包链接

![](https://vin668.oss-cn-hangzhou.aliyuncs.com/linux_node2.jpg)

##### 安装包链接如下：
https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz

##### 3.服务器进入要下载的地址，并且下载、解压

进入要下载的目录
```bash
cd /usr/local/src
```
进入要下载的目录
```bash
wget https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz
```
因为是tar.xz格式所以要解压两次
```bash
xz –d node-v10.8.0-linux-x64.tar.xz
tar –xvf node-v10.8.0-linux-x64.tar
```
##### 4.Node 环境配置（这样可以使得在任何目录下，都可以使用/usr/local/src/ node-v8.9.3-linux-x64/bin 下得node命令）
修改 /etc/profile 文件
在最后面加
```bash
export NODE_HOME=/usr/local/src/node-v10.8.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```

保存
```bash
:wq
```
使配置文件生效
```bash
source /etc/profile
```
查看效果
```bash
node –v
v10.8.0
```