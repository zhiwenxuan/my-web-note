
 # 记录web前端学习的收获
<!-- TOC -->

- [HTML](#html)
    - [获取标签宽度](#获取标签宽度)
    - [DOM的property和Attribute区别](#dom的property和attribute区别)
    - [给标签添加自定义属性](#给标签添加自定义属性)
- [CSS](#css)
    - [去除所有情况下a标签的下划线](#去除所有情况下a标签的下划线)
    - [position：static/absolute/relative](#positionstaticabsoluterelative)
    - [隐藏多余溢出文字并显示省略号的样式](#隐藏多余溢出文字并显示省略号的样式)
    - [a标签点击失效](#a标签点击失效)
    - [:hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用](#hover-改变其他元素样式时只对子元素和相邻的兄弟元素有作用)
    - [sass学习笔记](#sass学习笔记)
- [JavaScript](#javascript)
    - [jQuery点击事件失效](#jquery点击事件失效)
    - [if语句为false的几种情况：](#if语句为false的几种情况)
    - [js发生异步的情况：需要等待](#js发生异步的情况需要等待)
    - [防止浏览器缓存](#防止浏览器缓存)
    - [BOM常见操作](#bom常见操作)
    - [js获取随机数，要求长度一致的字符串格式](#js获取随机数要求长度一致的字符串格式)
    - [使用XMLHttpRequest写一个简单的ajax请求(暂未兼容IE)](#使用xmlhttprequest写一个简单的ajax请求暂未兼容ie)
    - [cookie 和 sessionStorage localStorage区别](#cookie-和-sessionstorage-localstorage区别)
    - [监听页面加载完的两种形式](#监听页面加载完的两种形式)
    - [国外信用卡格式](#国外信用卡格式)
- [Vue相关](#vue相关)
    - [关于vue.js](#关于vuejs)
    - [关于vue-router](#关于vue-router)
    - [关于vuex](#关于vuex)
- [构建工具](#构建工具)
- [HTTP相关](#http相关)
    - [服务器状态码](#服务器状态码)
    - [跨域](#跨域)
    - [从输入url到看到页面的详细过程](#从输入url到看到页面的详细过程)
- [性能优化](#性能优化)
- [前端安全](#前端安全)
- [其他](#其他)

<!-- /TOC -->

## HTML

### 获取标签宽度  
   HTMLElement.offsetWidth  
   [参考链接](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth "获取标签宽度")  

### DOM的property和Attribute区别  
- property是js中对象中的标准属性,DOM.className  
- Attribute是标签文档中的属性,比如DOM.getAttribute('href')  

### 给标签添加自定义属性

```html
需要在前面加上'data-'，比如：

<a data-mid='2'>加上一个mid自定义属性</a>
```


## CSS

### 去除所有情况下a标签的下划线  

```css
  a {   text-decoration: none;  }  
  a:hover, a:visited, a:link {  text-decoration: none; }  
```

### position：static/absolute/relative  
+ static: 默认值，无特殊定位，对象遵循HTML原则;  
+ absolute:   
	绝对定位，将对象从文档流中拖离出来，使用left/right/top/bottom等属性相对其最接近的一个并有定位设置的父元素进行绝对定位;若没有父元素，则以html、body，浏览器的位置为相对位置，而其层叠通过z-index属性定义;  
+ relative:  
	相对定位，对象不可层叠，将依据right，top，left，bottom（相对定位）等属性在正常文档流中偏移位置(相对于谁呢？相对于它自己本身，即是在原来位置上偏移，而且注意原有位置就是在保留的);	  
### 隐藏多余溢出文字并显示省略号的样式  

```css
  overflow: hidden;  
  white-space: nowrap;  
  text-overflow: ellipsis;   
```

### a标签点击失效
可能的原因是层级问题，被覆盖，解决办法设置定位position:relative和z-index  
### :hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用  

### sass学习笔记  

- Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器  
```
  #main p {
    color: #00ff00;
    width: 97%;

    .redbox {
      background-color: #ff0000;
      color: #000000;
    }
  }

  编译为

  #main p {
    color: #00ff00;
    width: 97%; 
  }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; 
  }
```

- 父选择器 &: 代表嵌套规则外层的父选择器  
```
  a {
    font-weight: bold;
    text-decoration: none;
    &:hover { text-decoration: underline; }
    body.firefox & { font-weight: normal; }
  }

  编译为

  a {
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
```
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

- 注释： Sass 支持标准的 CSS 多行注释 /* */，以及单行注释 //，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会  

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
```
  $name: foo;
  $attr: border;
  p.#{$name} {
    #{$attr}-color: blue;
  }
  编译为

  p.foo {
    border-color: blue; 
  }
```

- @extend 引用另一个类的样式
```
  .error {
  border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    border-width: 3px;
  }

  -->

  .error {
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
```
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
```
  .page-title {
    @include large-text;
    padding: 4px;
    margin-top: 10px;
  }
```
3. 参数
```
  @mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
  }
  p { @include sexy-border(blue, 1in); }
```

## JavaScript

### jQuery点击事件失效  
+ 使用 $("#id").click(function(){ }); 有时会失效  
	原因：  
	直接将事件绑定在#id元素上，如果#id元素在绑定后生成，则不会触发改事件  
+ 推荐使用以下形式    

```javascript
  $(document).on('click','#id',function(){  
    console.log('document');  
  });  
```
原因：  
将事件绑定在document DOM树下，当事件到达#id元素时，事件程序被执行，由于是从整个document下寻找的，可以保证事件被触发  
[参考链接](https://stackoverflow.com/questions/14879168/document-onclick-id-function-vs-id-onclick-function "jQuery $(#id).click 和 $(document).on(click,#id,function(){ })区别") 

### if语句为false的几种情况：  
- 数字 0   
- 非数字 NaN   
- 空字符串 ''   
- 空指针 null  
- 没有定义 undefined  
- false本身   

### js发生异步的情况：需要等待  

等待的场景有：

- 定时任务：setTimeout, setInterval  
- 网络请求：ajax请求，图片img加载等  
- 事件绑定  

[博客整理](http://blog.csdn.net/lizhenqii/article/details/77806681 "博客整理")  

### 防止浏览器缓存  
	链接加上一个随机数，比如js中用Math.random()  

### BOM常见操作  
1. 判断浏览器类型navigator  

```javascript
  var ua = navigator.userAgent
  var isChrome = ua.indexOf('Chrome')
  console.log(isChrome)
```
2. 获取屏幕宽高screen  

```javascript
  screen.width
  screen.height
```
3. 拆解url各个部分location  
http://coding.xuan.com/lesson/115.html?id=1#mid=5390  

```javascript
  location.href //获取整一个连接
  location.protocol //协议类型 http
  location.hash //如 #mid=5390 
  location.search // 获取查询部分，如 ?id=1
  location.pathname // 'lesson/115.html'
```
4. 页面回退与前进 history  

```javascript
  history.back()
  history.forward()
```

### js获取随机数，要求长度一致的字符串格式  
	
```javascript
  var random = Math.random() + '0000000000' //使用Math random 获取随机数，再加上10位0
  var random = random.slice(0,10) //截取前10位

```
### 使用XMLHttpRequest写一个简单的ajax请求(暂未兼容IE) 

```javascript

  xhr = new XMLHttpRequest() //新建对象
  xhr.open('GET', '/api', false) //初始化请求
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){ //请求完成
      if(xhr.status === 200){ //服务器返回状态码
        window.alert(xhr.responseText)
      }
    }
  }
  xhr.send(null)

```
状态码readyState说明  

- 0 : (未初始化）还没有调用send()方法   
- 1 :（载入）已调用send()方法，正在发送请求   
- 2 : (载入完成) send方法执行完成，已经接受请求的全部内容  
- 3 : (交互) 正在解析交互内容  
- 4 : (完成) 解析内容完成，客户端可以调用  

[可参考文章](http://blog.csdn.net/liujiahan629629/article/details/17126727 "可参考文章")   

### cookie 和 sessionStorage localStorage区别
	
- 容量：cookie大小只有4KB，sessionStorage和localStorage有5MB
- 请求携带：所有http请求都要到上cookie，影响效率
- API易用性：cookie简单，需要封装，document.cookie = …  
其他两个简单易用，如localStorage.getItem(key) localStorage.setItem(key, value)

### 监听页面加载完的两种形式  

- 资源全部加载完的情况
```javascript
  window.addEventListener('load', function(){
  // 页面资源全部加载完全，包括视频、图片，才能执行
  })
```
- 只渲染完DOM，未加载完全部资源
```javascript
  document.addEventListener('DOMContentLoaded', function(){
  // 只渲染完DOM即可执行，未加载完全部资源，如视频、图片
  })
```

### 国外信用卡格式

```
defaultFormat = /(\d{1,4})/g;
cards = [
    {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [4],
      luhn: true
    }, {
      type: 'dankort',
      pattern: /^5019/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'hipercard',
      pattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
      format: defaultFormat,
      length: [14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^(36|38|30[0-5])/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'laser',
      pattern: /^(6706|6771|6709)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'maestro',
      pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^62/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'visaelectron',
      pattern: /^4(026|17500|405|508|844|91[37])/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'elo',
      pattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      length: [13, 16, 19],
      cvcLength: [3],
      luhn: true
    }
  ];

```



## Vue相关

### 关于vue.js

- 关于watch 和 computed  
	- 尽可能不要修改wacth和computed的值，避免造成死循环。
	- wacth想监听对象内部属性变化时，可以使用deep：true 或者 换成字符串格式监听：obj.a -> 'obj.a'，推荐使用后者
	- 当app里面的任意属性发生变化时，template会重新渲染。当template 是通过computed方法获取值时，只有computed 监听的属性发生变化时，才会重新调用函数，否则computed会取缓存里面的值；当template是通过methods里面的方法获取值时，只要app的任意属性发生变化，都会调用函数。所以，template相对于通过methods里面的方法获取值，通过computed获取值性能会更高。  

### 关于vue-router
[参考vue-router官网](https://router.vuejs.org/zh/ "vue-router官网")  

- vue-router别名  
/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。  
“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。  
上面对应的路由配置为：  
	
```
  const router = new VueRouter({
    routes: [
      { path: '/a', component: A, alias: '/b' }
    ]
  })
```  
- 给router-view加上过渡transition，使得路由跳转有过渡的效果  

```
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
```

- 路由传参的三种方法：  
1. /:id   通过this.$route获得
2. 设置路由配置的props属性为 true，组件直接在props中获得,比如：props['id']
3. 直接在组件中调用this.$route.query

- vue-router导航

```
  const userId = 123
  //通过name
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  //通过path
  router.push({ path: `/user/${userId}` }) // -> /user/123

  // query 带查询参数
  router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private

  注意：如果通过 path，参数params 会被忽略
```
### 关于vuex


## 构建工具

## HTTP相关

### 服务器状态码
	
- 2xx - 请求成功，如200
- 3xx - 需要重定向，服务器直接跳转
- 4xx - 客户端请求错误，如：找不到请求资源 404
- 5xx - 服务器端错误

### 跨域
	
- 跨域原因：浏览器有同源策略，不执行其他源网站的脚本  
- 同源条件：协议、域名、端口都要相同  
- 允许跨域加载资源的三个标签
	- img src= "xxx"
	- link href= "xxx"
	- script src= "xxx"
- 所有的跨域请求都必须经过信息提供方允许
- 解决跨域的两种方法  [可参考文章](http://blog.csdn.net/liujiahan629629/article/details/17126727 "可参考文章")  
- jsonp 利用script标签中src属性能够跨域访问的特性，先定义了一个回调方法，然后将其当作url参数的一部分发送到服务端，服务端通过字符串拼接的方式将数据包裹在回调方法中，再返回回来
- 服务器端设置 http header

### 从输入url到看到页面的详细过程  
主要有两个过程  
- 加载资源的过程
	1. 浏览器根据域名从DNS服务器获取IP地址
	2. 向该IP地址的机器发送http请求
	3. 服务器收到请求，返回数据
	4. 浏览器接受返回的数据
- 渲染页面的过程
	1. 根据html渲染成DOM Tree，只是DOM节点结构，还没有样式
	2. 根据css渲染成CSSOM
	3. 将DOM Tree和CSSOM整合成渲染树RenderTree，既有结构，又有样式
	4. 浏览器根据RenderTree展示页面  
	5. 遇到script会发生阻塞，先执行JavaScript的内容，因为js可以改变DOM节点和结构  
备注：第1、2、3步没有固定顺序，如果已经渲染CSSOM，在渲染html时，会即时渲染成RenderTree  

## 性能优化

- 优化原则   
	- 多使用内存、缓存或其他方法   
	- 多使用CPU计算，减少网络请求  
		
- 入手方面：   
- 加载页面和资源   
	- 资源压缩合并
	- 使用CDN
	- 静态资源缓存
	- 使用SSR后台渲染，数据直接渲染成HTML  

- 页面渲染  
	- CSS在前，JS在后，这跟渲染的过程有关
	- 懒加载
	- 减少DOM查询，DOM查询前可以先做缓存
	- 减少DOM操作，尽量合并操作
	- 事件节流，比如设置一定时间才监听
	- 尽早操作，比如使用DOMConentLoaded，代替onload  
   
 [博客整理](http://blog.csdn.net/lizhenqii/article/details/77856311 "博客整理")  

## 前端安全

- XSS 跨站脚本攻击  
恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。  
(跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS)   

例子：写博客时，添加script代码获取用户cookie，发送到自己的服务器，当用户查看博客时，即可产生攻击  
防范：1. 前端替换关键字，例如替换 < 和 >  2. 后端替换  

- CSRF 跨站请求伪造  
CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。  
尽管听起来像跨站脚本（XSS），但它与XSS非常不同，XSS利用站点内的信任用户，而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性。  

例子：发钓鱼邮件，点击付款  
防范：增加验证流程，如输入指纹、密码、短信验证码

## 其他





 







    



