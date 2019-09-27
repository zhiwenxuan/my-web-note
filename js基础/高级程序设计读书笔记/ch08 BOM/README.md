# 第八章 BOM
BOM (Browser Object Model 浏览器对象模式) 是 JavaScript的另外一个核心，提供了很多对象，用于访问浏览器的功能。主要有以下五个对象：
1. window
2. location
3. navigator
4. screen
5. history

### 8.1 window 对象
BOM 的核心对象是 window，它表示浏览器的一个实例。在浏览器中，window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。


#### 8.1.1 全局作用域
由于 window 对象同时扮演这 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。

#### 8.1.2 窗口关系及框架
主要是页面有多个 frame 的情况，目前使用比较少，不作过多记录。

#### 8.1.3 窗口位置
用来确定和修改 window 对象位置的属性和方法有很多，每个浏览器不太一样。主要有以下属性方法：
```js
// 使用时具体确认
screenLeft screenTop screenX screenY moveTo() moveBy()
```

#### 8.1.4 窗口大小
每个浏览器不太一样, 主要有以下属性方法：
```js
// 使用时具体确认
innerWidth innerHeight outerWidth outerHeight
```

虽然很难确定浏览器窗口大小，但是可以通过以下代码可以取得页面视口大小： 
```js
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
  if (document.compatMode == "CSS1Compat"){
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
  } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
  }
}
```

#### 8.1.5 导航和打开窗口
window.open()

#### 8.1.6 间歇调用和超时调用
setTimeout、clearTimeout、 setInterval 、clearInterval

#### 8.1.7 系统对话

alert() 、 confirm() 、 prompt()

### 8.2 location 对象

属性：
```js
Location.href // 包含整个URL的一个字符串
Location.protocol // 包含URL对应协议的一个字符串，最后有一个":"。
Location.host // 包含了域名的一个字符串，可能在该串最后带有一个":"并跟上URL的端口号。
Location.hostname // 包含URL域名的一个字符串。
Location.port // 包含端口号的一个字符串。
Location.pathname // 包含URL中路径部分的一个字符串，开头有一个“/"。
Location.search // 包含URL参数的一个字符串，开头有一个“?”。
Location.hash // 包含块标识符的字符串，开头有一个“#”。
Location.username // 包含URL中域名前的用户名的一个字符串。
Location.password // 包含URL域名前的密码的一个 字符串。
Location.origin 只读 // 包含页面来源的域名的标准形式字符串。
```

方法：

```js
Location.assign() // 加载给定URL的内容资源到这个Location对象所关联的对象上。
Location.reload() // 重新加载来自当前 URL的资源。他有一个特殊的可选参数，类型为 Boolean，该参数为true时会导致该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。
Location.replace() // 用给定的URL替换掉当前的资源。与 assign() 方法不同的是用 replace()替换的新页面不会被保存在会话的历史 History中，这意味着用户将不能用后退按钮转到该页面。
```

### 8.3 navigator
用得比较多的是 navigator.userAgent ，用来检测浏览器等，第九章再讨论。

### 8.4 screen
screen 对象中保存着与客户端显示器有关的信息，这些信息一般只用于站点分析。  
用得比较多的是 screen.width 和 screen.height。详细的可以查看 https://developer.mozilla.org/zh-CN/docs/Web/API/Screen 

### 8.5 history 对象
history 对象保存在用户上网的记录，从窗口被打开的那一刻算起。

属性：
```js
length // Read only 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。
scrollRestoration // 允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。
state  // 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态而的方式。
```

方法：
```js
History.back() // 前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1).
History.forward() // 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1).
History.go() // 通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1的时候为上一页，参数为1的时候为下一页. 当整数参数超出界限时，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错。调用没有参数的 go() 方法或者不是整数的参数时也没有效果。( 这点与支持字符串作为url参数的IE有点不同)。
History.pushState() // 按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数
History.replaceState() // 按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数
```
以上内容参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/History)

现在 MVVM 框架的路由跳转就是根据 history 属性来实现的。
