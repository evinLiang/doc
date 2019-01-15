---
sidebar: auto
---
# JAVASRIPT
## js控制浏览器窗口前进、后退、刷新、关闭、打开
关闭：
``` JS
window.close();
```
刷新：
``` JS
window.location.reload();
```
打开新窗口：
``` JS
window.open();
```
前进 ：
``` JS
window.history.go(1);    
window.history.forward();
```
后退：
``` JS
window.history.back();
window.history.go(-1);
```

## js 获取浏览器url
#### 以 http://kfive.cn/url.html 为例子
DOCUMENT.DOMAIN
``` JS
console.log(document.domain);  //显示: kfive.cn
```
WINDOW.LOCATION.HOST
``` JS
console.log(window.location.host);  //显示: kfive.cn
```
WINDOW.LOCATION.HREF
``` JS
console.log(window.location.href);  //显示: http://kfive.cn/url.html
```
SELF.LOCATION.HREF
``` JS
console.log(self.location.href);  //显示: http://kfive.cn/url.html
```
DOCUMENT.URL
``` JS
console.log(document.URL);  //显示:  http://kfive.cn/url.html
```
DOCUMENT.LOCATION
``` JS
console.log(document.location);  //显示：
Location {replace: ƒ, assign: ƒ, href: "http://kfive.cn/url.html", ancestorOrigins: DOMStringList, origin: "http://kfive.cn", …}
```
DOCUMENT.LOCATION.ORIGIN
``` JS
console.log(document.location.origin);  //显示: http://kfive.cn
```