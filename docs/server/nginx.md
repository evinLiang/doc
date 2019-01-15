---
sidebar: auto
---
# nginx
## nginx-反向代理
#### 进入nginx配置文件
```Bash
cd /etc/nginx/conf.d
```

#### 新建一个为.conf的文件（以vps.xxx.com为例）
```Bash
vi vps.xxx.com.conf
```

#### vps.xxx.com.conf设置
```Bash
server {
    listen 80;
    server_name vps.xxx.com;
    location / {
        proxy_pass http://127.0.0.1:3000;	//node的端口
    }
}
```

## 安装nginx(centos7)
#### 新建nginx文件夹

```bash
cd /
mkdir nginx
```
<!--more-->
https://www.cnblogs.com/garfieldcgf/p/6438898.html
#### 下载对应当前系统版本的nginx包(package)

```bash
wget  http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

#### 建立nginx的yum仓库

```bash
rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

#### 下载并安装nginx

```bash
yum install nginx
```

#### 启动nginx服务

```bash
systemctl start nginx
```

#### 配置

默认的配置文件在 /etc/nginx 路径下，使用该配置已经可以正确地运行nginx；如需要自定义，修改其下的 nginx.conf 等文件即可。



