---
sidebar: auto
---
# node
## Liunx安装node
#### 注：记得开启端口
```Bash
iptables -A INPUT -p tcp -m tcp --dport 3000 -j ACCEPT
```

#### 配置完成，重启nginx
```Bash
systemctl restart nginx
```

#### 去node官网找下载链接 ( [http://nodejs.cn/download/](http://nodejs.cn/download/ "http://nodejs.cn/download/") )

<!--more-->

![](https://vin668.oss-cn-hangzhou.aliyuncs.com/linux_node1.jpg)

#### 找到相对应的安装包链接

![](https://vin668.oss-cn-hangzhou.aliyuncs.com/linux_node2.jpg)

#### 安装包链接如下：
[https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz](https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz)

#### 服务器进入要下载的地址，并且下载、解压

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
#### Node 环境配置（这样可以使得在任何目录下，都可以使用/usr/local/src/ node-v8.9.3-linux-x64/bin 下得node命令）
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

## 使用json-server模拟REST API
> 在开发过程中，前后端不论是否分离，接口多半是滞后于页面开发的。所以建立一个REST风格的API接口，给前端页面提供虚拟的数据，是非常有必要的。
> 对比过多种mock工具后，我最终选择了使用 json server 作为工具，因为它足够简单，写少量数据，即可使用。
> 也因为它足够强大，支持CORS和JSONP跨域请求，支持GET, POST, PUT, PATCH 和 DELETE 方法，更提供了一系列的查询方法，
> 如limit，order等。下面我将详细介绍 json server 的使用。
#### 全局安装json-server
``` Bash
cnpm install -g json-server
```
#### 新建一个文件夹，并且npm init
``` Bash
mkdir jsonserver && cd jsonserver
npm init
```
#### 安装json-server
``` Bash
cnpm install json-sever --save
```
#### 设置npm启动
``` json
"scripts": {
   "json:server": "json-server --watch db.json"
}
```
#### 新建一个db.json文件
```json
{
	"users": [{
			"name": "Henry",
			"phone": "333-444-555",
			"email": "Henry@gmail.com",
			"id": 1,
			"age": 30,
			"companyId": 1
		},
		{
			"name": "kobe",
			"phone": "333-444-556",
			"email": "kobe@gmail.com",
			"id": 2,
			"age": 34,
			"companyId": 2
		},
		{
			"name": "james",
			"phone": "333-444-557",
			"email": "james@gmail.com",
			"id": 3,
			"age": 28,
			"companyId": 3
		},
		{
			"name": "wade",
			"phone": "333-444-558",
			"email": "wade@gmail.com",
			"id": 4,
			"age": 50,
			"companyId": 3
		}
	],
	"companies": [{
			"id": 1,
			"name": "Apple",
			"description": "Apple is good"
		},
		{
			"id": 2,
			"name": "Microsoft",
			"description": "Microsoft is good"
		},
		{
			"id": 3,
			"name": "Google",
			"description": "Google is good"
		}
	]
}

```

#### 运行npm
``` Bash
npm run json:server
```
#### 案例
``` js
http://localhost:3000/users?id=2
```
* [npm](https://www.npmjs.com/package/json-server)
* [详细例子 express+json-server](https://github.com/evinLiang/code_api)

## node express获取微信的openid
#### 安装express
```Bash
#Express 应用程序生成器
npm install express-generator -g
#新建express 项目
express --view=pug myapp
#进入目录并且安装依赖
cd myapp & cnpm install
#启动
npm start
```
#### 安装request模块
```Bash
cnpm i request --save
```

#### routes/index.js 路由文件修改
```js
var express = require('express');
var router = express.Router();
var request = require('request');

//下面是微信测试号的账号信息
var AppID = 'wxe89cb7081ce1fc3b';
var AppSecret = 'e93c8c192bee2ca6ea0f54a37c4f7c47';

/* GET home page. */
router.get('/', function (req, res, next) {
  var router = 'get_wx_access_token';
  var return_uri = 'http://testwechat.com/' + router;
  var scope = 'snsapi_userinfo';
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect');
  //res.render('index', { title: 'Express' });
});

router.get('/get_wx_access_token', function (req, res, next) {
  var code = req.query.code;
  console.log(code)
  request.get(
    {
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppID + '&secret=' + AppSecret + '&code=' + code + '&grant_type=authorization_code',
    }, function (error, response, body) {
      if (response.statusCode == 200) {

        // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
        //console.log(JSON.parse(body));
        var data = JSON.parse(body);
        var access_token = data.access_token;
        var openid = data.openid;
        console.log(data);
        request.get(
          {
            url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
          }, function (error, response, body) {
            if (response.statusCode == 200) {
              var userinfo = JSON.parse(body);
              console.log(userinfo);
              // console.log(userinfo.nickname);
              // console.log(userinfo.headimgurl);
              // console.log(userinfo.city);
              // res.send("\
              //     <h1>"+userinfo.nickname+" 的个人信息</h1>\
              //     <p><img src='"+userinfo.headimgurl+"' /></p>\
              //     <p>"+userinfo.city+"，"+userinfo.province+"，"+userinfo.country+"</p>\
              // ");
              res.render('index', { userinfo: userinfo });
            }
          })
      }
    }
  )
});

module.exports = router;

```