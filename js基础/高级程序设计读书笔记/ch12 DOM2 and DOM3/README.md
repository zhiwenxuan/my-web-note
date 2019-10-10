# 第十二章 DOM2 和 DOM3
DOM1 级主要定义的是 HTML 和 XML 文档的底层结构。DOM2 和 DOM3 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。

DOM2 和 DOM3 主要有一下几个模块：  
- DOM2 级核心（Core）
- DOM2 级视图（Views）
- DOM2 级事件（Events）
- DOM2 级样式（Style)
- DOM2 级遍历和范围（Traversal and Range)
- DOM2 级 HTML （HTML）

通过 `document.implementation.hasFeature()` 可以判断浏览器是否支持该模块。如下： 
```js
var supportsDOM2Core = document.implementation.hasFeature("Core", "2.0"); 
var supportsDOM3Core = document.implementation.hasFeature("Core", "3.0"); 
var supportsDOM2HTML = document.implementation.hasFeature("HTML", "2.0"); 
var supportsDOM2Views = document.implementation.hasFeature("Views", "2.0"); 
var supportsDOM2XML = document.implementation.hasFeature("XML", "2.0");
```

本章主要学习除了 “DOM2 级事件”之外的所有模块。

### 12.1 DOM 变化
主要是增加命名空间的支持。

#### 12.1.1 针对 XML 命名空间的变化
由于使用不多，不作总结，具体可以查看文档。

#### 12.1.2
1. DocumentType 类型的变化  
新增 3 个 属性： publicId、systemId 和 internalSubset

2. Document 类型变化  
增加 `importNode()` 方法，主要用来导入其他文档的节点。有两个参数，第一个是其他文档的节点，第二个 Boolean 值，表示是否复制子节点。
```js
var newNode = document.importNode(oldNode, true); // 导入节点及其所有子节点
document.body.appendChild(newNode);
```

3. Node 类型变化  

新增 `isSupported()`方法，与 `document.implementation.hasFeature()`类似。
```js
if (document.body.isSupported("HTML", "2.0")){ 
  // do something
}
```

新增比较节点的方法：`isSameNode()` 和 `isEqualNode()` 。
```js
var div1 = document.createElement("div"); 
 div1.setAttribute("class", "box");

var div2 = document.createElement("div");
div2.setAttribute("class", "box");

alert(div1.isSameNode(div1)); //true 
alert(div1.isEqualNode(div2)); //true 
alert(div1.isSameNode(div2)); //false
```

### 12.2 样式

#### 12.2.1 访问元素的样式
任何支持 style 特性的 HTML 元素在 JavaScript 中都有 style 属性。需要注意的是：  
- style 只包含**通过 HTML 的 style 特性指定的样式信息**，不包括外部样式表和嵌入样式表中的信息。 
- 使用中划线的属性会转为驼峰命名方式，比如：`background-image => backgroundImage`。
- 由于 `float` 在 JavaScript 中是保留字，所以 float 对应的是 `cssFloat`，IE 浏览器特殊，是 `styleFloat`。

从上面知道，style 属性不包含外部样式表和嵌入式样式表， DOM2 中新增了 `getComputedStyle()` 方法来弥补，可以获取当前元素的所有计算样式。

`getComputedStyle()` 接收两个参数，第一个是目标元素；第二个是伪元素字符串，如：':after'，如果不需要伪元素的信息，第二个参数是 null。

如下例子：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Computed Styles Example</title>
  <style type="text/css">
      #myDiv {
          background-color: blue;
          width: 100px;
          height: 200px;
      }
  </style>
</head>
<body>
  <div id="myDiv" style="background-color: red; border: 1px solid black"></div> 
</body>
</html>
```

```js
var myDiv = document.getElementById("myDiv");
var computedStyle = document.defaultView.getComputedStyle(myDiv, null);
alert(computedStyle.backgroundColor); // "red"
alert(computedStyle.width); // "100px"
alert(computedStyle.height); // "200px"
alert(computedStyle.border); // 在某些浏览器中是 "1px solid black"
```

IE 中不支持  `getComputedStyle()` 方法，类似功能的属性是 `currentStyle`
```js
var myDiv = document.getElementById("myDiv");
var computedStyle = myDiv.currentStyle;
alert(computedStyle.backgroundColor); // "red"
alert(computedStyle.width); // "100px"
alert(computedStyle.height); // "200px"
alert(computedStyle.border); // undefined
```

#### 12.2.2 操作样式表
关键属性： `document.styleSheets`

具体查看文档

#### 12.2.3 元素大小
使用 `getBoundingClientRect()`

### 12.3 遍历
"DOM2 级遍历和范围" 模块定义两个辅助遍历的类型：NodeIterator 和 TreeWalker，两者都是采用 深度优先 遍历。

检测是否支持：
```js
var supportsTraversals = document.implementation.hasFeature("Traversal", "2.0"); 
var supportsNodeIterator = (typeof document.createNodeIterator == "function"); 
var supportsTreeWalker = (typeof document.createTreeWalker == "function");
```

#### 12.3.1 NodeIterator
通过  document.createNodeIterator 方法创建实例，接收四个参数：
1. root 
2. whatToShow： 要访问哪些节点的数字代码
3. filter： 一个 NodeFilter 对象 或者 一个过滤函数
4. entityReferenceExpansion：布尔值，表示是否要扩展实体引用，在 HTML 中没有用

一个小例子：

```html
<div id="div1">
  <p><b>Hello</b> world!</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul> 
</div>
```

```js
// 展示div 中 的li 标签
var div = document.getElementById("div1");
var filter = function(node){
    return node.tagName.toLowerCase() == "li" ?
        NodeFilter.FILTER_ACCEPT :
        NodeFilter.FILTER_SKIP;
};

var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, filter, false);

var node = iterator.nextNode();
while (node !== null) {
    alert(node.tagName);
    node = iterator.nextNode();
}
```

#### 12.3.2 TreeWalker
TreeWalker 是 NodeIterator 的增强版本，多增加如下几个方法：  

- parentNode()
- firstChild()
- lastChild()
- nextSibling()
- previousSibling()

通过 document.createTreeWalker() 来创建实例。其他和 NodeIterator 一样。

### 12.4 范围
为了让更方便控制页面，“DOM2 级遍历和范围” 模块定义了 “范围”（range）接口。通过范围可以选择文档中的一个区域，并进行操作。 

关键方法： `document.createRange()` ，具体查看文档

检测浏览器是否支持范围：
```js
var supportsRange = document.implementation.hasFeature("Range", "2.0");
var alsoSupportsRange = (typeof document.createRange == "function");
```
