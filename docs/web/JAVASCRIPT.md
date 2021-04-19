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
#### 终极解法
```js
// 微信键盘收回事件处理底部空白问题
$('.entered-form .weui-input, .entered-form .weui-select').on('blur', function () {
    var ua = window.navigator.userAgent;
    var app = window.navigator.appVersion;
    var speed = 1;
    var currentPosition;
    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        setTimeout(function () {
        currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition);//页面向上滚动
        currentPosition += speed;
        window.scrollTo(0, currentPosition);//页面向下滚动
        }, 100)
    }
})
```

## 页面禁止复制和右键
```js
document.oncontextmenu = new Function("event.returnValue=false");
document.onselectstart = new Function("event.returnValue=false");
```

## json和js对象转换
`JSON.stringify()` 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，如果指定了replacer是一个函数，则可以选择性的替换值，或者如果指定了replacer是一个数组，可选择性的仅包含数组指定的属性。
```js
JSON.stringify(value)
JSON.stringify(value[, replacer [, space]])
```
`JSON.parse()` 方法是：在接收服务器数据时一般是字符串。我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。
```js
JSON.parse(text)
JSON.parse(text[, reviver])
```

## async/await处理异步回调
注：一般情况要与`promise`一起使用
栗子：
```js
//ajax请求栗子
ajaxFun() {
    return new Promise((resolve, reject) => {
        $.ajax({ ... })
        .done(function(res) {
            resolve(res);
        })
        .fail(function(err) {
            reject(err);
        })
    })
}

// async/await 注：可以用try/catch 处理报错
async getData() {
    try {
        const data = await ajaxFun();   //data就是Promise返回的resolve
    } catch (err) {
        console.log(err);   //err就是报错返回的err
    }
}
```

## jquery 移除元素的绑定事件
```js
$("button").click(function(){
  $("p").unbind();
});
```

## 判断是否在数组中
```js
if(arr.indexOf(元素值) > -1){
    //元素在数组中
}
```

## 字符串和数组转换
1、数组转字符串
需要将数组元素用某个字符连接成字符串，示例代码如下：
```js
var a, b;
a = new Array(0,1,2,3,4);
b = a.join("-");      //"0-1-2-3-4"
```
2、字符串转数组
实现方法为将字符串按某个字符切割成若干个字符串，并以数组形式返回，示例代码如下：
```js
var s = "abc,abcd,aaa";
ss = s.split(",");// 在每个逗号(,)处进行分解  ["abc", "abcd", "aaa"]
var s1 = "helloworld";
ss1 = s1.split('');  //["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
```

## 部分安卓机window.localhost.href无效
#### 在后面加个时间戳或者随机数
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<button id="reload">刷新本页</button>
	<script src="https://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script>
		$(function(){
			$("#reload").click(function(event) {
				window.location.href=window.location.href+'?time'+(new Date().getTime());
			});
		})
	</script>
</body>
</html>
```

## 删除数组的重复值
```js
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'apple'];
// 第一种方法
var uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits);  // ["banana", "apple", "orange", "watermelon"]
// 第二种方式
var uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2);  // ["banana", "apple", "orange", "watermelon"]
```

## 替换数组中的特定值
#### 有时在创建代码时需要替换数组中的特定值，有一种很好的简短方法可以做到这一点，咱们可以使用<code>.splice(start、value to remove、valueToAdd)</code>，这些参数指定咱们希望从哪里开始修改、修改多少个值和替换新值。
```js
var userName = ['小常0', '小常1', '小常2', '小常3', '小常4'];
userName.splice(0, 2, '位置更换1', '位置更换2')
console.log(userName) // ["位置更换1", "位置更换2", "小常2", "小常3", "小常4"]
```

## Array.from 达到 .map 的效果
#### 咱们都知道 <code>.map() </code>方法，<code>.from()</code> 方法也可以用来获得类似的效果且代码也很简洁。
```js
var friends = [
    { name: '张三', age: 20 },
    { name: '黄五', age: 22 },
    { name: '李四', age: 30 },
    { name: '梁一', age: 18 },
    { name: '郑二', age: 15 }
]
// .from() 方法
var friendsName = Array.from(friends, ({name}) => name) // {name} 结构赋值
console.log(friendsName)  //["张三", "黄五", "李四", "梁一", "郑二"]
// .map()方法
var friendsNameMap = friends.map(({name}) => name)
console.log(friendsNameMap) //["张三", "黄五", "李四", "梁一", "郑二"]
```

## 置空数组
#### 有时候我们需要清空数组，一个快捷的方法就是直接让数组的 length 属性为 0，就可以清空数组了。
```js
var friendsT = [
    { name: '张三', age: 20 },
    { name: '黄五', age: 22 },
    { name: '李四', age: 30 },
    { name: '梁一', age: 18 },
    { name: '郑二', age: 15 }
]
friendsT.length = 0;
console.log(friendsT);  // []
```

## 将数组转换为对象
#### 有时候，出于某种目的，需要将数组转化成对象，一个简单快速的方法是就使用展开运算符号(...):
```js
var friendsArr = ['张三', '李四', '黄五'];
var friendsStr = {...friendsArr};
console.log(friendsStr) //{0: "张三", 1: "李四", 2: "黄五"}
```

## 用数据填充数组
#### 在某些情况下，当咱们创建一个数组并希望用一些数据来填充它，这时 .fill()方法可以帮助咱们。
```js
var newArray = new Array(10).fill('1'); 
console.log(newArray);  // ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
```

## 数组合并
#### 使用展开操作符，也可以将多个数组合并起来。
```js
var fruitsArr = ['apple', 'banana', 'orange']
var meatArr = ['poultry', 'beef', 'fish']
var vegetablesArr = ['potato', 'tomato', 'cucumber']
var food = [...fruitsArr, ...meatArr, ...vegetablesArr]
console.log(food) // ["apple", "banana", "orange", "poultry", "beef", "fish", "potato", "tomato", "cucumber"]
```

## 判断数组是否有某个值
#### 可以用indexOf和includes
```js
var numList = [10, 20, 30]
var numIndex1 = 20
var numIndex2 = 40
console.log(numList.includes(numIndex1))  // true
console.log(numList.includes(numIndex2))  // false
console.log(numList.indexOf(numIndex1))  // 1 表示在数组的某一个位置
console.log(numList.indexOf(numIndex2))  // -1 表示不在
```

## 求两个数组的交集
#### 求两个数组的交集在面试中也是有一定难度的正点，为了找到两个数组的交集，首先使用上面的方法确保所检查数组中的值不重复，接着使用.filter 方法和.includes方法。如下所示：
```js
var numOne = [0,2,4,6,8,8]
var numTwo = [1,2,3,4,5,6]
var duplicatedValues = [...new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues) //  [2, 4, 6]
```

## 从数组中删除虚值
#### 在 JS 中，虚值有 false, 0，''， null, NaN, undefined。咱们可以 .filter() 方法来过滤这些虚值。
```js
var mixedArr = [0, 'blue', '', NaN, 9, true, undefined, 'white', false]
var trueArr = mixedArr.filter(Boolean)
console.log(trueArr)  // ["blue", 9, true, "white"]
```

## 从数组中获取随机值
#### 有时我们需要从数组中随机选择一个值。一种方便的方法是可以根据数组长度获得一个随机索引，如下所示：
```js
var names = ['随机1', '随机2', '随机3', '随机4','随机5']
var randomName = names[(Math.floor(Math.random() * (names.length)))]
console.log(randomName) // 随机4
```

## 反转数组
#### 现在，咱们需要反转数组时，没有必要通过复杂的循环和函数来创建它，数组的 reverse 方法就可以做了
```js
var namesj = ['随机1', '随机2', '随机3', '随机4','随机5']
var reverseColors = namesj.reverse()
console.log(reverseColors)  //["随机5", "随机4", "随机3", "随机2", "随机1"]
```

## indexOf和lastIndexOf() 方法
#### indexOf 是查某个指定的字符串在字符串首次出现的位置（索引值） （也就是从前往后查）lastIndexOf 是从右向左查某个指定的字符串在字符串中最后一次出现的位置（也就是从后往前查）
```js
var nums = [1,5,1,1,5,19,12,63,5,10]
var lastIndex = nums.lastIndexOf(5)
var firstIndex = nums.indexOf(5)
console.log(lastIndex)  // 8
console.log(firstIndex) // 1
```

## 对数组中的所有值求和
#### JS 面试中也经常用 reduce 方法来巧妙的解决问题
```js
var numList2 = [1,5,6,7]
var sum = numList2.reduce((x, y)=> x + y)
console.log(sum)  // 19
```

## 设置一个月的某一天:
#### setDate() 是设置第几天
```js
var theDate = new Date(); // 例如：2020-1-8
theDate.setDate(1);
console.log(theDate); // 2020-1-1
```

## vue params传参
#### params传参只能用name来引入路由
```js
this.$router.push({
    name: 'detail',
    params: {
        id: id
    }
})
```
## vue 监听路由变化
```js
watch: {
  '$route': '函数'
}
```

## 滚动底部加载
```js
var hasNewData = true;  // 控制是否可以执行加载
$(document).scroll(function () {
    var scroH = $(document).scrollTop();  //滚动高度
    var contentH = $(document).height();  //内容高度
    var viewH = $(window).height();  //可见高度 
    if (scroH >= (contentH - viewH) && hasNewData) {  // 判断是否滚动条是否滚到底部，并且还有数据
        wu.showLoading();
        setTimeout(function () {
        hasNewData = false; // 把hasNewData改成false，防止多次请求
        wu.hideToast(); //隐藏loading
        //ajax... 请求数据
        // 没有数据,把hasNewData改成false
        hasNewData = false;
        // 还有数据,把hasNewData改成true,滚动到底部可以再次请求
        hasNewData = true;
        wu.showToast({
            title: '数据更新成功'
        })
        }, 2000)
    }
    })
```

## canvas合并图片

### 直接看例子和效果
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
      /* box-sizing: border-box; */
    }

    #canvas {
      display: none;
      border-radius: 5px;
    }
    #imgContent {
      position: fixed;
      z-index: 10;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
</head>

<body>
  <canvas id="canvas"></canvas>
  <div id="imgContent"></div>
  <script>
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

    // 设置画布大小
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerWidth * 0.8;

    let mulitImg = [
        'https://picwx.suofeiya.com.cn/applet_images/redpacket_applet/images/real_prize.png',
        'https://picwx.suofeiya.com.cn/applet_images/redpacket_applet/images/img_11.png'
    ];
    let promiseAll = [], img = [], imgTotal = mulitImg.length;
    for(let i = 0 ; i < imgTotal ; i++){
        promiseAll[i] = new Promise((resolve, reject)=>{
            img[i] = new Image()
            img[i].crossOrigin = 'anonymous'
            img[i].src = mulitImg[i]
            img[i].onload = function(){
                  //第i张加载完成
                  resolve(img[i])
            }
        })
    }
    Promise.all(promiseAll).then((img)=>{
        //全部加载完成
        ctx.drawImage(img[0], 0, 0, canvas.width, canvas.height)
        smallImgLeft = (window.innerWidth * 0.8 - window.innerWidth*0.2) / 2
        smallImgTop = (window.innerWidth * 0.8 - window.innerWidth*0.2) / 2
        ctx.drawImage(img[1], smallImgLeft, 50, window.innerWidth*0.2, window.innerWidth*0.2)
        // 设置字体
        ctx.font = "18px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "#ff0";
        // 设置水平对齐方式
        // ctx.textAlign = "center";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        ctx.fillText("中国女排", smallImgLeft, window.innerWidth*0.2+120);

        var dataImg = new Image()
        dataImg.src = canvas.toDataURL('image/png')
        document.getElementById('imgContent').appendChild(dataImg) // 长按图片保存
    }).catch((res)=>{
      console.log(res)
    })
  </script>
</body>

</html>
```

### 效果
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/2.png)

### 难点

#### 往往图片是异步或者跨域加载的，所以图片要做跨域处理
```js
img.crossOrigin = 'anonymous'
```
#### 图片如果是异步加载，需要判断图片是否加载完，如果多张图片可以用到es6的promise的all
参考：[https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz](https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz)

单张图片（图片动态生成）
```js
 var img = new Image()
 img.src = 'http://www.daqianduan.com/wp-content/uploads/2014/11/hs-xiu.jpg'
 img.onload = function(){
    // 加载完成 
 }
```
单张图片（结合ES6 Promise）
```js
//js
 new Promise((resolve, reject)=>{
    let img = new Image()
    img.src = 'http://www.daqianduan.com/wp-content/uploads/2014/11/hs-xiu.jpg'
    img.onload = function(){
       // 加载完成 
       resolve(img)
    }
 }).then((img)=>{
    //code
 })
```
多张图片
```js
var img = [],  
    flag = 0, 
    mulitImg = [
    'http://www.daqianduan.com/wp-content/uploads/2017/03/IMG_0119.jpg',
    'http://www.daqianduan.com/wp-content/uploads/2017/01/1.jpg',
    'http://www.daqianduan.com/wp-content/uploads/2015/11/jquery.jpg',
    'http://www.daqianduan.com/wp-content/uploads/2015/10/maid.jpg'
 ];
 var imgTotal = mulitImg.length;
 for(var i = 0 ; i < imgTotal ; i++){
    img[i] = new Image()
    img[i].src = mulitImg[i]
    img[i].onload = function(){
       //第i张图片加载完成
       flag++
       if( flag == imgTotal ){
          //全部加载完成
       }
    }
 }
```
多张图片（结合ES6 Promise.all()）
```js
let mulitImg = [
     'http://www.daqianduan.com/wp-content/uploads/2017/03/IMG_0119.jpg',
     'http://www.daqianduan.com/wp-content/uploads/2017/01/1.jpg',
     'http://www.daqianduan.com/wp-content/uploads/2015/11/jquery.jpg',
     'http://www.daqianduan.com/wp-content/uploads/2015/10/maid.jpg'
 ];
 let promiseAll = [], img = [], imgTotal = mulitImg.length;
 for(let i = 0 ; i < imgTotal ; i++){
     promiseAll[i] = new Promise((resolve, reject)=>{
         img[i] = new Image()
         img[i].src = mulitImg[i]
         img[i].onload = function(){
              //第i张加载完成
              resolve(img[i])
         }
     })
 }
 Promise.all(promiseAll).then((img)=>{
     //全部加载完成
 })
```

## 去除html标签
```js
export const removeHtmltag = (str) => {
    return str.replace(/<[^>]+>/g, '')
}
```

## 获取url参数2
```js
export const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const search = window.location.search.split('?')[1] || '';
    const r = search.match(reg) || [];
    return r[2];
}
```

## 动态引入js
```js
export const injectScript = (src) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}
```

## 根据url地址下载
```js
export const download = (url) => {
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    if (isChrome || isSafari) {
        var link = document.createElement('a');
        link.href = url;
        if (link.download !== undefined) {
            var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }
    window.open(url, '_self');
    return true;
}
```

## el是否包含某个class
```js
export const hasClass = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
```
## el添加某个class
```js
export const addClass = (el, className) => {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
```
## el去除某个class
```js
export const removeClass = (el, className) => {
    if (!hasClass(el, className)) {
        return
    }
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, ' ')
}
```

## 获取滚动的坐标
```js
export const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```
## 滚动到顶部
```js
export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}
```
## el是否在视口范围内
```js
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
```
## 洗牌算法随机
```js
export const shuffle = (arr) => {
    var result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}
```
## 劫持粘贴板
```js
export const copyTextToClipboard = (value) => {
    var textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}
```
## 判断类型集合
```js
export const checkStr = (str, type) => {
    switch (type) {
        case 'phone':   //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':     //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':    //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal':  //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ':      //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':   //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':   //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':     //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP':      //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':    //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number':  //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case 'lower':   //小写
            return /^[a-z]+$/.test(str);
        case 'upper':   //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML':    //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
}
```
## 严格的身份证校验
```js
export const isCardID = (sId) => {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        console.log('你输入的身份证长度或格式错误')
        return false
    }
    //身份证城市
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
        console.log('你的身份证地区非法')
        return false
    }

    // 出生日期验证
    var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
        d = new Date(sBirthday)
    if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        console.log('身份证上的出生日期非法')
        return false
    }

    // 身份证号码校验
    var sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432"
    for (var i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
        console.log('你输入的身份证号非法')
        return false
    }

    return true
}
```
## 随机数范围
```js
export const random = (min, max) => {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min))
    } else {
        return null;
    }
}
```
## 将阿拉伯数字翻译成中文的大写数字
```js
export const numberToChinese = (num) => {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}
```
## 将数字转换为大写金额
```js
export const changeToChinese = (Num) => {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {
        Num = new String(Num);
    };
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
    };
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split(".");
    var newchar = "";
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若数量超过拾亿单位，提示
        }
        var tmpnewchar = ""
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}
```
## 判断一个元素是否在数组中
```js
export const contains = (arr, val) => {
    return arr.indexOf(val) != -1 ? true : false;
}
```
## 数组排序，{type} 1：从小到大 2：从大到小 3：随机
```js
export const sort = (arr, type = 1) => {
    return arr.sort((a, b) => {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}
```
## 去重
```js
export const unique = (arr) => {
    if (Array.hasOwnProperty('from')) {
        return Array.from(new Set(arr));
    } else {
        var n = {}, r = [];
        for (var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i]] = true;
                r.push(arr[i]);
            }
        }
        return r;
    }
}
```
## 求两个集合的并集
```js
export const union = (a, b) => {
    var newArr = a.concat(b);
    return this.unique(newArr);
}
```
## 求两个集合的交集
```js
export const intersect = (a, b) => {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function (o) {
        return _this.contains(b, o) ? o : null;
    });
}
```
## 删除其中一个元素
```js
export const remove = (arr, ele) => {
    var index = arr.indexOf(ele);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
```
## 将类数组转换为数组
```js
export const formArray = (ary) => {
    var arr = [];
    if (Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    };
    return arr;
}
```
## 最大值
```js
export const max = (arr) => {
    return Math.max.apply(null, arr);
}
```
## 最小值
```js
export const min = (arr) => {
    return Math.min.apply(null, arr);
}
```
## 求和
```js
export const sum = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur
    })
}
```
## 平均值
```js
export const average = (arr) => {
    return this.sum(arr) / arr.length
}
```
## 去除空格,type: 1-所有空格 2-前后空格 3-前空格 4-后空格
```js
export const trim = (str, type) => {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}
```
## 字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
```js
export const changeCase = (str, type) => {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                } else {
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}
```
## 检测密码强度
```js
export const checkPwd = (str) => {
    var Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}
```
## 函数节流器
```js
export const debouncer = (fn, time, interval = 200) => {
    if (time - (window.debounceTimestamp || 0) > interval) {
        fn && fn();
        window.debounceTimestamp = time;
    }
}
```
## 在字符串中插入新字符串
```js
export const insertStr = (soure, index, newStr) => {
    var str = soure.slice(0, index) + newStr + soure.slice(index);
    return str;
}
```
## 判断两个对象是否键值相同
```js
export const isObjectEqual = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
```
## 16进制颜色转RGBRGBA字符串
```js
export const colorToRGB = (val, opa) => {

    var pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
    var isOpa = typeof opa == 'number'; //判断是否有设置不透明度

    if (!pattern.test(val)) { //如果值不符合规则返回空字符
        return '';
    }

    var v = val.replace(/#/, ''); //如果有#号先去除#号
    var rgbArr = [];
    var rgbStr = '';

    for (var i = 0; i < 3; i++) {
        var item = v.substring(i * 2, i * 2 + 2);
        var num = parseInt(item, 16);
        rgbArr.push(num);
    }

    rgbStr = rgbArr.join();
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
    return rgbStr;
}
```
## 追加url参数
```js
export const appendQuery = (url, key, value) => {
    var options = key;
    if (typeof options == 'string') {
        options = {};
        options[key] = value;
    }
    options = $.param(options);
    if (url.includes('?')) {
        url += '&' + options
    } else {
        url += '?' + options
    }
    return url;
}
```

## Navigator.sendBeacon() 关闭网页时异步发送数据
#### 原文地址 [https://www.cnblogs.com/MrZhujl/p/11699106.html](https://www.cnblogs.com/MrZhujl/p/11699106.html)

用户卸载网页的时候，有时需要向服务器发一些数据。很自然的做法是在unload事件或beforeunload事件的监听函数里面，使用XMLHttpRequest对象发送数据。但是，这样做不是很可靠，因为XMLHttpRequest对象是异步发送，很可能在它即将发送的时候，页面已经卸载了，从而导致发送取消或者发送失败。
解决方法就是 AJAX 通信改成同步发送，即只有发送完成，页面才能卸载。但是，很多浏览器已经不支持同步的 XMLHttpRequest 对象了（即open()方法的第三个参数为false）。
```js
window.addEventListener('unload', logData, false);
function logData() {
　　var client = new XMLHttpRequest();
　　// 第三个参数表示同步发送
　　client.open('POST', '/log', false);
　　client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
　　client.send(analyticsData);
}
```
上面代码指定XMLHttpRequest同步发送，很多浏览器都已经不支持这种写法。
同步通信有几种变通的方法。一种做法是新建一个<code>img</code>元素，数据放在src属性，作为 URL 的查询字符串，这时浏览器会等待图片加载完成（服务器回应），再进行卸载。另一种做法是创建一个循环，规定执行时间为几秒钟，在这几秒钟内把数据发出去，然后再卸载页面。
这些做法的共同问题是，卸载的时间被硬生生拖长了，后面页面的加载被推迟了，用户体验不好。
为了解决这个问题，浏览器引入了Navigator.sendBeacon()方法。这个方法还是异步发出请求，但是请求与当前页面脱钩，作为浏览器的任务，因此可以保证会把数据发出去，不拖延卸载流程。
```js
window.addEventListener('unload', logData, false);
function logData() {
    navigator.sendBeacon('/log', analyticsData);
}
```
Navigator.sendBeacon方法接受两个参数，第一个参数是目标服务器的 URL，第二个参数是所要发送的数据（可选），可以是任意类型（字符串、表单对象、二进制对象等等）。
```js
navigator.sendBeacon(url, data)
```
这个方法的返回值是一个布尔值，成功发送数据为true，否则为false。
该方法发送数据的 HTTP 方法是 POST，可以跨域，类似于表单提交数据。它不能指定回调函数。
下面是一个例子。
```js
// HTML 代码如下
// <body "analytics('start')" οnunlοad="analytics('end')">
function analytics(state) {
    if (!navigator.sendBeacon) return;
    var URL = 'http://example.com/analytics';
    var data = 'state=' + state + '&location=' + window.location;
    navigator.sendBeacon(URL, data);
}
```
## JavaScript数组方法
在JavaScript中，数组是一个特殊的变量，用于存储不同的元素。它具有一些内置属性和方法，可用于根据需要添加，删除，迭代或操作数。并且了解JavaScript数组方法可以提升你的开发技能。
### some()
此方法为参数传递的函数测试数组。如果有一个元素与测试元素匹配，则返回true，否则返回false。
::: tip
译者注： some() 不会对空数组进行检测；some() 不会改变原始数组。
:::
```js
const myAwesomeArray = ["a", "b", "c", "d", "e"]
myAwesomeArray.some(test => test === "d")
//-------> Output : true
```
### reduce()
此方法接收一个函数作为累加器。它为数组中的每个元素依次执行回调函数，不包括数组中被删除或者从未被赋值的元素。函数应用于累加器，数组中的每个值最后只返回一个值。
::: tip
译者注：reduce() 方法接受四个参数：初始值（上一次回调的返回值），当前元素值，当前索引，原数组。
:::
```js
const myAwesomeArray = [1, 2, 3, 4, 5]
myAwesomeArray.reduce((total, value) => total * value)
// 1 * 2 * 3 * 4 * 5
//-------> Output = 120
```
### Every()
此方法是对数组中每项运行给定函数，如果数组的每个元素都与测试匹配，则返回true，反之则返回false。
```js
const myAwesomeArray = ["a", "b", "c", "d", "e"]
myAwesomeArray.every(test => test === "d")
// -------> Output : falseconst myAwesomeArray2 = ["a", "a", "a", "a", "a"]
myAwesomeArray2.every(test => test === "a")
//-------> Output : true
```
### map()
该方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。它按照原始数组元素顺序依次处理元素。
::: tip
译者注：map() 不会对空数组进行检测；map() 不会改变原始数组。
:::
```js
const myAwesomeArray = [5, 4, 3, 2, 1]myAwesomeArray.map(x => x * x)
//-------> Output : 25
//                  16
//                  9
//                  4
//                  1
```
### flat()
此方法创建一个新数组，其中包含子数组上的holden元素，并将其平整到新数组中。请注意，此方法只能进行一个级别的深度。
```js
const myAwesomeArray = [[1, 2], [3, 4], 5]
myAwesomeArray.flat()
//-------> Output : [1, 2, 3, 4, 5]
```
### filter()
该方法接收一个函数作为参数。并返回一个新数组，该数组包含该数组的所有元素，作为参数传递的过滤函数对其返回true。
::: tip
译者注：filter（）方法是对数据中的元素进行过滤，也就是说是不能修改原数组中的数据，只能读取原数组中的数据，callback需要返回布尔值；为true的时候，对应的元素留下来；为false的时候，对应的元素过滤掉。
:::
```js
const myAwesomeArray = [  { id: 1, name: "john" },  
{ id: 2, name: "Ali" },  { id: 3, name: "Mass" },  
{ id: 4, name: "Mass" },]
myAwesomeArray.filter(element => element.name === "Mass")
//-------> Output : 0:{id: 3, name: "Mass"},
//                  1:{id: 4, name: "Mass"}
```
### forEach()
此方法用于调用数组的每个元素。并将元素传递给回调函数。
::: tip
译者注: forEach() 对于空数组是不会执行回调函数的。
:::
```js
const myAwesomeArray = [  { id: 1, name: "john" },  
{ id: 2, name: "Ali" },  { id: 3, name: "Mass" },]
myAwesomeArray.forEach(element => console.log(element.name))
//-------> Output : john
//                  Ali
//                  Mass
```
### findIndex()
此方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。它为数组中的每个元素都调用一次函数执行，当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1
::: tip
译者注：findIndex() 对于空数组，函数是不会执行的， findIndex() 并没有改变数组的原始值。
:::
```js
const myAwesomeArray = [  { id: 1, name: "john" },  
{ id: 2, name: "Ali" },  { id: 3, name: "Mass" },]myAwesomeArray.findIndex(element => element.id === 3)// -------> Output : 2myAwesomeArray.findIndex(element => element.id === 7)//-------> Output : -1
```
### find()
此方法返回通过测试（函数内判断）的数组的第一个元素的值。find() 方法为数组中的每个元素都调用一次函数执行：当数组中的元素在测试条件时回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined。
::: tip
译者注: find() 对于空数组，函数是不会执行的；find() 并没有改变数组的原始值。
:::
```js
const myAwesomeArray = [  { id: 1, name: "john" }, 
 { id: 2, name: "Ali" },  { id: 3, name: "Mass" },]
 myAwesomeArray.find(element => element.id === 3)
 // -------> Output : {id: 3, name: "Mass"}
 myAwesomeArray.find(element => element.id === 7)
 //-------> Output : undefined
```
### sort()
此方法接收一个函数作为参数。它对数组的元素进行排序并返回它。也可以使用含有参数的sort()方法进行排序。
```js
const myAwesomeArray = [5, 4, 3, 2, 1]
// Sort from smallest to largestmyAwesomeArray.sort((a, b) => a - b)
//  -------> Output : [1, 2, 3, 4, 5]
// Sort from largest to smallestmyAwesomeArray.sort((a, b) => b - a)
//-------> Output : [5, 4, 3, 2, 1]
```
### concat()
此方法用于连接两个或多个数组/值，它不会改变现有的数组。而仅仅返回被连接数组的一个新数组。
```js
const myAwesomeArray = [1, 2, 3, 4, 5]const 
myAwesomeArray2 = [10, 20, 30, 40, 50]
myAwesomeArray.concat(myAwesomeArray2)
//-------> Output : [1, 2, 3, 4, 5, 10, 20, 30, 40, 50]
```
### fill()
此方法的作用是使用一个固定值来替换数组中的元素。该固定值可以是字母、数字、字符串、数组等等。它还有两个可选参数，表示填充起来的开始位置（默认为0）与结束位置（默认为array.length）。
::: tip
译者注：fill() 方法用于将一个固定值替换数组的元素。
:::
```js
const myAwesomeArray = [1, 2, 3, 4, 5]
// The first argument (0) is the value
// The second argument (1) is the starting index
// The third argument (3) is the ending indexmyAwesomeArray.fill(0, 1, 3)
//-------> Output : [1, 0, 0, 4, 5]
```
### includes()
此方法用于判断字符串是否包含指定的子字符串。如果找到匹配的字符串则返回 true，否则返回 false。
::: tip
译者注：includes() 方法区分大小写。
:::
```js
const myAwesomeArray = [1, 2, 3, 4, 5]
myAwesomeArray.includes(3)
// -------> Output : truemyAwesomeArray.includes(8)
// -------> Output : false
```
### reverse()
此方法用于颠倒数组中元素的顺序。第一个元素成为最后一个，最后一个元素将成为第一个。
```js
const myAwesomeArray = ["e", "d", "c", "b", "a"]
myAwesomeArray.reverse()
// -------> Output : ['a', 'b', 'c', 'd', 'e']
```
### flatMap()
该方法将函数应用于数组的每个元素，然后将结果压缩为一个新数组。它在一个函数中结合了flat（）和map（）。
```js
const myAwesomeArray = [[1], [2], [3], [4], [5]]
myAwesomeArray.flatMap(arr => arr * 10)
//-------> Output : [10, 20, 30, 40, 50]
// With .flat() and .map()myAwesomeArray.flat().map(arr => arr * 10)
//-------> Output : [10, 20, 30, 40, 50]
```

## 开发必须知道的41个技巧
::: tip
JS是前端的核心，但有些使用技巧你还不一定知道；
本文梳理了JS的41个技巧，帮助大家提高JS的使用技巧；
:::
#### 原文地址（转载） [https://github.com/lanzhsh/react-vue-koa/tree/master/js/skill](https://github.com/lanzhsh/react-vue-koa/tree/master/js/skill)

### 1.数组交集
普通数组
```js
const arr1 = [1, 2, 3, 4, 5 , 8 ,9],arr2 = [5, 6, 7, 8, 9];

const intersection = arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
console.log(intersection) //[5, 8, 9]
```
数组对象
数组对象目前仅针对value值为简单的Number，String，Boolan数据类型 文中JSON.stringif比较对象是简写方法，完整的对象比较请看技巧24.对象是否相等
```js
const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name5', id: 5 }];
const arr2 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
const result = arr2.filter(function (v) {
  return arr1.some(n => JSON.stringify(n) === JSON.stringify(v))
})
console.log(result); // [{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name5', id: 5 }]
```

### 2.数组并集
普通数组
```js
const arr1 = [1, 2, 3, 4, 5, 8, 9]
const arr2 = [5, 6, 7, 8, 9];
const result = arr1.concat(arr2.filter(v => !arr1.includes(v)))
console.log(result) //[1, 2, 3, 4, 5, 8, 9, 6, 7]
```
数组对象
```js
const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
const arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = [];
let obj = [];
result = arr3.reduce(function (prev, cur, index, arr) {
  obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
  return prev;
}, []);
console.log(result); //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```
### 3.数组差集
数组arr1相对于arr2所没有的
普通数组
```js
const arr1 = [1, 2, 3, 4, 5, 8, 9]
const arr2 = [5, 6, 7, 8, 9];
const diff = arr1.filter(item => !new Set(arr2).has(item))
console.log(diff) //[ 1, 2, 3, 4 ]
```
数组对象
```js
// 对象数组
let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let result = arr1.filter(function (v) {
  return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
})
console.log(result); // [ { name: 'name2', id: 2 }, { name: 'name3', id: 3 } ]
```
### 4.数组补集
两个数组各自没有的集合
普通数组
```js
const arr1 = [1, 2, 3, 4, 5, 8, 9]
const arr2 = [5, 6, 7, 8, 9];
const difference = Array.from(new Set(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v)))) 
console.log(difference) //[ 1, 2, 3, 4, 6, 7 ]
```
数组对象
```js
let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = arr3.filter(function (v) {
  return arr1.every(n => JSON.stringify(n) !== JSON.stringify(v)) || arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
})
console.log(result); // [{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```
总结一下，差集就是数组arr1相对于arr2所没有的集合，补集是两个数组各自没有的集合
### 5.数组去重
普通数组
```js
console.log(Array.from(new Set([1, 2, 3, 3, 4, 4]))) //[1,2,3,4]
console.log([...new Set([1, 2, 3, 3, 4, 4])]) //[1,2,3,4]
```
数组对象
```js
const arr = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
 const result = [];
 arr.forEach(item=>{
    !result.some(v => JSON.stringify(v) === JSON.stringify(item)) && result.push(item)
 })
 console.log(result) //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]
```
### 6.数组排序
普通数组
```js
console.log([1, 2, 3, 4].sort((a, b) => a - b)); // [1, 2,3,4] 升序
console.log([1, 2, 3, 4].sort((a, b) => b - a)); // [4,3,2,1] 降序
```
数组对象
```js
const arr1 = [{ name: "Rom", age: 12 }, { name: "Bob", age: 22 }].sort((a, b) => { return a.age - b.age })//升序
const arr2 = [{ name: "Rom", age: 12 }, { name: "Bob", age: 22 }].sort((a, b) => { return -a.age + b.age })//降序
console.log(arr2) // [{ name: 'Bob', age:22 }, { name: 'Rom', age: 12 }]
console.log(arr1) // [ { name: 'Rom', age: 12 }, { name: 'Bob', age: 22 } ]
```
::: tip
两个种类型数组都可以使用sort排序，sort是浏览器内置方法；
默认是升序排序，默认返回一个函数，有两个参数：
(a, b) => a - b 是升序；
(a, b) => b - a 是降序。
:::
### 7.最大值
普通数组
```js
Math.max(...[1, 2, 3, 4]) //4
Math.max.apply(this, [1, 2, 3, 4]) //4
[1, 2, 3, 4].reduce((prev, cur, curIndex, arr) => {
   return Math.max(prev, cur);
}, 0) //4
```
取数组对象中id的最大值
```js
const arr = [{ id: 1, name: 'jack' },{ id: 2, name: 'may' },{ id: 3, name: 'shawn' },{ id: 4, name: 'tony' }]
const arr1 = Math.max.apply(Math, arr.map(item => { return item.id }))
const arr2 = arr.sort((a, b) => { return b.id - a.id })[0].id
console.log(arr1) // 4
console.log(arr2) // 4
```
### 8.数组求和
普通数组
```js
[1, 2, 3, 4].reduce(function (prev, cur) {
  return prev + cur;
}, 0) //10 
```
数组对象
```js
const sum = [{age:1},{age:2}].reduce(function (prev, cur) {
  return prev + cur.age;
}, 0) //3
console.log(sum)
```
### 9.数组合并
普通数组
```js
const arr1 =[1, 2, 3, 4].concat([5, 6]) //[1,2,3,4,5,6]
const arr2 =[...[1, 2, 3, 4],...[4, 5]] //[1,2,3,4,5,6]
const arrA = [1, 2], arrB = [3, 4]
const arr3 =[].concat.apply(arrA, arrB)//arrA值为[1,2,3,4]
```
数组对象
```js
const arr4 = [{ age: 1 }].concat([{ age: 2 }])
const arr5 = [...[{ age: 1 }],...[{ age: 2 }]]
console.log(arr4) //[ { age: 1 }, { age: 2 } ]
console.log(arr5) // [ { age: 1 }, { age: 2 } ]
```
### 10.数组是否包含值
普通数组
```js
console.log([1, 2, 3].includes(4)) //false
console.log([1, 2, 3].indexOf(4)) //-1 如果存在换回索引
console.log([1, 2, 3].find((item) => item === 3)) //3 如果数组中无值返回undefined
console.log([1, 2, 3].findIndex((item) => item === 3)) //2 如果数组中无值返回-1
```
数组对象
```js
const flag = [{age:1},{age:2}].some(v=>JSON.stringify(v)===JSON.stringify({age:2}))
console.log(flag)
```
### 11.数组每一项都满足
普通数组
```js
[1, 2, 3].every(item => { return item > 2 })
```
数组对象
```js
const arr = [{ age: 3 }, { age: 4 }, { age: 5 }]
arr.every(item => { return item.age > 2 }) // true
```
### 12.数组有一项满足
普通数组
```js
[1, 2, 3].some(item => { return item > 2 })
```
数组对象
const arr = [{ age: 3 }, { age: 4 }, { age: 5 }]
arr.some(item => { return item.age < 4 }) // true
复制代码
### 13.版本号排序
方法一
```js
function sortNumber(a, b) {
  return a - b
}
const b = [1,2,3,7,5,6]
const a = ["1.5", "1.5", "1.40", "1.25", "1.1000", "1.1"];

console.log(a.sort(sortNumber)); // [ 1, 2, 3, 5, 6, 7 ]
console.log(b.sort(sortNumber)); //[ '1.1000', '1.1', '1.25', '1.40', '1.5', '1.5' ]
```
可见sort排序对整数可以，类似版本号这个格式就不适用了，因为sort函数在比较字符串的时候，是比较字符串的Unicode进行排序的。
方法二
```js
//假定字符串的每节数都在5位以下
//去除数组空值||空格
if (!Array.prototype.trim) {
  Array.prototype.trim = function () {
    let arr = []; this.forEach(function (e) {
      if (e.match(/\S+/)) arr.push(e);
    })
    return arr;
  }
}

//提取数字部分
function toNum(a) {
  let d = a.toString();
  let c = d.split(/\D/).trim();
  let num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
  for (let i = 0; i < c.length; i++) {
    let len = c[i].length;
    c[i] = r[len] + c[i];
  }
  let res = c.join('');
  return res;
}

//提取字符
function toChar(a) {
  let d = a.toString();
  let c = d.split(/\.|\d/).join('');
  return c;
}

function sortVersions(a, b) {

  let _a1 = toNum(a), _b1 = toNum(b);
  if (_a1 !== _b1) return _a1 - _b1;
  else {
    _a2 = toChar(a).charCodeAt(0).toString(16);
    _b2 = toChar(b).charCodeAt(0).toString(16);
    return _a2 - _b2;
  }
}

let arr1 = ["10", "5", "40", "25", "1000", "1"];
let arr2 = ["1.10", "1.5", "1.40", "1.25", "1.1000", "1.1"];
let arr3 = ["1.10c", "1.10b", "1.10C", "1.25", "1.1000", "1.10A"];
console.log(arr1.sort(sortVersions)) //[ '1', '5', '10', '25', '40', '1000' ]
console.log(arr2.sort(sortVersions)) //[ '1.1', '1.5', '1.10', '1.25', '1.40', '1.1000' ]
console.log(arr3.sort(sortVersions)) // [ '1.10A', '1.10C', '1.10b', '1.10c', '1.25', '1.1000' ]

```
可以看出这个函数均兼容整数，非整数，字母；
字母排序是根据Unicode排序的，所以1.10b在1.10C的后面
### 14. 对象转数组
将数组的key和value转化成数组
```js
Object.keys({ name: '张三', age: 14 }) //['name','age']
Object.values({ name: '张三', age: 14 }) //['张三',14]
Object.entries({ name: '张三', age: 14 }) //[[name,'张三'],[age,14]]
Object.fromEntries([name, '张三'], [age, 14]) //ES10的api,Chrome不支持 , firebox输出{name:'张三',age:14}
```
### 15.数组转对象
将数组的值转化为对象的value
```js
const arrName = ['张三', '李四', '王五']
const arrAge=['20','30','40']
const arrDec = ['描述1', '描述2', '描述3']
const obj = arrName.map((item,index)=>{
  return { name: item, age: arrAge[index],dec:arrDec[index]}
})

console.log(obj) // [{ name: '张三', age: '20', dec: '描述1' },{ name: '李四', age: '30', dec: '描述2' },{ name: '王五', age: '40', dec: '描述3' }]
```
### 16.数组解构
```js
const arr=[1,2]; //后面一定要加分号，因为不加解释器会认为在读数组
[arr[1], arr[0]] = [arr[0], arr[1]]; // [2,1]
```
Object
### 17.对象变量属性
```js
const flag = true;
const obj = {
    a: 0,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, c: 2 }
```
### 18.对象多余属性删除
```js
const { name, age, ...obj } = { name: '张三', age: 13, dec: '描述1', info: '信息' }
console.log(name)  // 张三
console.log(age)  // 13
console.log(obj)  // {dec: '描述1', info: '信息' }
```
### 19.对象嵌套属性解构
```js
const { info:{ dec} } = { name: '张三', age: 13, info:{dec: '描述1', info: '信息' }}
console.log(dec) // 描述1
```
### 20.解构对象属性别名
```js
const { name:newName } = { name: '张三', age: 13 }
console.log(newName)  // 张三
```
### 21.解构对象属性默认值
```js
const { dec='这是默认dec值' } = { name: '张三', age: 13 }
console.log(dec) //这是默认dec值
```
### 22.拦截对象
利用Object.defineProperty拦截对象
无法拦截数组的值
```js
let obj = { name: '', age: '', sex: '' },
  defaultName = ["这是姓名默认值1", "这是年龄默认值1", "这是性别默认值1"];
Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, { // 拦截整个object 对象，并通过get获取值，set设置值，vue 2.x的核心就是这个来监听
    get() {
      return defaultName;
    },
    set(value) {
      defaultName = value;
    }
  });
});

console.log(obj.name); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
console.log(obj.age); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
console.log(obj.sex); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
obj.name = "这是改变值1";
console.log(obj.name); // 这是改变值1
console.log(obj.age);  // 这是改变值1
console.log(obj.sex); // 这是改变值1

let objOne = {}, defaultNameOne = "这是默认值2";
Object.defineProperty(obj, 'name', {
  get() {
    return defaultNameOne;
  },
  set(value) {
    defaultNameOne = value;
  }
});
console.log(objOne.name); // undefined
objOne.name = "这是改变值2";
console.log(objOne.name); // 这是改变值2
```
利用proxy拦截对象
```js
let obj = { name: '', age: '', sex: '' }
let handler = {
  get(target, key, receiver) {
    console.log("get", key); 
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value); // set name 李四  // set age 24
    return Reflect.set(target, key, value, receiver);
  }
};
let proxy = new Proxy(obj, handler);
proxy.name = "李四";
proxy.age = 24;
```
::: tip
defineProterty和proxy的对比：
1.defineProterty是es5的标准,proxy是es6的标准;
2.proxy可以监听到数组索引赋值,改变数组长度的变化;
3.proxy是监听对象,不用深层遍历,defineProterty是监听属性;
4.利用defineProterty实现双向数据绑定(vue2.x采用的核心)
:::
### 23.对象深度拷贝
::: tip
JSON.stringify深度克隆对象;
1.无法对函数 、RegExp等特殊对象的克隆;
2.会抛弃对象的constructor,所有的构造函数会指向Object;
3.对象有循环引用,会报错
:::
```js
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {

  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

console.log(clone({
  name: '张三', age: 23,
  obj: { name: '李四', age: 46 },
  arr: [1, 2, 3]
})) // { name: '张三', age: 23, obj: { name: '李四', age: 46 }, arr: [ 1, 2, 3 ] }
```
::: tip
对象深度克隆实际上就是要兼容Array，RegExp，Date，Function类型；
克隆函数可以用正则取出函数体和参数，再定义一个函数将取出来的值赋值进去
详细请戳对象深度拷贝
:::
### 24.对象是否相等
如果用JSON.stringify转化属性顺序不同，也不相等；
而且不支持无法对函数 、RegExp等特殊对象的克隆
```js
function deepCompare(x, y) {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true;
    }

    // Compare primitives and functions.     
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof (x[p])) {
        case 'object':
        case 'function':

          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; 
  }

  for (i = 1, l = arguments.length; i < l; i++) {

    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
}

const obj1 = { 
  name: '张三', age: 23, 
  obj: { name: '李四', age: 46 }, 
  arr: [1, 2, 3],
  date:new Date(23),
  reg: new RegExp('abc'),
  fun: ()=>{}
 }
const obj2 = { 
  name: '张三', age: 23, 
  obj: { name: '李四', age: 46 }, 
  arr: [1, 2, 3],
  date: new Date(23),
  reg: new RegExp('abc'),
  fun: ()=>{}
 }

console.log(deepCompare(obj1,obj2)) // true

```
判断对象是否相等，实际上就是要处理Array，Date，RegExp，Object，Function的特殊类型是否相等
### 25.对象转化为字符串
通过字符串+Object 的方式来转化对象为字符串(实际上是调用 .toString() 方法)
```js
'the Math object:' + Math.ceil(3.4)                // "the Math object:4"
'the JSON object:' + {name:'曹操'}              // "the JSON object:[object Object]"
```
覆盖对象的toString和valueOf方法来自定义对象的类型转换
```js
2  * { valueOf: ()=>'4' }                // 8
'J' + { toString: ()=>'ava' }                // "Java"
```
当+用在连接字符串时，当一个对象既有toString方法又有valueOf方法时候，JS通过盲目使用valueOf方法来解决这种含糊;
对象通过valueOf方法强制转换为数字，通过toString方法强制转换为字符串
```js
'' + {toString:()=>'S',valueOf:()=>'J'}  //J
```
Function
### 26.函数隐式返回值
```js
(()=>3)()  //3
(()=>(
   3
))()
```
函数省略大括号，或者将大括号改成小括号可以确保代码以单个语句的形式进行求值
### 27.函数自执行
```js
const Func = function() {}(); // 常用

(function() {})(); // 常用
(function() {}()); // 常用
[function() {}()];

new function() {};
new function() {}();
void function() {}();
typeof function() {}();
delete function() {}();

+ function() {}();
- function() {}();
~ function() {}();
! function() {}();
```
### 28.函数异步执行
Promise
```js
Promise.reject('这是第二个 reject 值').then((data)=>{
  console.log(data)
}).catch(data=>{
  console.log(data) //这是第二个 reject 值
})
```
Generator
```js
function* gen(x) {
  const y = yield x + 6;
  return y;
}

// yield 如果用在另外一个表达式中,要放在()里面
// 像上面如果是在=右边就不用加()
function* genOne(x) {
  const y = `这是第一个 yield 执行:${yield x + 1}`;
  return y;
}

const g = gen(1);
//执行 Generator 会返回一个Object,而不是像普通函数返回return 后面的值
g.next() // { value: 7, done: false }
//调用指针的 next 方法,会从函数的头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式或return语句暂停,也就是执行yield 这一行
// 执行完成会返回一个 Object,
// value 就是执行 yield 后面的值,done 表示函数是否执行完毕
g.next() // { value: undefined, done: true }
// 因为最后一行 return y 被执行完成,所以done 为 true
```
Async/Await
```js
function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2); //something 和 hello async
}
test();
```
String
### 29.字符串翻转
```js
function reverseStr(str = "") {
  return str.split("").reduceRight((t, v) => t + v);
}

const str = "reduce123";
console.log(reverseStr(str)); // "321recuder"
```
### 30.url参数序列化
将对象序列化成url参数传递
```js
function stringifyUrl(search = {}) {
  return Object.entries(search).reduce(
    (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
    Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");
}

console.log(stringifyUrl({ age: 27, name: "YZW" })); // "?age=27&name=YZW"
```
### 31.url参数反序列化
一般会通过location.search拿到路由传递的参数，并进行反序列化得到对象
```js
function parseUrlSearch() {
  const search = '?age=25&name=TYJ'
  return search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
    const [key, val] = v.split("=");
    t[key] = decodeURIComponent(val);
    return t;
  }, {});
}

console.log(parseUrlSearch()); // { age: "25", name: "TYJ" }
```
### 32.转化为字符串
```js
const val = 1 + ""; // 通过+ ''空字符串转化
console.log(val); // "1"
console.log(typeof val); // "string"

const val1 = String(1);
console.log(val1); // "1"
console.log(typeof val1); // "string"
```
Number
### 33.数字千分位
方法一：
```js
function thousandNum(num = 0) {
  const str = (+num).toString().split(".");
  const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);
}

thousandNum(1234); // "1,234"
thousandNum(1234.00); // "1,234"
thousandNum(0.1234); // "0.123,4"
console.log(thousandNum(1234.5678)); // "1,234.567,8"
```
方法二
```js
console.log('1234567890'.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
console.log((1234567890).toLocaleString())
```
### 34.字符串转数字
方法一
用*1来转化为数字,实际上是调用.valueOf方法
```js
'32' * 1            // 32
'ds' * 1            // NaN
null * 1            // 0
undefined * 1    // NaN
1  * { valueOf: ()=>'3' }        // 3
```
方法二
```js
+ '123'            // 123
+ 'ds'               // NaN
+ ''                    // 0
+ null              // 0
+ undefined    // NaN
+ { valueOf: ()=>'3' }    // 3
```
### 35.判断小数是否相等
肯定有人会说这还不简单，直接用'==='比较；
实际上0.1+0.2 !==0.3，因为计算机不能精确表示0.1， 0.2这样的浮点数，所以相加就不是0.3了
```js
Number.EPSILON=(function(){   //解决兼容性问题
    return Number.EPSILON?Number.EPSILON:Math.pow(2,-52);
})();
//上面是一个自调用函数，当JS文件刚加载到内存中，就会去判断并返回一个结果
function numbersequal(a,b){ 
    return Math.abs(a-b)<Number.EPSILON;
  }
//接下来再判断   
const a=0.1+0.2, b=0.3;
console.log(numbersequal(a,b)); //这里就为true了
```
### 36.双位运算符
双位运算符比Math.floor(),Math.ceil()速度快
```js
~~7.5                // 7
Math.ceil(7.5)       // 8
Math.floor(7.5)      // 7


~~-7.5          // -7
Math.floor(-7.5)     // -8
Math.ceil(-7.5)      // -7
```
所以负数时，双位运算符和Math.ceil结果一致，正数时和Math.floor结果一致
### 37.取整和奇偶性判断
取整
```js
3.3 | 0         // 3
-3.9 | 0        // -3

parseInt(3.3)  // 3
parseInt(-3.3) // -3

// 四舍五入取整
Math.round(3.3) // 3
Math.round(-3.3) // -3

// 向上取整
Math.ceil(3.3) // 4
Math.ceil(-3.3) // -3

// 向下取整
Math.floor(3.3) // 3
Math.floor(-3.3) // -4
```
判断奇偶数
```js
const num=5;
!!(num & 1) // true
!!(num % 2) // true
```
Boolean
### 38.判断数据类型
```js
function dataTypeJudge(val, type) {
  const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, "$1").toLowerCase();
  return type ? dataType === type : dataType;
}
console.log(dataTypeJudge("young")); // "string"
console.log(dataTypeJudge(20190214)); // "number"
console.log(dataTypeJudge(true)); // "boolean"
console.log(dataTypeJudge([], "array")); // true
console.log(dataTypeJudge({}, "array")); // false
```
可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
### 39.使用Boolean过滤数组假值
```js
const compact = arr => arr.filter(Boolean)
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])  //[ 1, 2, 3, 'a', 's', 34 ]
```
### 40.短路运算
```js
||（或）
const flag = false || true //true
// 某个值为假时可以给默认值
const arr = false || []
```
&&（与）
```js
const flag1 = false && true //false
const flag2 = true && true //true
```
### 41.switch 简写
可以用对象替代switch，提高代码可读性
```js
switch(a) {
  case '张三':
    return 'age是12'
  case '李四':
    return 'age是120'
}

// 使用对象替换后
const obj ={
  '张三': 'age12',
  '李四': 'age120',
}
console.log(obj['张三'])
```

## JavaScript深入之从原型到原型链
> [原文地址:https://github.com/mqyqingfeng/Blog/issues/2](https://github.com/mqyqingfeng/Blog/issues/2)
### 构造函数创建对象
我们先使用构造函数创建一个对象：
``` js
function Person() {

}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin
```
在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。

很简单吧，接下来进入正题：

### prototype
每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype ，比如：
``` js
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```
那这个函数的 prototype 属性到底指向的是什么呢？是这个函数的原型吗？

其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。

那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

让我们用一张图表示构造函数和实例原型之间的关系：
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/doc/prototype1.png)

构造函数和实例原型的关系图

在这张图中我们用 Object.prototype 表示实例原型。

那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：

### `__proto__`
这是每一个JavaScript对象(除了 null )都具有的一个属性，叫`__proto__`，这个属性会指向该对象的原型。

为了证明这一点,我们可以在火狐或者谷歌中输入：
``` js
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```
于是我们更新下关系图：
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/doc/prototype2.png)

实例与实例原型的关系图

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

### constructor
指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

为了验证这一点，我们可以尝试：
``` js
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```
所以再更新下关系图：
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/doc/prototype3.png)

实例原型与构造函数的关系图

综上我们已经得出：
``` js
function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```
了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：

### 实例与原型
当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

举个例子：
``` js
function Person() {

}

Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin
```
在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 `person.__proto__` ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

但是万一还没有找到呢？原型的原型又是什么呢？

### 原型的原型
在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：
``` js
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```
其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 `__proto__` 指向构造函数的 prototype ，所以我们再更新下关系图：
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/doc/prototype4.png)

### 原型链
那 Object.prototype 的原型呢？

null，我们可以打印：
``` js
console.log(Object.prototype.__proto__ === null) // true
```
然而 null 究竟代表了什么呢？

引用阮一峰老师的 《undefined与null的区别》 就是：

> null 表示“没有对象”，即该处不应该有值。

所以 `Object.prototype.__proto__` 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。

所以查找属性的时候查到 Object.prototype 就可以停止查找了。

最后一张关系图也可以更新为：
![](https://vin668.oss-cn-hangzhou.aliyuncs.com/doc/prototype5.png)

原型链示意图

顺便还要说一下，图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。

### 补充
最后，补充三点大家可能不会注意的地方：

#### constructor
首先是 constructor 属性，我们看个例子：
``` js
function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true
```
当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：
``` js
person.constructor === Person.prototype.constructor
```
#### `__proto__`
其次是 `__proto__` ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 `obj.__proto__` 时，可以理解成返回了 Object.getPrototypeOf(obj)。

#### 真的是继承吗？
最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：

继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。