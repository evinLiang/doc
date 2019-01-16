---
sidebar: auto
---
# CSS层叠样式表
## ios浏览器去掉点击事件元素大背影
CSS只需添加以下代码
``` css
.tap {
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
```


## 清除浮动
使用浮动的父元素添加class='clearfix'即可
``` css
.clear { clear:both; visibility:hidden; display:block; font-size:0; line-height:0; }
.clearfix:after { visibility:hidden; display:block; font-size:0;content:" "; clear:both; height:0; }
.clearfix { *zoom:1; }
```

## css自适应rem
::: tip
设计稿按照750px；那么1rem = 10px = 设计稿20px
:::
#### 代码演示
``` html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<title>rem</title>
		<style>
			@media screen and (max-width:374px) {

				html,
				body {
					font-size: 55.5%;
				}
			}

			@media screen and (min-width:375px) and (max-width:413px) {

				html,
				body {
					font-size: 62.5%;
				}
			}

			@media screen and (min-width:414px) {

				html,
				body {
					font-size: 71.8%;
				}
			}

			#rem {
				width: 10rem;
				height: 10rem;
				background: red;
			}

			#px {
				width: 100px;
				height: 100px;
				background: red;
				font-size: 14px;
			}
		</style>
	</head>
	<body>
		<div id="rem">rem</div>
		<div id="px">px</div>
	</body>
</html>
```
## CSS控制文字，超出部分显示省略号
#### html
``` html
<p style="width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
```
#### 如果实现单行文本的溢出显示省略号同学们应该都知道用text-overflow:ellipsis属性来，当然还需要加宽度width属来兼容部分浏览。
实现方法：
``` css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```
#### 但是这个属性只支持单行文本的溢出显示省略号，如果我们要实现多行文本溢出显示省略号呢。接下来重点说一说多行文本溢出显示省略号，如下。
实现方法：
``` css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
#### 因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；
适用范围：
::: danger 注:
-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
实现方法：
:::
``` css
p { 
	position: relative; 
	line-height: 20px; 
	max-height: 40px;
	overflow: hidden; 
}
p::after {
	content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
	background: -webkit-linear-gradient(left, transparent, #fff 55%);
	background: -o-linear-gradient(right, transparent, #fff 55%);
	background: -moz-linear-gradient(right, transparent, #fff 55%);
	background: linear-gradient(to right, transparent, #fff 55%);
}
```