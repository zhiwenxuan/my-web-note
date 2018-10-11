# 记录 web 前端学习的收获

<!-- TOC -->

- [记录 web 前端学习的收获](#记录-web-前端学习的收获)
    - [HTML](#html)
        - [获取标签宽度](#获取标签宽度)
        - [DOM 的 property 和 Attribute 区别](#dom-的-property-和-attribute-区别)
        - [给标签添加自定义属性](#给标签添加自定义属性)
        - [自动补全属性autocomplete](#自动补全属性autocomplete)
        - [HTML高级文字格式](#html高级文字格式)
    - [CSS](#css)
        - [一些有趣属性收集](#一些有趣属性收集)
        - [去除所有情况下 a 标签的下划线](#去除所有情况下-a-标签的下划线)
        - [position：static/absolute/relative](#positionstaticabsoluterelative)
        - [隐藏多余溢出文字并显示省略号的样式](#隐藏多余溢出文字并显示省略号的样式)
        - [a 标签点击失效](#a-标签点击失效)
        - [:hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用](#hover-改变其他元素样式时只对子元素和相邻的兄弟元素有作用)
        - [sass 学习笔记](#sass-学习笔记)
        - [Element UI](#element-ui)
            - [el-popover](#el-popover)
    - [JavaScript](#javascript)
        - [js四舍五入保留两位小数](#js四舍五入保留两位小数)
        - [jQuery 点击事件失效](#jquery-点击事件失效)
        - [if 语句为 false 的几种情况：](#if-语句为-false-的几种情况)
        - [js 发生异步的情况：需要等待](#js-发生异步的情况需要等待)
        - [防止浏览器缓存](#防止浏览器缓存)
        - [BOM 常见操作](#bom-常见操作)
        - [js 获取随机数，要求长度一致的字符串格式](#js-获取随机数要求长度一致的字符串格式)
        - [使用 XMLHttpRequest 写一个简单的 ajax 请求(暂未兼容 IE)](#使用-xmlhttprequest-写一个简单的-ajax-请求暂未兼容-ie)
        - [cookie 和 sessionStorage localStorage 区别](#cookie-和-sessionstorage-localstorage-区别)
        - [监听页面加载完的两种形式](#监听页面加载完的两种形式)
        - [国外信用卡格式](#国外信用卡格式)
        - [Promise](#promise)
        - [ES7](#es7)
        - [ES8](#es8)
        - [图片懒加载](#图片懒加载)
    - [Vue 相关](#vue-相关)
        - [关于 vue.js](#关于-vuejs)
            - [关于 watch 和 computed](#关于-watch-和-computed)
        - [关于 vue-router](#关于-vue-router)
        - [关于 vuex](#关于-vuex)
            - [核心概念](#核心概念)
            - [模块化(待补充)](#模块化待补充)
            - [辅助函数](#辅助函数)
            - [项目结构](#项目结构)
            - [热重载](#热重载)
    - [构建工具](#构建工具)
    - [HTTP 相关](#http-相关)
        - [服务器状态码](#服务器状态码)
        - [跨域](#跨域)
        - [从输入 url 到看到页面的详细过程](#从输入-url-到看到页面的详细过程)
    - [性能优化](#性能优化)
    - [前端安全](#前端安全)
    - [其他](#其他)

<!-- /TOC -->

## HTML

### 获取标签宽度

HTMLElement.offsetWidth  
 [参考链接](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth "获取标签宽度")

### DOM 的 property 和 Attribute 区别

- property 是 js 中对象中的标准属性,DOM.className
- Attribute 是标签文档中的属性,比如 DOM.getAttribute('href')

### 给标签添加自定义属性

```html
需要在前面加上'data-'，比如：

<a data-mid='2'>加上一个mid自定义属性</a>
```
### 自动补全属性autocomplete
可以用于信用卡💳自动补全等

### HTML高级文字格式
- 描述列表
整一个描述列表使用dl，每一项使用dt，每一项里面的具体内容使用dd，如下：
```html
  <dl>
    <dt>soliloquy</dt>
    <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
    <dt>monologue</dt>
    <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
    <dt>aside</dt>
    <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.</dd>
  </dl>
```

- 缩略语
使用abbr包含引用，并提供title来解释缩略语，如下： 
```html
  <p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>
```

- 标记联系人address
```html
  <address>
    <p>Chris Mills, Manchester, The Grim North, UK</p>
  </address>
```

- 上标<sup></sup>和下标<sub></sub>
```html
  <p>My birthday is on the 25<sup>th</sup> of May 2001.</p>
  <p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
  <p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>
```

- 展示计算机代码
code: 用于标记计算机通用代码。  
pre: 对保留的空格（通常是代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在pre标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。  
var: 用于标记具体变量名。  
kbd: 用于标记输入电脑的键盘（或其他类型）输入。  
samp: 用于标记计算机程序的输出。  

```html
<pre><code>var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}</code></pre>

<p>You shouldn't use presentational elements like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</p>

<p>In the above JavaScript example, <var>para</var> represents a paragraph element.</p>


<p>Select all the text with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>.</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>
```
结果如下：
```
var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}
You shouldn't use presentational elements like <font> and <center>.

In the above JavaScript example, para represents a paragraph element.

Select all the text with Ctrl/Cmd + A.

$ ping mozilla.org
PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms
```

- 标记时间和日期 time
```html
<!-- Standard simple date -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- Just year and month -->
<time datetime="2016-01">January 2016</time>
<!-- Just month and day -->
<time datetime="01-20">20 January</time>
<!-- Just time, hours and minutes -->
<time datetime="19:30">19:30</time>
<!-- You can do seconds and milliseconds too! -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- Date and time -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- Date and time with timezone offset-->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- Calling out a specific week number-->
<time datetime="2016-W04">The fourth week of 2016</time>
```

- 标示删除的文本del
```html
<p><del>This text has been deleted</del>, here is the rest of the paragraph.</p>
<del ><p >This paragraph has been deleted.</p ></del >
```

- 标示插入的文本ins

## CSS

### 一些有趣属性收集

[所有属性集](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

```
background-clip：设置元素的背景（背景图片或颜色）是否延伸到边框下面。
  background-clip: border-box
  background-clip: padding-box
  background-clip: content-box
  background-clip: inherit

background-origin： 规定了指定背景图片background-image 属性的原点位置的背景相对区域.

border-image： CSS属性允许在元素的边框上绘制图像

calc() ： 你就可以通过计算来决定一个CSS属性的值

inherit：继承

initial : 是将属性的初始值( initial value)赋给元素 

:invalid ： CSS 伪类 表示任意内容未通过验证的 <input> 或其他 <form> 元素
  /* 可选定任意无效的<input> */
  input:invalid {
    background-color: pink;
  }

filter： CSS滤镜，提供的图形特效，像模糊，锐化或元素变色。过滤器通常被用于调整图片，背景和边界的渲染。

linear-gradient() : 此函数用于创建一个表示两种或多种颜色线性渐变的图片

mask: 允许使用者通过部分或者完全隐藏一个元素的可见区域

:read-only : 伪类 表示元素不可被用户编辑的状态（如锁定的文本输入框）

transform : 允许你修改CSS视觉格式模型的坐标空间。使用它，元素可以被转换（translate）、旋转（rotate）、缩放（scale）、倾斜（skew)

transition: 过渡



```

### 去除所有情况下 a 标签的下划线

```css
a {
  text-decoration: none;
}
a:hover,
a:visited,
a:link {
  text-decoration: none;
}
```

### position：static/absolute/relative

- static: 默认值，无特殊定位，对象遵循 HTML 原则;
- absolute:  
   绝对定位，将对象从文档流中拖离出来，使用 left/right/top/bottom 等属性相对其最接近的一个并有定位设置的父元素进行绝对定位;若没有父元素，则以 html、body，浏览器的位置为相对位置，而其层叠通过 z-index 属性定义;
- relative:  
   相对定位，对象不可层叠，将依据 right，top，left，bottom（相对定位）等属性在正常文档流中偏移位置(相对于谁呢？相对于它自己本身，即是在原来位置上偏移，而且注意原有位置就是在保留的);

### 隐藏多余溢出文字并显示省略号的样式

```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

### a 标签点击失效

可能的原因是层级问题，被覆盖，解决办法设置定位 position:relative 和 z-index

### :hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用

### sass 学习笔记

- Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器

```css
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}

编译为 #main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```

- 父选择器 &: 代表嵌套规则外层的父选择器

```css
a {
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  body.firefox & {
    font-weight: normal;
  }
}

编译为 a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
body.firefox a {
  font-weight: normal;
}
```

- 属性嵌套: CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中

```css
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

编译为:  

  .funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

- 注释： Sass 支持标准的 CSS 多行注释 /\* \*/，以及单行注释 //，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会

- 变量 $:  
  变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 !global 声明。  
  可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```
  $width: 5em;

  直接使用即调用变量：

  #main {
    width: $width;
  }
```

- 数据类型: 支持 6 种主要的数据类型

```
  数字，1, 2, 13, 10px
  字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
  颜色，blue, #04a3f9, rgba(255,0,0,0.5)
  布尔型，true, false
  空值，null
  数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
  maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
```

- 运算

1. 数字运算
2. 颜色值运算
3. 字符串运算
4. 布尔运算

- 函数

- 插值语句 #{}: 通过 #{} 插值语句可以在选择器或属性名中使用变量

```css
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
编译为 p.foo {
  border-color: blue;
}
```

- @extend 引用另一个类的样式

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}

-- > .error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

- 控制指令: @if @for @each @while

- 混合指令 (Mixin Directives)
  混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 .float-left。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

1. 定义混合指令 @mixin

```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

2. 引用混合样式 @include

```css
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

3. 参数

```css
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue, 1in);
}
```

### Element UI

#### el-popover

如果依赖的 dom 节点在它本身渲染之后出现，el-popover 将找不到相对定位的点，视图  则会出现在左上角。  
 可能导致的场景：使用 v-if，一开始有依赖 dom 节点，后来 dom 节点清除掉，然而 el-popover 只是设置为 display:none。当 dom 节点 v-if 的条件再次为 true 时，el-popover 的渲染  会比它依赖的 dom 节点快。（ 具体原因有待深究）


## JavaScript

### js四舍五入保留两位小数
Math.round会四舍五入保留整数，利用这个特性，先乘上100取整，再除以100就可以四舍五入保留两位小数
```js
Math.round(number * 100) / 100
```

### jQuery 点击事件失效

- 使用 $("#id").click(function(){ }); 有时会失效  
   原因：  
   直接将事件绑定在#id 元素上，如果#id 元素在绑定后生成，则不会触发改事件
- 推荐使用以下形式

```javascript
$(document).on("click", "#id", function() {
  console.log("document");
});
```

原因：  
将事件绑定在 document DOM 树下，当事件到达#id 元素时，事件程序被执行，由于是从整个 document 下寻找的，可以保证事件被触发  
[参考链接](https://stackoverflow.com/questions/14879168/document-onclick-id-function-vs-id-onclick-function "jQuery $(#id).click 和 $(document).on(click,#id,function(){ })区别")

### if 语句为 false 的几种情况：

- 数字 0
- 非数字 NaN
- 空字符串 ''
- 空指针 null
- 没有定义 undefined
- false 本身

### js 发生异步的情况：需要等待

等待的场景有：

- 定时任务：setTimeout, setInterval
- 网络请求：ajax 请求，图片 img 加载等
- 事件绑定

[博客整理](http://blog.csdn.net/lizhenqii/article/details/77806681 "博客整理")

### 防止浏览器缓存

    链接加上一个随机数，比如js中用Math.random()

### BOM 常见操作

1. 判断浏览器类型 navigator

```javascript
var ua = navigator.userAgent;
var isChrome = ua.indexOf("Chrome");
console.log(isChrome);
```

2. 获取屏幕宽高 screen

```javascript
screen.width;
screen.height;
```

3. 拆解 url 各个部分 location  
   http://coding.xuan.com/lesson/115.html?id=1#mid=5390

```javascript
location.href; //获取整一个连接
location.protocol; //协议类型 http
location.hash; //如 #mid=5390
location.search; // 获取查询部分，如 ?id=1
location.pathname; // 'lesson/115.html'
```

4. 页面回退与前进 history

```javascript
history.back();
history.forward();
```

### js 获取随机数，要求长度一致的字符串格式

```javascript
var random = Math.random() + "0000000000"; //使用Math random 获取随机数，再加上10位0
var random = random.slice(0, 10); //截取前10位
```

### 使用 XMLHttpRequest 写一个简单的 ajax 请求(暂未兼容 IE)

```javascript
xhr = new XMLHttpRequest(); //新建对象
xhr.open("GET", "/api", false); //初始化请求
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    //请求完成
    if (xhr.status === 200) {
      //服务器返回状态码
      window.alert(xhr.responseText);
    }
  }
};
xhr.send(null);
```

状态码 readyState 说明

- 0 : (未初始化）还没有调用 send()方法
- 1 :（载入）已调用 send()方法，正在发送请求
- 2 : (载入完成) send 方法执行完成，已经接受请求的全部内容
- 3 : (交互) 正在解析交互内容
- 4 : (完成) 解析内容完成，客户端可以调用

[可参考文章](http://blog.csdn.net/liujiahan629629/article/details/17126727 "可参考文章")

### cookie 和 sessionStorage localStorage 区别

- 容量：cookie 大小只有 4KB，sessionStorage 和 localStorage 有 5MB
- 请求携带：所有 http 请求都要到上 cookie，影响效率
- API 易用性：cookie 简单，需要封装，document.cookie = …  
  其他两个简单易用，如 localStorage.getItem(key) localStorage.setItem(key, value)

### 监听页面加载完的两种形式

- 资源全部加载完的情况

```javascript
window.addEventListener("load", function() {
  // 页面资源全部加载完全，包括视频、图片，才能执行
});
```

- 只渲染完 DOM，未加载完全部资源

```javascript
document.addEventListener("DOMContentLoaded", function() {
  // 只渲染完DOM即可执行，未加载完全部资源，如视频、图片
});
```

### 国外信用卡格式

```javascript
defaultFormat = /(\d{1,4})/g;
cards = [
  {
    type: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true
  },
  {
    type: "dankort",
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "hipercard",
    pattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    format: defaultFormat,
    length: [14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "dinersclub",
    pattern: /^(36|38|30[0-5])/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "jcb",
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "laser",
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "maestro",
    pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "mastercard",
    pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "unionpay",
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: "visaelectron",
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "elo",
    pattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "visa",
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16, 19],
    cvcLength: [3],
    luhn: true
  }
];
```

### Promise

一个简单的例子：

```javascript
  let httpBasePostRequest = (url, params) => {
      return new Promise((resolve, reject) => {
          axios.post(url, params).then(
              res => {
                  resolve(res); //成功返回
              },
              err => {
                  reject(err); //失败
              }
          );
      });
  }

  let url = 'https://www.exmple.com//login';
  let params = {
    user: 'zhangsan',
    password: '123456'
  };
  httpBasePostRequest(url, params).then( (res) => {
    console.log('Login success.');
  }).catch( (err) => {
    console.log(err);
  })

  备注：
  Promise.resolve只可以接受一个参数
  参数类型有三种：
  Promise.resolve(value); //需要解析的参数
  Promise.resolve(promise); //直接返回这个Promise对象
  Promise.resolve(thenable);

  Promise.reject //返回一个带有拒绝原因reason参数的Promise对象
```

Promise 嵌套：

```javascript
  //实现一秒中后(n * n)，接着一秒后(n*n + n*n),最后打印出来

  //1秒后执行num1*num1
  function MyMultiply(num1) {
    return new Promise((resolve, reject) => {
    console.log('start mutil')
    setTimeout(resolve, 1000, num1*num1);
    })
  };

  //1秒后执行num1+num1
  function myAdd(num1) {
    return new Promise( (resolve, reject) => {
      console.log('start add')
      setTimeout(resolve, 1000, num1+ num1)
      } )
  }

  new Promise( (resolve, reject) => {
    console.log('Start promise');
    let n = 5;
    resolve(n);
  } )
  .then(MyMultiply)
  .then(myAdd)
  .then(result => {
    console.log(result)
  });

  结果：
  Start promise
  Promise {<pending>}
  start mutil
  start add
  50
```

### ES7

ES7 主要增加了两项内容：幂运算(\*\*) 和 Array.prototype.includes

- 幂运算（\*\*）

```
  7的8次方 => 7**8
```

- Array.property.includes
  判断数组是否  包含某项元素，和 ES6 的 Array.prototype.indexOf 相似

```javascript
["a", "b", "c"]
  .includes("a") //true
  [("a", "b", "c")].indexOf("a") > -1; //true
```

### ES8

[可参考](https://blog.csdn.net/lihefei_coder/article/details/75068578, "ECMAScript规范第8版(ES2017)已发布，新功能一览")
ES8 主要增加：

- 异步函数(Async functions)
- Object.entries()和 Object.values()
- 字符串填充：padStart 和 padEnd
- Object.getOwnPropertyDescriptors()
- 函数参数列表与调用中的尾部逗号
- 共享内存和原子（Shared memory and atomics）

###  图片懒加载
实现步骤：  
1. img的src属性不添加值或者添加一个默认图片
2. 给img自定义一个属性data-*，比如data-src，用来保存真实的路径
3. 判断img是否在用户可视范围，如果在可视范围，将data-src属性的值赋予src
  - 去重处理： 给所有需要懒加载的图片添加同一个类名，当已经给src赋值时，去掉该类名
  - 判断是否可视依据：‘img距离文档顶部的距离’是否小于 ‘窗口的高度’ + ’滚动条滚动的高度‘

实现样例：

```javascript
  var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
  var windowHeight = window.innerHeight;// 视窗高度
  var imgs = document.getElementsByClassName('lazyloadimg');
  for (var i =0; i < imgs.length; i++) {
    var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度  
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
        imgs[i].src = imgs[i].getAttribute('data-src');
        img[i].className = img[i].className.replace('lazyloadimg','')
    }
  }
```
优化：加上防抖节流









## Vue 相关

### 关于 vue.js

#### 关于 watch 和 computed

- 尽可能不要修改 wacth 和 computed 的值，避免造成死循环。
- wacth 想监听对象内部属性变化时，可以使用 deep：true 或者 换成字符串格式监听：obj.a -> 'obj.a'，推荐使用后者
- 当 app 里面的任意属性发生变化时，template 会重新渲染。当 template 是通过 computed 方法获取值时，只有 computed 监听的属性发生变化时，才会重新调用函数，否则 computed 会取缓存里面的值；当 template 是通过 methods 里面的方法获取值时，只要 app 的任意属性发生变化，都会调用函数。所以，template 相对于通过 methods 里面的方法获取值，通过 computed 获取值性能会更高。
- computed 里面定义的属性，如果在 template<font color="red">没有引用</font>，不会触发改属性的  监听

### 关于 vue-router

[参考 vue-router 官网](https://router.vuejs.org/zh/ "vue-router官网")

- vue-router 别名  
  /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。  
  “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。  
  上面对应的路由配置为：

```javascript
const router = new VueRouter({
  routes: [{ path: "/a", component: A, alias: "/b" }]
});
```

- 给 router-view 加上过渡 transition，使得路由跳转有过渡的效果

```html
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
```

- 路由传参的三种方法：

  1. /:id 通过 this.$route 获得
  2. 设置路由配置的 props 属性为 true，组件直接在 props 中获得,比如：props['id']
  3. 直接在组件中调用 this.$route.query

- vue-router 编程式导航

```javascript
  const userId = 123
  //通过name
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  //通过path
  router.push({ path: `/user/${userId}` }) // -> /user/123

  // query 带查询参数
  router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private

  注意：如果通过 path，参数params 会被忽略
```

- vue-router 命名视图：同一个页面有多个组件  来组成

```html
一种常见的布局：上左右布局

<router-view class="view header" name="header"></router-view>
<router-view class="view left" name="left"></router-view>
<router-view class="view right" name="main-content"></router-view>

不过这种布局也可以由一个组件组合其他多个组件来合成一个路由。看情况取舍。
```

- vue-router 导航守卫

  - 总共有三种模式

    - 全局守卫

    ```
      const router = new VueRouter({ ... })

      1. 全局前置守卫
      router.beforeEach((to, from, next) => {
        //do something
      })

      三个参数解释：

      to(type: Route): 即将要进入的目标 路由对象

      from(type: Route): 当前导航正要离开的路由

      next(type: Function): 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

            next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

            next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

            next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

            next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

      2. 全局解析守卫
      router.beforeResolve( (to, from, next) => {
        //导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，被调用
      } )

      3. 全局后置钩子
      router.afterEach((to, from) =>{
        // do something
      })
      不会接受next函数来改变导航
    ```

    -  路由独享的守卫：在配置路由时使用

    ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: "/foo",
          component: Foo,
          beforeEnter: (to, from, next) => {
            // do something
          }
        }
      ]
    });
    //beforeEnter: 接收的三个参数和全局接收的一样
    ```

    - 组件内守卫

    ```javascript
      const Foo = {
        template: `...`,
        beforeRouteEnter (to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 `this`
          // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 触发时间：带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 `this`
        },
        beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 `this`
        }
      }
      //注意⚠️ ：
      //1. beforeRouteEnter不能获取组件示例this，但是可以通过next来获取
        beforeRouteEnter( (to, from, next) => {
          next(vm => {
            vm.xxx
          })
        })

      //2. beforeRouteUpdate可以用于子路有发生变化时，数据请求，比如：工程id发生变化了。

      //3. beforeRouteLeave其中的一个用法是当用户填写表单没有保存数据点击离开时，可以询问用户是否要离开
        beforeRouteLeave (to, from, next) {
          let isConfirm =  window.confirm("Do you really want to leave, you have not saved your changes.");
          if(isConfirm){
            next();
          }else{
            next(false);
          }
        }
    ```

  - 导航守卫执行顺序
    大体流程：
    全局前置守卫 beforeEach -> 路由 beforeEnter -> 组件 beforeRouteEnter -> 全局解析守卫 beforeResolve -> 全局后置钩子 afterEach

    完整流程：

    1. 导航被触发。
    2. 在失活的组件里调用离开守卫。
    3. 调用全局的 beforeEach 守卫。
    4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。( 重用的组件才执行)
    5. 在路由配置里调用 beforeEnter。
    6. 解析异步路由组件。
    7. 在被激活的组件里调用 beforeRouteEnter。
    8. 调用全局的 beforeResolve 守卫 (2.5+)。
    9. 导航被确认。
    10. 调用全局的 afterEach 钩子。
    11. 触发 DOM 更新。
    12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

- 路由元信息
  定义路由的时候可以配置 meta 字段，可用于  判断该路由是否需要登录之类的

  ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          children: [
            {
              path: 'bar',
              component: Bar,
              // a meta field
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    })

    在全局前置守卫获取meta并判断处理
    router.beforeEach((to, from, next) => {
      if( to.meta.requiresAuth ) { //需要登录
        if( !isLogin ) { //没有登录，跳转到登录页面
          router.push({name: "login"});
          return;
        }
        next(); //已经登录直接往下执行
      }else{ //不需要登录直接往下执行
        next();
      }
    })
  ```

- 数据获取
  1. 导航完成后获取数据：在 created 生命周期中获取
  2. 导航进入之前获取：在 beforeRouteEnter 导航守卫中获取，如果是重用组件，可以在 beforeRouteUpdate 中更新数据
  ```javascript
  export default {
    data() {
      return {
        post: null,
        error: null
      };
    },
    beforeRouteEnter(to, from, next) {
      getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post));
      });
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate(to, from, next) {
      this.post = null;
      getPost(to.params.id, (err, post) => {
        this.setData(err, post);
        next();
      });
    },
    methods: {
      setData(err, post) {
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      }
    }
  };
  ```
- 滚动行为
  ```javascript
    const router = new VueRouter({
      routes: [...],
      scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // return {x:0, y:0} 回到顶部
      }
    })
  ```
- 路由懒加载： 把组件按组分块
  ```javascript
  const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
  const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
  const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
  ```

### 关于 vuex

[参考 Vuex 官网](https://vuex.vuejs.org/zh/ "Vuex官网")

#### 核心概念

```javascript
  const store = new Vuex.Store({
    //Vuex使用单一状态树🌲 ，使用一个对象来保存整个应用层级的状态。
    //state就是这个对象，state里面的属性会保存整个应用需要保存的状态。
    state: {
      count: 0,
      user: {
        name: 'zhangsan'
      }
    },
    //Getter其实跟state差不多，但state的数据格式之类的不太满足要求时，可以在getter中做一些处理再返回。比如：后台返回数据的再一次封装。
    getters: {
      doubleCount: state =>  state.count * 2,
      evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    },
    //用来更改state的值
    //必须是同步函数
    //遵守Vue的响应规则
    //使用commit来触发更改， store.commit('incrementWithN', 10);
    mutations: {
      //参数1: state
      //参数2: 一般是一个对象
      incrementWithN (state, n) {
        state.count += n
      },
      //当要更改state里面的对象的属性,比如：user的name属性，name要提前声明
      //要不得使用
      setUserName (state, name) {
        state.user.name = name;
      },
      //user的phone属性没有声明
      setUserPhone (state, phone) {
        Vue.set(state.user, 'phone', phone); //使用Vue.set设置
        //或者使用点语法
        state.user = {...state.user, 'phone': phone};
      }
    },
    //actions类似mutations，
    //不同点：
    //Action 提交的是 mutation，而不是直接变更状态；
    //Action 可以包含任意异步操作。
    //使用store.dispacth触发， store.dispacth('incrementWithNAsync', n)
    actions: {
      //context 可以用使用到的模块替换
      //incrementWithNAsync ({commit}, n) -> commit('incrementWithN', n)
      incrementWithNAsync (context, n) {
        //异步和触发mutation
        setTimeout( () => {
          context.commit('incrementWithN', n);
        }, 1000);
      },
      // 假设 getData() 和 getOtherData() 返回的是 Promise
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
  })
```

#### 模块化(待补充)

#### 辅助函数

- mapState
- mapGetters
- mapMutations
- mapActions

#### 项目结构

```
  ├── index.html
  ├── main.js
  ├── api
  │   └── ... # 抽取出API请求
  ├── components
  │   ├── App.vue
  │   └── ...
  └── store                 #
      ├── index.js          # 我们组装模块并导出 store 的地方
      ├── states            # states文件夹
      ├── getter            # getter
      ├── actions           # actions
      ├── mutations         # mutations
      └── modules
          ├── cart.js       # 购物车模块
          └── products.js   # 产品模块
```

#### 热重载

```javascript
  // store.js
  import Vue from 'vue'
  import Vuex from 'vuex'
  import mutations from './mutations'
  import moduleA from './modules/a'

  Vue.use(Vuex)

  const state = { ... }

  const store = new Vuex.Store({
    state,
    mutations,
    modules: {
      a: moduleA
    }
  })

  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutations', './modules/a'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newMutations = require('./mutations').default
      const newModuleA = require('./modules/a').default
      // 加载新模块
      store.hotUpdate({
        mutations: newMutations,
        modules: {
          a: newModuleA
        }
      })
    })
  }
```

## 构建工具

## HTTP 相关

### 服务器状态码

- 2xx - 请求成功，如 200
- 3xx - 需要重定向，服务器直接跳转
- 4xx - 客户端请求错误，如：找不到请求资源 404
- 5xx - 服务器端错误

### 跨域

- 跨域原因：浏览器有同源策略，不执行其他源网站的脚本
- 同源条件：协议、域名、端口都要相同
- 允许跨域加载资源的三个标签 - img src= "xxx" - link href= "xxx" - script src= "xxx"
- 所有的跨域请求都必须经过信息提供方允许
- 解决跨域的两种方法 [可参考文章](http://blog.csdn.net/liujiahan629629/article/details/17126727 "可参考文章")
- jsonp 利用 script 标签中 src 属性能够跨域访问的特性，先定义了一个回调方法，然后将其当作 url 参数的一部分发送到服务端，服务端通过字符串拼接的方式将数据包裹在回调方法中，再返回回来
- 服务器端设置 http header

### 从输入 url 到看到页面的详细过程

主要有两个过程

1. 加载资源的过程 
    1. 浏览器根据域名从 DNS 服务器获取 IP 地址 
    2. 向该 IP 地址的机器发送 http 请求 
    3. 服务器收到请求，返回数据 
    4. 浏览器接受返回的数据

2. 渲染页面的过程 
    1. 根据 html 渲染成 DOM Tree，只是 DOM 节点结构，还没有样式 
    2. 根据 css 渲染成 CSSOM 
    3. 将 DOM Tree 和 CSSOM 整合成渲染树 RenderTree，既有结构，又有样式 
    4. 浏览器根据 RenderTree 展示页面
    5.  遇到 script 会发生阻塞，先执行 JavaScript 的内容，因为 js 可以改变 DOM 节点和结构  

    备注：第 1、2、3 步没有固定顺序，如果已经渲染 CSSOM，在渲染 html 时，会即时渲染成 RenderTree

## 性能优化

- 优化原则

  - 多使用内存、缓存或其他方法
  - 多使用 CPU 计算，减少网络请求

- 入手方面：
- 加载页面和资源

  - 资源压缩合并 - 使用 CDN - 静态资源缓存 - 使用 SSR 后台渲染，数据直接渲染成 HTML

- 页面渲染
  - CSS 在前，JS 在后，这跟渲染的过程有关 - 懒加载 - 减少 DOM 查询，DOM 查询前可以先做缓存 - 减少 DOM 操作，尽量合并操作 - 事件节流，比如设置一定时间才监听 - 尽早操作，比如使用 DOMConentLoaded，代替 onload

[博客整理](http://blog.csdn.net/lizhenqii/article/details/77856311 "博客整理")

## 前端安全

- XSS 跨站脚本攻击  
  恶意攻击者往 Web 页面里插入恶意 Script 代码，当用户浏览该页之时，嵌入其中 Web 里面的 Script 代码会被执行，从而达到恶意攻击用户的目的。  
  (跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为 XSS)

例子：写博客时，添加 script 代码获取用户 cookie，发送到自己的服务器，当用户查看博客时，即可产生攻击  
防范：1. 前端替换关键字，例如替换 < 和 > 2. 后端替换

- CSRF 跨站请求伪造  
  CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click Attack”或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。  
  尽管听起来像跨站脚本（XSS），但它与 XSS 非常不同，XSS 利用站点内的信任用户，而 CSRF 则通过伪装来自受信任用户的请求来利用受信任的网站。与 XSS 攻击相比，CSRF 攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比 XSS 更具危险性。

例子：发钓鱼邮件，点击付款  
防范：增加验证流程，如输入指纹、密码、短信验证码

## 其他
