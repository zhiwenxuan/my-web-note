# 第十三章 事件

JavaScript 与 HTML 之间的交互是通过事件来实现的。事件是文档或者浏览器窗口中发生的一些特定的交互瞬间。运用观察者模式：使用侦听器（或处理程序）来订阅事件，以便事件发生时执行相应的代码。

### 13.1 事件流
事件流描述的是从页面中接收事件的顺序。 IE 和 Netscape 团队概念相反， IE的事件流是 事件冒泡流，而 Netscape 的是 事件捕获流。

#### 13.1.1 事件冒泡
顺序：从目标对象往文档 document 对象，**逐级往上**传播。

```html
<!DOCTYPE html>
<html>
  <head>
      <title>Event Bubbling Example</title>
  </head>
  <body>
      <div id="myDiv">Click Me</div>
  </body>
</html>
```
如果点击了 div 元素，click 事件的传播顺序：div -》 body -》 html -》 document 。 

兼容性： 所有浏览器。

#### 13.1.2 事件捕获
顺序跟事件冒泡相反，从 document 对象往目标对象，逐级往下传播。

按照上面的例子，click 事件的传播顺序：document -》 html -》 body  -》 div。

兼容性：IE浏览器，IE8以前的不支持事件捕获，其他类型浏览器以及IE9都支持。


#### 13.1.3 DOM 事件流

“DOM2级事件” 规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。 

按照上面的例子，事件流是：document -》 html -》 body  -》 div -》 body -》 html -》 document 。

即使 “DOM2级事件” 规范明确要求捕获阶段不会涉及事件目标，但 IE9、Safari、Chrome、Firefox 和 Opera9.5+ 都会在捕获阶段触发事件对象的事件。因此，既可以在捕获阶段触发事件，也可以在冒泡阶段触发阶段。

捕获阶段：document -》 html -》 body  -》 div  
冒泡阶段：div -》 body -》 html -》 document  

兼容性：IE8 及更早版本不支持 DOM 事件流，因为不支持事件捕获。

### 13.2 事件处理程序
事件就是用户或浏览器自身执行的某种动作，如：click，load等。而响应某个时间的函数就叫做**事件处理程序**。事件处理程序的名字以 “on” 开头，如：onclick、onload等。

事件指定处理程序的种类有：HTML 事件处理程序、DOM0级事件处理程序、DOM2级事件处理程序、IE事件处理程序、跨浏览器事件处理程序。下面分别详细讲述。

#### 13.2.1 HTML 事件处理程序
事件直接绑定在 HTML 元素上，如下：

```html
<input type="button" value="Click Me" onclick="alert('Clicked')" />
```

一些缺点：HTML 和 JavaScript 代码紧急耦合。

#### 13.2.2 DOM0级事件处理程序
将函数值赋值给操作对象的事件处理程序属性。**事件处理程序在其所属元素的作用域内运行**。如下：

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("Clicked");
    alert(this.id) // myBtn，this 指向 btn 对象
};

btn.onclick = null; //销毁事件处理程序
```

**兼容性**：所有浏览器

**缺陷**：一个事件只支持一个处理函数，从代码可以看到，添加第二个时，前面的会被覆盖。

#### 13.2.3 DOM2级事件处理程序
“DOM2级事件”定义了两个方法，用于指定和删除事件处理程序： addEventListener() 和 removeEventListener()。所有的 DOM 节点中都包含这两个方法，并且它们接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，则在冒泡阶段。

**事件处理程序在其所属元素的作用域内运行**

```js
var btn = document.getElementById("myBtn");

// 添加事件
btn.addEventListener('click', function() {
  alert(this.id);
}, false);

// 删除事件
btn.removeEventListener('click', function() { // 不起作用，因为传入的对象和添加事件的函数对象不一样
  alert(this.id);
}, false);

// 做以下优化

// 将处理函数单独定义
var handler = function() {
  alert(this.id)
}
btn.addEventListener('click', handler, false);
btn.removeEventListener('click', handler, false); // 可以正常移除事件
```

**兼容性**：IE9、Firefox、Safari、Chrome、和Opera 支持

#### 13.2.4 IE事件处理程序
IE实现了与DOM中类似的两个方法： attachEvent() 和 detachEvent()。 这两个方法接收相同的两个参数：事件处理程序名称和事件处理程序函数。 添加的事件处理程序都是在冒泡阶段触发。

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
    alert("Clicked");
    alert(this === window); //true
});

// 添加多个事件处理程序函数时，事件触发时先打印后面的 “Hello World”，再打印“Clicked”
btn.attachEvent("onclick", function(){
    alert("Clicked");
});
btn.attachEvent("onclick", function(){
    alert("Hello world!");
});
```

**与DOM事件处理程序不同点**：  
1. 事件名是 ‘onclick’ 而不是 ‘click’
2. 事件处理程序作用域是 **全局作用域**，而不是所属元素的作用域
3.  添加多个事件处理程序函数时，事件触发时先运行最后添加的，顺序跟 DOM 的相反。

**移除事件**：跟DOM2级一样，传入的函数对象要一样，才能有效移除。
```js
var btn = document.getElementById("myBtn");
var handler = function(){
    alert("Clicked");
};
btn.attachEvent("onclick", handler);
btn.detachEvent("onclick", handler);
```

**兼容性**：支持的浏览器只有：IE 和 Opera

#### 13.2.5 跨浏览器的事件处理程序
自定义函数，兼容各种浏览器。

```js
// 因为要兼顾IE，所以统一在冒泡阶段触发
var EventUtil = {
    // element：目标参数，type： 事件类型， handler： 处理函数
    addHandler: function(element, type, handler){
        if (element.addEventListener) { // 首先判断是否支持 addEventListener
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { // 其次是 IE的
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler; // 最后默认是 DOM0级的，按照目前的浏览器，几乎很少到这个选项
        }
    },
    // element：目标参数，type： 事件类型， handler： 处理函数
    removeHandler: function(element, type, handler){
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        } 
    }
};

// 使用例子
var btn = document.getElementById("myBtn");
var handler = function() {
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);
```

### 13.3 事件对象
在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。

所有浏览器都支持 event 对象，但支持方式不同。

#### 13.3.1 DOM中的事件对象
浏览器会将一个 event 对象传入到事件处理程序中。

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
  alert(event.type); // click
}
btn.addEventListener('click', function(event) {
  alert(event.type); // click
}, false)
```

`event` 对象有很多属性，可以查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event)，下面对几个重要的属性进行介绍。

##### 关于事件目标
this 始终等于 currentTarget 的值，而 target 指向的事件实际的目标（触发点）。如果直接将事件处理函数指定给目标元素，this、currentTarget 和 target 的值相同。

```js
// 直接将事件处理函数指定给目标元素 btn
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
  alert(event.currentTarget === this); // true
  alert(event.target === this); // true
};

// 把监听放在 body，但是实际触发的是 btn
document.body.onclick = function(event){ 
  alert(event.currentTarget === document.body); //true 
  alert(this === document.body); //true 

  alert(event.target === document.getElementById("myBtn")); // true
  alert(event.target === this); // false
};

```

##### 事件类型 type
通过 event.type 可以判断是什么类型的事件。

一个小应用，通过一个函数处理多种事件，如下：
```js
var btn = document.getElementById("myBtn");
var handler = function(event){
  switch(event.type) {
    case "click":
      alert('click');
      break;
    case "mouseover":
      event.target.style.backgroundColor = "red";
      break;
    case "mouseout":
      event.target.style.backgroundColor = "";
      break;
  }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```

##### 阻止特定事件的默认行为 preventDefault()

```js
// 阻止 <a> 默认的跳转页面行为
var link = document.getElementById("myLink");
link.onclick = function(event){
    event.preventDefault();
};
```
**注意点**：只有 event.cancelable 设置为 true 时，才能使用 preventDefault() 阻止默认行为。

##### 阻止冒泡 stopPropagation()
```js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
  alert("Clicked");
  event.stopPropagation();
};
document.body.onclick = function(event){
  alert("Body clicked"); // 按钮点击时，这里不会响应
}
```

##### 事件流阶段 eventPhase
- 捕获阶段： eventPhase 为 1  
- 目标阶段： eventPhase 为 2  
- 冒泡阶段： eventPhase 为 3  

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert(event.eventPhase); //2
};
document.body.addEventListener("click", function(event){
    alert(event.eventPhase); //1
}, true);
document.body.onclick = function(event){
    alert(event.eventPhase); //3
};
```

#### 13.3.2 IE中的事件对象

##### 访问 event 对象
根据添加事件的方式不同，访问 IE 中 event 对象方式也不同。使用 DOM0级方法时，event 挂载在 window 上；使用 attachEvent 时，event 作为参数传入。

```js
// DOM0级方式
var btn = document.getElementById("myBtn");
btn.onclick = function(){
  var event = window.event;
  alert(event.type);     //"click"
};

// attachEvent
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(event) { 
  alert(event.type); //"click"
});
```

##### IE 中 event 对象跟 DOM 的 event 对象主要不同之处
```js
cancelBubble // 默认 false，设置为 true 时，跟 DOM 中 stopPropagation() 作用一样
returnValue // 默认为 true，设置为 false 时，跟 DOM 中 preventDefault() 作用一样
srcElement // 事件的目标，跟 DOM 中的target属性相同
```

一些例子
```js
// 关于目标
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(window.event.srcElement === this); // true
};
btn.attachEvent("onclick", function(event){
    alert(event.srcElement === this); // false, 由于在attachEvent 中，this指向window，所有不相等
});

// 关于阻止默认行为
var link = document.getElementById("myLink");
link.onclick = function(){
  window.event.returnValue = false;
};

// 关于阻止冒泡
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("Clicked");
    window.event.cancelBubble = true;
};
document.body.onclick = function(){
    alert("Body clicked");
};

```

#### 13.3.3 跨浏览器的事件对象
自定义函数，兼容各种浏览器

```js
var EventUtil = {
    // element：目标参数，type： 事件类型， handler： 处理函数
    addHandler: function(element, type, handler){
        if (element.addEventListener) { // 首先判断是否支持 addEventListener
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { // 其次是 IE的
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler; // 最后默认是 DOM0级的，按照目前的浏览器，几乎很少到这个选项
        }
    },
    // element：目标参数，type： 事件类型， handler： 处理函数
    removeHandler: function(element, type, handler){
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        } 
    },

    // 关于获取 event 对象
    getEvent: function(event){
      return event ? event : window.event;
    },

    // 获取实际目标
    getTarget: function(event){
      return event.target || event.srcElement;
    },

    // 阻止默认行为
    preventDefault: function(event){
      if (event.preventDefault){
          event.preventDefault();
      } else {
          event.returnValue = false;
      }
    },

    // 阻止冒泡
    stopPropagation: function(event){
      if (event.stopPropagation){
          event.stopPropagation();
      } else {
          event.cancelBubble = true;
      } 
    }
};
```
增加 4 个方法，每个方法都要传入 event 对象，由于获取 event 方式不一样，所以每次首先使用 getEvent 方法来获取到 event 对象，再进行其他操作。

```js
btn.onclick = function(event){
  // 第一步：先获取 event 对象
  event = EventUtil.getEvent(event);
  // 第二步：再传入
  var target = EventUtil.getTarget(event);
};
```

### 13.4 事件类型

“DOM3级事件” 规定了以下几类事件：
```  
- UI事件，当用户与页面上的元素交互时触发，有时不一定与用户操作相关
- 焦点事件，当元素获得或失去焦点时触发
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发
- 滚轮事件，当使用鼠标滚轮时触发
- 文本事件，当在文档中输入文本时触发
- 键盘事件，当用户通过键盘在页面上执行操作时触发
- 合成事件，当为 IME（Input Method Editor，输入法编辑器）输入字符时触发
- 变动事件，当底层DOM结构发生变化时触发
```

#### 13.4.1 UI事件

##### UI事件有：  
```
- load：当页面完全加载后再window 上面触发；或者图像加载完在 <img> 上触发；或者当嵌入内容加载完在 <object> 上触发
- unload：跟load 相反，卸载完时 触发
- abort：用户停止下载时触发等
- error：发生 JavaScript 错误时，在window上触发；或者图像加载失败；或者嵌入内容加载失败
- select：用户选择文本框中字符是触发
- resize：窗口变化时，在window上触发
- scroll：元素中滚动条变化时触发
```

#### 13.4.2 焦点事件

焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与 document.hasFocus() 方法及 document.activeElement 属性配合，可以知道用户在页面的行踪。

##### 焦点事件有：
```
- blur: 在元素失去焦点时触发，不会冒泡，所有浏览器都支持
- focus：在元素获得焦点时触发，不会冒泡，所有浏览器都支持
```

#### 13.4.3 鼠标与滚轮事件

##### 种类：
```
- click：单击主鼠标按钮（一般是左边的按钮）或者 按下回车键时触发
- dbclick
- mousedown：按下鼠标按钮任何键
- mouseenter：鼠标光标从元素外部首次移动到元素范围内触发
- mouseleave：鼠标光标从元素上面移开触发
- mousemove：鼠标指针在元素内部移动时重复触发
- mouseout：移开时可以是子元素，可以是外部元素
- mouseover
- mouseup：释放鼠标按钮时触发
- mousewheel: 滚轮滚动时触发
```

除了 mouseenter 和 mouseleave，所有鼠标事件都会冒泡。

只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会出发 click 事件。连续两次触发 click 才会出发 dbclick。四个事件的顺序：

mousedown -> mouseup -> click -> mousedown -> mouseup -> click -> dbclick

