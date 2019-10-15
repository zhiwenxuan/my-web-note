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

##### 1）关于事件目标
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

##### 2）事件类型 type
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

##### 3）阻止特定事件的默认行为 preventDefault()

```js
// 阻止 <a> 默认的跳转页面行为
var link = document.getElementById("myLink");
link.onclick = function(event){
    event.preventDefault();
};
```
**注意点**：只有 event.cancelable 设置为 true 时，才能使用 preventDefault() 阻止默认行为。

##### 4）阻止冒泡 stopPropagation()
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

##### 5）事件流阶段 eventPhase
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

##### 1）访问 event 对象
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

##### 2）IE 中 event 对象跟 DOM 的 event 对象主要不同之处
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

##### 1）种类：
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

##### 2）关于鼠标位置
clientX、clientY：鼠标指针在**视口**中的水平和垂直坐标

pageX、pageY：鼠标指针在**页面**中的水平和垂直坐标

screenX、screenY：鼠标指针相对**整个电脑屏幕**的水平和垂直坐标

##### 3）修改键
按下鼠标时，键盘中的某些按键也可能按下，通过组合可以进行不同的操作。这些修改键有：Shift、Ctrl、Alt 和 Meta（在 Windows 键盘中是Windows建；在Mac 中是 Cmd 键），常用来修改鼠标事件的行为。

DOM 规定了 4 个布尔值属性：shiftKey、ctrlKey、altKey 和 metaKey（IE8及之前不支持）。如果相应的键被按下，值则为 true，否则为 false。

```js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
  event = EventUtil.getEvent(event);

  if (event.shiftKey){ // 同时按下鼠标和 shift 键
    // do something
  }
  if (event.ctrlKey){
    // do something
  }
  if (event.altKey){
    // do something
  }
  if (event.metaKey){
    // do something
  }
});
```
**通过修改键和鼠标的结合，可以支持更多的场景，解决一些事件冲突。**

##### 4）相关元素
mouseover 和 mouseout 事件都会涉及把鼠标指针从一个元素的边界之内移动到另外的元素的边界之内。  
对于 mouseover，主目标是获得光标的元素，相关元素是失去光标的元素。  
对于 mouseout，主目标是失去光标的元素，相关元素是获得光标的元素。

##### 5）鼠标按钮
对于 mousedown 和 mouseup 事件来说，event 对象中存在 button属性，表示按下或释放的按钮。

在 DOM 标准中，值分别如下：  
```js
event.button === 0; // 主鼠标按钮
event.button === 1; // 中间鼠标按钮
event.button === 2; // 次鼠标按钮
```

在 IE8及之前版本中，值如下：
```js
event.button === 0; // 没有按下按钮
event.button === 1; // 按下主鼠标按钮
event.button === 2; // 按下次鼠标按钮
event.button === 3; // 同时按下主鼠标按钮和次鼠标按钮
event.button === 4; // 按下中间鼠标按钮
event.button === 5; // 同时按下主鼠标按钮和中间鼠标按钮
event.button === 6; // 同时按下次鼠标按钮和中间鼠标按钮
event.button === 7; // 同时按下三个鼠标按钮
```

##### 6）鼠标滚轮事件
mousewheel （IE、Opera、Chrome、Safari），event 中的 wheelDelta 属性记录鼠标滚动，向前滚动时 120 的倍数，向后滚动时 -120 的倍数。(Opera9.5 之前，正负值是反过来的)
```js
EventUtil.addHandler(document, "mousewheel", function(event){ 
  event = EventUtil.getEvent(event); 
  alert(event.wheelDelta);
});
```

Firefox 中事件名称是 DOMMouseScroll ，使用 detail 来记录，向前是 3 的倍数，向后是 -3 的倍数。
```js
EventUtil.addHandler(window, "DOMMouseScroll", function(event){ 
  event = EventUtil.getEvent(event);
  alert(event.detail);
});
```

兼容性函数：
```js
var EventUtil = { 
  // 省略其他代码

  getWheelDelta: function(event){
    if (event.wheelDelta){ 
      return (client.engine.opera && client.engine.opera < 9.5 ?
            -event.wheelDelta : event.wheelDelta);
    } else {
      return -event.detail * 40; // Firefox 的，统一转为120
    }
  },

  // 省略其他代码 
};
```

##### 7）触摸设备
对于 iPhone 和 iPad 中的 Safari：   
- 不支持 dblclick
- 单击元素触发 mousemove
- mousemove 事件也会触发 mousover 和 mouseout
- 两个手指放在屏幕移动会触发 mousewheel 和 scroll

其他设备和浏览器请查看文档


#### 13.4.4 键盘与文本事件

##### 1）键盘事件种类
```
keydown: 按下键盘任意键触发，按住不放，重复触发
keypress：按下键盘字符键触发，按住不放，重复触发
keyup：释放按键触发
```

##### 2）键码
`event.keyCode` 表示键盘的按键。

##### 3）textInput 事件
“DOM3级事件” 规范引入的新事件。当用户在可编辑区域中输入字符，就会触发这个事件。event.data 属性记录输入的字符。
```js
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "textInput", function(event){ 
  event = EventUtil.getEvent(event);
  alert(event.data);
});
```

event.inputMethod 属性记录文本输入的方式，具体查看文档。

#### 13.4.5 变动事件
DOM 中某一部分发生变化时触发。 具体可以查看文档。

```js
DOMSubtreeModified
DOMNodeInserted
DOMNodeRemoved
DOMNodeInsertedIntoDocument
OMNodeRemovedFromDocument
DOMAttrModified
DOMCharacterDataModified
```

#### 13.4.6 HTML5 事件

##### 1）contextmenu 事件
菜单事件，通过单击鼠标右键触发。

```js
EventUtil.addHandler(window, "load", function(event){
  var div = document.getElementById("myDiv");
  EventUtil.addHandler(div, "contextmenu", function(event){
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
    var menu = document.getElementById("myMenu");
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.style.visibility = "visible";
  });
  EventUtil.addHandler(document, "click", function(event){ 
    document.getElementById("myMenu").style.visibility = "hidden";
  });
});
```

兼容性： IE、Firefox、Safari、Chrome 和 Opera 11+

##### 2）beforeunload 事件
当用户关闭页面时触发，可以用来提醒用户是否要关闭页面，比如用户还没有保存表单内容

```js
EventUtil.addHandler(window, "beforeunload", function(event){ 
  event = EventUtil.getEvent(event);
  var message = "I'm really going to miss you if you go."; 
  event.returnValue = message;
  return message;
});
```
兼容性： IE、Firefox、Safari、Chrome 和 Opera 11+

##### 3）DOMContentLoaded 事件
load 事件是要等一切都加载完毕触发，DOMContentLoaded 事件则在形成完整的 DOM 树之后触发，不理会 图像、JavaScript、CSS 等资源。

好处：可以让用户尽早与页面进行交互。

兼容性：IE9+、Firefox、Safari、Chrome 和 Opera 9+

##### 4）hashchange 事件
HTML5 新增了 hashchange 事件，当 URL 中 hash 值发生变化时触发。MVVM 框架的 hash 模式路由框架就是依靠这个来实现的。

```js
EventUtil.addHandler(window, "hashchange", function(event){ 
  alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
});
```

兼容性：IE8+、Firefox、Safari、Chrome 和 Opera 10.6+


#### 13.4.7 设备事件
略

#### 13.4.8 触摸与手势事件

##### 1）触摸事件

```
touchstart ：手指触摸屏幕时触发
touchmove ：手指在屏幕上滑动时连续触发
touchend ：手指从屏幕移开
```
具体使用看文档

##### 2）手势事件
iOS2.0 中 Safari 引入一组手势事件。如下：

```
gesturestart: 当一个手指已经在屏幕上，另外一个手指有触摸屏幕
gesturechange：当触摸屏幕的任意一个手指发生变化
gestureend：当任何一个手指从屏幕上移开时
```
具体使用看文档

### 13.5 内存和性能
每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差；如果访问 DOM 次数过多，会延迟整个页面的交互就绪时间等。

所以要合理使用事件。

#### 13.5.1 事件委托
对绑定事件过多问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

例如，click 事件会一直冒泡到document 层次。就是说，可以为整个页面指定一个 onclick 事件处理程序，而不必给每一个可以单击的元素分别添加事件处理程序。

```html
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>
```

不好的做法，每个都添加事件
```js
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");

EventUtil.addHandler(item1, "click", function(event){
  location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
  document.title = "I changed the document's title"; 
});
EventUtil.addHandler(item3, "click", function(event){
    alert("hi");
});
```

好的做法，将点击事件委托在父级元素 ul 上，减少事件处理程序，减少内存等
```js
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  switch(target.id){
  case "doSomething":
    document.title = "I changed the document's title";
    break;
  case "goSomewhere":
    location.href = "http://www.wrox.com";
    break;
  case "sayHi": 
    alert("hi");
    break; 
  }
});
```

#### 13.5.2 移除事件处理程序（解除事件绑定）
从上面知道，绑定事件是比较耗性能的，当不需要事件绑定时，要及时解除事件绑定，从而提升性能。

### 13.6 模拟事件

几个关键点：
```js
 document.createEvent() // 创建事件，接收一个参数
 dispatchEvent() // 触发事件

 // 过时的方式
 // Create the event.
var event = document.createEvent('Event');
// Define that the event name is 'build'.
event.initEvent('build', true, true);
// Listen for the event.
document.addEventListener('build', function (e) {
  // e.target matches document from above
}, false);
// target can be any Element or other EventTarget.
document.dispatchEvent(event);

// 如今的做法
var event = new Event('build');
// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false);
// Dispatch the event.
elem.dispatchEvent(event);
```
具体可以查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)

### 13.7 小结
本章主要讲事件，包括事件流、事件处理程序、事件对象、事件类型等。使用事件时要注意性能等。
