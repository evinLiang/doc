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
跳转url：
``` js
window.location.href();
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

## js获取url的参数值
例子：doc.evinweb.com?parm='xxx'
``` js
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
console.log(getUrlParam(parm));	//输出xxx
```

## rem自适应类 (插件)
#### 1、rem是什么？
> [本文抄于ydui](http://vue.ydui.org/docs/#/flexible)
* rem (font size of the root element) 是相对根元素 ```<html>``` 的字体大小变化而变化的css单位，实现强大的屏幕适配布局是它的优势；
 所以不同屏幕大小的终端，它的根元素 ```<html>``` 的字体大小是需要相应变化的，一般由 JS 控制或者 media query 控制；
 本文不考虑 media query 方式，因为Android太多分辨率了，嗯~ 不说了...
* 既然 rem 是一个css单位，编写样式的时肯定得将设计图中的px转为rem，怎么转换取决于你的脚本怎么控制，于是有了本文；
#### 2、需要解决的问题
* 如何根据不同大小的屏幕修改根元素 ```<html>``` 的字体大小？
* 写样式时，如何将设计MM给的图轻松转换为css对应的rem？
#### 3、解决方案
* ydui.flexible.js 是处理移动端 rem 自适应（可伸缩布局方案）的类库，无须第三方工具（如Sass/Less方法、Gulp、Sublime插件），轻松口算设计稿对应rem值；
* ydui.flexible.js 源码：
``` js
/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  【例: 100px = 1rem，32px = .32rem】
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
```
#### 4、使用方法
* 在所有资源前加载 ydui.flexible.js；
* 在入口页面的 head 标签内引入（不建议在入口文件 main.js 中引入）；
* 建议放在自定义的css样式前面

* 把视觉稿中的px转换成rem；
* rem计算方式：设计图尺寸px / 100 = 实际rem 【例: 100px = 1rem，32px = 0.32rem】；
* 特别注意：是不需要再除以2的！！！
* 无论设计图什么尺寸，算法一致。但需修改 ydui.flexible.js 中 docWidth 变量为设计图宽度；默认设计图文档宽度为750px；
#### 5、一些不使用rem的CSS属性
* 包括但不限于：border-width、border-radius、box-shadow、transform、background-size；
#### 6、备用地址
[ydui.flexible.js](http://api.evinweb.com/plug-in/yduiFlexible/ydui.flexible.js)

## artTemplate JS模板引擎 (插件)
> 性能卓越的 js 模板引擎,具有性能卓越，执行速度通常是 Mustache 与 tmpl 的 20 多倍（性能测试）、支持运行时调试，
可精确定位异常模板所在语句（演示）、对 NodeJS Express 友好支持、安全，默认对输出进行转义、在沙箱中运行编译后的代码
（Node版本可以安全执行用户上传的模板）、支持include语句、可在浏览器端实现按路径加载模板（详情）、支持预编译，可将模板
转换成为非常精简的 js 文件、模板语句简洁，无需前缀引用数据，有简洁版本与原生语法版本可选、支持所有流行的浏览器

* [github](https://github.com/aui/art-template)
* [官网](https://aui.github.io/art-template/zh-cn/index.html)
* [下载](http://api.evinweb.com/plug-in/artTemplate/art-template.min.js)

#### JS引用
``` html
<script src="./template-web.js"></script>
```
#### 编写模板
使用一个 type="text/html" 的script标签存放模板：
``` html
<div id="content"></div>
<script id="tpl" type="text/html">
  <h1>{{title}}</h1>
  <ul>
  {{each list as value i}}
    <li>索引 {{i + 1}} ：{{value}}</li>
  {{/each}}
  </ul>
</script>
```
#### 渲染模板
``` js
var data = {
    title: '标签',
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('tpl', data);
document.getElementById('content').innerHTML = html;
```
#### 简洁语法
推荐使用，语法简单实用，利于读写。
``` js
{{if admin}}
  {{include 'admin_content'}}
  {{each list}}
    <div>{{$index}}. {{$value.user}}</div>
  {{/each}}
{{/if}}
```
#### 原生语法
``` js
<%if (admin){%>
  <%include('admin_content')%>
  <%for (var i=0;i<list.length;i++) {%>
    <div><%=i%>. <%=list[i].user%></div>
  <%}%>
<%}%>
```
#### 注册过滤器
``` js
template.defaults.imports.dateFormat = function(date, format){/*[code..]*/};
template.defaults.imports.timestamp = function(value){return value * 1000};
```
* 过滤器例子
``` html
<script id="test" type="text/html">
<div>
    {{if c==100}}
        <ul>
            {{each person}}
                <li>姓名：{{$value.name | adult}}--性别：{{$value.sex}}</li>
            {{/each}}
        </ul>

    {{/if}}
</div>
</script>
<script>
    var data = {
        c:100,
        person:[
            {name:"jack",age:18,sex:1},
            {name:"tom",age:19,sex:0},
            {name:"jerry",age:16,sex:0},
            {name:"kid",age:21,sex:1},
            {name:"jade",age:22,sex:0}
        ]
    };
    //自定义函数
	template.defaults.imports.adult = function(value){
		if(value >= 18){
			return "已成年"
		}else {
			return "没成年"
		}
	};
    var html = template("test",data);
    document.getElementById("app").innerHTML = html;
</script>
```

## FastClick.js 能够让你摆脱300毫秒的延迟 (插件)
> FastClick是一个非常方便的库，在移动浏览器上发生介于轻敲及点击之间的指令时，
> 能够让你摆脱300毫秒的延迟。FastClick可以让你的应用程序更加灵敏迅捷。支持各种移动浏览器，
> 比如Safari、Chrome、Opera等。 FastClick 是一个简单，易于使用的JS库用于消除在移动浏览器上
> 触发click事件与一个物理Tap(敲击)之间的300延迟。

* [github](https://github.com/ftlabs/fastclick)
* [下载](http://api.evinweb.com/plug-in/fastclick/fastclick.min.js)
#### JS引用
``` html
<script src="./fastclick.min.js"></script>
```
#### CDN引用
``` html
<script src="https://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
```
::: danger 注：
必须在页面所有Element之前加载脚本文件先实例化fastclick
:::
#### 在JS中添加fastclick的身体，推荐以下做法：
``` js
if ('addEventListener' in document) {  
    document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
    }, false);  
}  
```
#### 如果你使用了JQuery，那么JS引入就可以改用下面的写法：
``` js
$(function() {  
    FastClick.attach(document.body);  
});
```

## clipboard.js复制 (插件)
> 复制文字到剪切板不应该很难去实现。它不需要配置几十个步骤或者加载几百 KB 的文件。最重要的是，它不应该依赖 Flash 或其他臃肿的框架。
> 这是 clipboard.js 诞生的原因。
* [github](https://github.com/zenorocha/clipboard.js/)
* [官网](https://clipboardjs.com/)
* [下载](http://api.evinweb.com/plug-in/clipboard/clipboard.min.js)
#### 安装
你可以在npm上得到它。
``` Bash
npm install clipboard --save
```
或者，如果您不进行包管理，只需下载[ZIP文件](http://api.evinweb.com/plug-in/clipboard/clipboard.min.js)即可。
#### 应用
``` html
<script src="dist/clipboard.min.js"></script>
```
#### 初始化
``` js
new ClipboardJS('.btn');
```
#### DEMO
* constructor-node
``` html
<!-- 1. Define some markup -->
<div id="btn" data-clipboard-text="1">
	<span>Copy</span>
</div>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard by passing a HTML element -->
<script>
var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* constructor-nodelist
``` html
<!-- 1. Define some markup -->
<button data-clipboard-text="1">Copy</button>
<button data-clipboard-text="2">Copy</button>
<button data-clipboard-text="3">Copy</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard by passing a list of HTML elements -->
<script>
var btns = document.querySelectorAll('button');
var clipboard = new ClipboardJS(btns);

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* constructor-selector
``` html
<!-- 1. Define some markup -->
<button class="btn" data-clipboard-text="1">Copy</button>
<button class="btn" data-clipboard-text="2">Copy</button>
<button class="btn" data-clipboard-text="3">Copy</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard by passing a string selector -->
<script>
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* function-target
``` html
<!-- 1. Define some markup -->
<button class="btn">Copy</button>
<div>hello</div>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard -->
<script>
var clipboard = new ClipboardJS('.btn', {
	target: function() {
		return document.querySelector('div');
	}
});

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* function-text
``` html
<!-- 1. Define some markup -->
<button class="btn">Copy</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard -->
<script>
var clipboard = new ClipboardJS('.btn', {
	text: function() {
		return 'to be or not to be';
	}
});

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* target-div
``` html
<!-- 1. Define some markup -->
<div id="aaa">hellooooo</div>
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#aaa">Copy</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard -->
<script>
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* target-input
``` html
<!-- 1. Define some markup -->
<input id="foo" type="text" value="hello">
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#foo">Copy</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard -->
<script>
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
* target-textarea
``` html
<!-- 1. Define some markup -->
<textarea id="bar">hello</textarea>
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">Cut</button>

<!-- 2. Include library -->
<script src="../dist/clipboard.min.js"></script>

<!-- 3. Instantiate clipboard -->
<script>
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
	console.log(e);
});

clipboard.on('error', function(e) {
	console.log(e);
});
</script>
```
::: danger
ios 复制元素最好用button
:::

## 一些常用的js正则
#### 验证中文
``` js
var isChinese = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;	//验证中文
console.log(isChinese.test('中文'));	//true
```
#### 验证身份证
``` js
var isIdNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;	//验证身份证
console.log(isIdNo.test('440981199410236611'));	//true
```
#### 验证手机号
``` js
var isMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;	//验证手机号
console.log(isMobile.test('13800138000'));	//true
```
#### 验证邮箱
* 以数字字母开头，中间可以是多个数字字母下划线或'-'
* 然后是"@"符号，后面是数字字母
* 然后是".",符号加2-4个字母结尾
``` js
var isEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;	//验证邮箱
console.log(isEmail.test('163@163.cn'));	//true
```

## 微信键盘收回事件处理底部空白问题
``` js
$('.input-panel .input,.cell-select').on('blur',function(){
    setTimeout(function(){
        window.scrollTo(0, document.documentElement.clientHeight);
    },100)
})
```


