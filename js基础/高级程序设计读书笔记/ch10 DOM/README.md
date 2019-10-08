# 第十章 DOM
DOM（Document Object Model 文档对象模型）是针对 HTML 和 XML 文档的一个API。DOM 也是 JavaScript 的重要组成之一。

### 10.1 节点层次
DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点、数据和方法，另外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。

#### 10.1.1 Node 类型
Node 类型是所有节点类型的父类，其他节点类型都继承自 Node 类型。因此，Node 类型有一些其他节点类型共同的属性和方法。

##### nodeType 属性

每个节点都有一个 nodeType 属性，有如下 12 个值：
```js
Node.ELEMENT_NODE(1)
Node.ATTRIBUTE_NODE(2)
Node.TEXT_NODE(3)
Node.CDATA_SECTION_NODE(4)
Node.ENTITY_REFERENCE_NODE(5)
Node.ENTITY_NODE(6)
Node.PROCESSING_INSTRUCTION_NODE(7)
Node.COMMENT_NODE(8)
Node.DOCUMENT_NODE(9)
Node.DOCUMENT_TYPE_NODE(10)
Node.DOCUMENT_FRAGMENT_NODE(11)
Node.NOTATION_NODE(12)

// IE 中没有定义 `Node.ELEMENT_NODE` 这些常量，所以使用数值判断比较稳妥。

// 例子：
if (someNode.nodeType === 1) {
  console.log('Node is an element.') // nodeType 等于 1，说明是元素类型节点
}
```
平时最常用的就是 **元素 和 文本节点**。浏览器并没有支持以上的所有节点。


##### nodeName 和 nodeValue 属性
nodeName 和 nodeValue 表示节点的信息。不同类型的节点值不一样。如果是 元素节点， nodeName 表示的是标签名，nodeValue 为 null。

##### 节点关系
- 节点间的关系可以用传统的家族关系来描述。比如： body 元素 是 html 元素的子元素，是 head 元素的兄弟元素。

- 每个节点都有一个 childNodes 属性，值是一个 NodeList 对象，用于保存一组有序的节点，可以通过位置来访问这些节点。

- 每个节点都有一个 parentNode 属性，该属性指向文档树中的父节点。

- previousSibling 和 nextSibling 属性分别是前一个兄弟节点和后一个兄弟节点，如果没有，则为 null。

- 父节点的 firstChild 和 lastChild 属性分别指向其 childNodes 列表中的第一个和最后一个节点，不存在则为 null。

![节点关系](https://raw.githubusercontent.com/zhiwenxuan/my-web-note/master/img/node-relationship.png)

- hasChildNodes() 方法可以查询一个节点是否有子节点

##### 操作节点

- 添加节点： appendChild() 用于向 childNodes 列表的末尾添加一个节点。
```js
var returnedNode = someNode.appendChild(newNode); 
alert(returnedNode == newNode); //true 
alert(someNode.lastChild == newNode); //true
```

如果传入到 appendChild() 中的节点已经是文档的一部分，那就将该节点从原来的位置转移到新位置。如下：
```js
// someNode 有多子节点
var returnedNode = someNode.appendChild(someNode.firstChild); 
alert(returnedNode == someNode.firstChild); //false 
alert(returnedNode == someNode.lastChild); //true
```

- 插入节点： insertBefore() 方法可以插入节点，接收两个参数：要插入的节点和作为参照的节点。插入的位置是参考节点的前面（previousSibling）。如下例子：
```js
// 插入后成为最后一个节点
returnedNode = someNode.insertBefore(newNode, null); 
alert(newNode == someNode.lastChild); //true

// 插入后成为第一个节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild); 
alert(returnedNode == newNode); //true
alert(newNode == someNode.firstChild); //true

// 插入到最后一个子节点前面
returnedNode = someNode.insertBefore(newNode, someNode.lastChild); 
alert(newNode == someNode.childNodes[someNode.childNodes.length-2]); //true
```

- 替换节点： replaceChild()，两个参数： 要插入的节点和要替换的节点
```js
// 替换第一个子节点
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);

// 替换最后一个子节点
returnedNode = someNode.replaceChild(newNode, someNode.lastChild);
```

- 移除节点： removeChild()，一个参数：要移除的节点
```js
// 移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);

// 移除最后一个子节点
var formerLastChild = someNode.removeChild(someNode.lastChild);
```

**以上的的四个方法并不是所有节点类型都支持，因此有些类型的节点不支持子节点**，下面介绍两个所有类型都支持的方法：

- 克隆节点：cloneNode()，一个布尔值参数：如果是 true，执行深复制，也就是复制节点本身及其整个子节点树；如果是 false，只复制本身。要注意这些节点复制出来后，还是脱离文档本身的，可以使用以上的方法进行与文档的关联。

- normalize()方法，只针对文本节点，用于删除空文本节点和合并两个相邻的文本节点。

#### 10.1.2 Document 类型

JavaScript 通过 Document 类型表示文档。在浏览器中， document 对象是 HTMLDocument （继承自 Document 类型）的一个实例，表示整个 HTML 页面。另外，document 对象是 window 对象的一个属性，因此可以全局访问。

Document 节点具有下列特征：  
- nodeType 的值为9；
- nodeName 的值为 "#document"
- nodeValue 的值为 null
- parentNode 的值为 null
- ownerDocument 的值为 null

Document 类型可以表示 HTML 页面或者其他基于 XML 的文档。最常见的应用的还是作为 HTMLDocument 实例的 document 对象。

##### 文档信息

```js
// 取得文档标题
var originalTitle = document.title;
// 设置文档标题
document.title = 'New Page Title';

// 文档的整个 URL
document.URL

// 文档的域名
document.domain

// 文档来源页面的 URL，如果没有，则为空字符串
document.referrer
```

##### 查找元素

```js
// 通过 ID
document.getElementById()

// 通过标签名
document.getElementsByTagName()

// 通过类名
document.getElementsByClassName()

// 通过选择器， 返回符合条件的第一个元素
document.querySelector() 
// 通过选择器， 返回符合条件所有元素
document.querySelectorAll() 

// 等等
```

##### 特殊元素集合
```js
document.anchors // 包含文档中所有带 name 特性的 <a> 元素

document.forms // 包含文档中所有的 <form> 元素

docuement.images // 包含文档中所有 <img> 元素

document.links // 包含文档中所有带 href 特性的 <a> 元素

// 等等
```

#### 10.1.3 Element 类型
除了 Document 类型外，Element 类型是 web 编程中最常用的类型了。Element 节点具有以下特征：

- nodeType 的值为 1
- nodeName 的值为元素的标签名
- nodeValue 的值为 null
- parentNode 可能是 Document 或 Element
- 其子节点可能是 Element 、 Text、Comment 等

##### HTML 元素
所有的 HTML 元素都由 HTMLElement 类型或者 HTMLElement 的子类型来表示。HTML 元素一些添加的属性：id、title、className 等等。

##### 属性操作

```js
// 获取属性
getAttribute()

// 设置属性
setAttribute()

// 移除属性
removeAttribute()
```

根据 HTML5 规范，自定义属性前面要加上 data- 。

##### 创建元素
通过 `document.createElement()`  可以创建 Element 元素

#### 10.1.4 Text 类型

文本节点由 Text 类型 表示，具有以下特征：

- nodeType 的值为3 
- nodeName 的值为 "#text"
- nodeValue 的值为节点所包含的文本
- parentNode 是一个 Element 
- 没有子节点

创建文本节点可以使用 `document.createTextNode()`，如下：
```js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);
```

#### 10.1.5 Comment 类型
注释在 DOM 中是通过 Comment 类型类表示的。Comment 节点具有以下特征：

- nodeType 的值为8
- nodeName 的值为 "#comment"
- nodeValue 的值是注释的内容
- parentNode 可能是Document 或 Element
- 没有子节点

通过 `document.createComment()` 可以创建注释节点
