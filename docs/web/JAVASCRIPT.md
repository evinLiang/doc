---
sidebar: auto
---
# JAVASRIPT
## js控制浏览器窗口前进、后退、刷新、关闭、打开
关闭：
``` js
window.close();
```
刷新：
``` js
window.location.reload();
```
打开新窗口：
``` js
window.open();
```
前进 ：
``` js
window.history.go(1);    
window.history.forward();
```
后退：
``` js
window.history.back();
window.history.go(-1);
```

## js 获取浏览器url
#### 以 http://kfive.cn/url.html 为例子
DOCUMENT.DOMAIN
``` js
console.log(document.domain);  //显示: kfive.cn
```
WINDOW.LOCATION.HOST
``` js
console.log(window.location.host);  //显示: kfive.cn
```
WINDOW.LOCATION.HREF
``` js
console.log(window.location.href);  //显示: http://kfive.cn/url.html
```
SELF.LOCATION.HREF
``` js
console.log(self.location.href);  //显示: http://kfive.cn/url.html
```
DOCUMENT.URL
``` js
console.log(document.URL);  //显示:  http://kfive.cn/url.html
```
DOCUMENT.LOCATION
``` js
console.log(document.location);  //显示：
Location {replace: ƒ, assign: ƒ, href: "http://kfive.cn/url.html", ancestorOrigins: DOMStringList, origin: "http://kfive.cn", …}
```
DOCUMENT.LOCATION.ORIGIN
``` js
console.log(document.location.origin);  //显示: http://kfive.cn
```