# DOM 扩展

### 11.1 选择符 API
```js
querySelector() // 返回符合条件的第一个元素，没有返回 null
querySelectorAll() // 返回符合元素的所有元素
matchsSelector() // 判断元素是否符合选择器
```

### 11.2 元素遍历
对于元素间的空格，IE9 及之前版本不会返回空白节点，而其他浏览器都会返回文本节点，导致使用 childNodes 和 firstChild 等属性时行为不一致。为了弥补差异，Element Traversal API 为 DOM 元素添加了一下 5 个属性：

```js
childElementCount // 返回子元素（不包含文本节点和注释）的个数
firstElementChild // 指向第一个子元素；firstChild 的 Element 类型版本
lastElementChild // 指向最后一个元素；lastChild 的 Element 类型版本
previousElementSibling // 指向前一个兄弟元素，previousSibling 的 Element 类型版本
nextElementSibling // 指向后一个兄弟元素；nextSibling 的 Element 类型版本
```

遍历元素的例子：
```js
// 不使用新API
var child = element.firstChild;
while(child != element.lastChild){
  if (child.nodeType == 1){ // 检查是不是元素类型
    processChild(child);
  }
  child = child.nextSibling;
}

// 使用新 API，代码更简洁
var child = element.firstElementChild;
while(child != element.lastElementChild){
  processChild(child); // 已知是元素类型
  child = child.nextElementSibling;
}
```

### 11.3 HTML5

#### 11.3.1 与类相关的扩充

##### getElementsByClassName()
返回调用元素的子元素中符合条件的所有的元素

##### classList 属性
通过 classList 属性可以进行 添加、删除、替换类名等

```js
add(value) ： 将给定的字符串值添加到类名列表中，如果已经存在，就不添加
contains(value): 判断是否存在该类名
remove(value): 从类名列表中删除类名
toggle(value): 如果类名列表中存在，则删除它；如果不存在，则添加它

// 例子
div.classList.add("current");
div.classList.toggle("user");
```

#### 11.3.2 焦点管理
HTML5 也添加了辅助管理 DOM 焦点的功能。主要有两个属性：

- document.activeElement 属性  
这个属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入（通常是通过按 Tag 键）和在代码中调用 focus() 方法。如下例子：

```js
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button);   //true
```

默认情况下，文档刚刚加载完成时，document.activeElement 中保存的是 document.body 元素的引用。 文档加载期间，document.activeElement 为 null。

- document.hasFocus() 方法  
这个方法用于确定文档是否获得焦点。

```js
var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus());  //true
```

#### 11.3.3 HTMLDocument 的变化

1. readyState 属性

- loading，正在加载
- complete， 加载完成

2. head 属性
可以直接通过 document.head 引用文档的 <head> 元素
```js
var head = document.head || document.getElementsByTagName("head")[0];
```

#### 11.3.4 字符集属性
charset 属性表示文档中实际使用的字符集

```js
alert(document.charset); //"UTF-16"
document.charset = "UTF-8";
```

#### 11.3.5 自定义数据属性
加上前缀 data- 可以自定义属性。

```html
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```

通过 dataset 属性可以访问自定义属性，注意访问时，去掉前缀 data- 。
```js
var div = document.getElementById("myDiv");

// 取得自定义属性
var appId = div.dataset.appId; 
var myName = div.dataset.myname;

// 设置自定义属性
div.dataset.appId = 23456; 
div.dataset.myname = "Michael";
```

#### 11.3.6 插入标记

innerHTML 、 outerHTML 和 insertAdjacentHTML()

#### 11.3.7 scrollIntoView() 方法
让元素滚动可见区域，注意兼容性

```js
document.forms[0].scrollIntoView();
```
