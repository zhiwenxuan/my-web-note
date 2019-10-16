# 第十四章 表单脚本

### 14.1 表单的基础知识
在 JavaScript 中，表单对应的是 HTMLFormElement 类型，具有以下属性：

```js
acceptCharset // 服务器能够处理的字符集
action // 接收请求的 URL
elements // 表单中的所有控件集合
enctype // 请求的编码类型
length // 表单中的控件的数量
method // 要发送的 HTTP 请求类型
name // 表单的名称
reset() // 重置表单为默认值
submit() // 提交表单
target // 用于发送请求和接收响应的窗口名称
```

#### 表单字段共有的属性、方法和事件
```js
// 共有属性
disabled // 是否禁用
form // 指向当前字段的所属表单的指针，只读
name // 当前字段的名称
readOnly // 布尔值，表示当前字段是否只读
tabIndex // 表示当前字段的切换序号
type // 当前字段的类型，如下 checkbox，radio
value // 当前字段提交给服务器的值

// 共有方法
focus()
blur()

//共有事件
blur
change
focus
```

### 14.2 文本框脚本
`<input>` 和 `<textarea>`

#### 14.2.1 选择文本

`select()` 方法：用于选择文本框中的所有文本。
```js
var textbox = document.forms[0].elements["textbox1"];
// 当文本框获得焦点时，帮用户自动选择其所有文本
EventUtil.addHandler(textbox, "focus", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    target.select();
});
```

**选择(select) 事件**：在IE9+、Opera、Firefox、Chrome 和Safari中，只有用户选择了文本，而且要释放鼠标，才会触发 select 事件。 IE8及之前版本中，只要用户选择了一个字母就会触发 select 事件。


**获得选择的文本**：
```js
function getSelectedText(textbox){
  return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
}
```

#### 14.2.2 过滤输入

##### 1）屏蔽字符
有时需要用户输入的文本中包含或不包含某些字符。例如，电话号码中不能包含非数值字符。实现如下：
```js
EventUtil.addHandler(textbox, "keypress", function(event){  
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var charCode = EventUtil.getCharCode(event);
  // 1. 非数值 2. 不屏蔽字符编码小于10的键（向上、向下、退格、删除键） 3. 不屏蔽复制粘贴 （Ctr + C 和 Ctr + V） 操作
  if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
    // 屏蔽按键事件，从而忽略输入的非数值
    EventUtil.preventDefault(event);
  }
});
```

##### 2）操作剪贴板

6个剪贴板事件：
```js
beforecopy //复制之前
copy // 复制时
beforecut //
cut 
beforepaste
paste
```
在实际的事件发生之前，通过 beforecopy、beforecut 和 beforepaste 事件可以向剪贴板发送数据，或者从剪贴板取得数据之前修改数据。
不过，取消这些事件并不会取消对剪贴板的操作，只有取消 copy、cut 和 paste 事件，才能阻止相应的操作。

访问剪贴板中的数据，可以使用 clipboardData 对象，在 IE 中，这个对象挂载在 window 上，其他浏览器在 event 对象上。
clipboardData 对象有 getData() 、setData()、clearData() 三个方法。

```js
var EventUtil = { 
  // 省略的代码
  getClipboardText: function(event){
    var clipboardData = (event.clipboardData || window.clipboardData); 
    return clipboardData.getData("text");
  },
  setClipboardText: function(event, value){
    if (event.clipboardData){
      return event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData){
      return window.clipboardData.setData("text", value);
    } 
  },
  // 省略的代码 
};
```

另外的实例，判断粘贴的内容格式是否符合，不符合可以阻止，如下：
```js
EventUtil.addHandler(textbox, "paste", function(event){
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);
    // 非数值，不能粘贴
    if (!/^\d*$/.test(text)){
        EventUtil.preventDefault(event);
    }
});
```

#### 14.2.3 自动切换焦点
用户填写完当前字段时，自动将焦点切换到下一个字段。

实际中例子，比如美国的电话号码分为三部分：区号、局号和另外4位数字。如下：
```html
<input type="text" name="tel1" id="txtTel1" maxlength="3">
<input type="text" name="tel2" id="txtTel2" maxlength="3">
<input type="text" name="tel3" id="txtTel3" maxlength="4">
```

```js
(function(){
  function tabForward(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    // 这里转换焦点的条件是判断输入字符长度，其他场景要具体分析
    if (target.value.length == target.maxLength){
      var form = target.form;
      for (var i=0, len=form.elements.length; i < len; i++) {
        if (form.elements[i] == target) {
          if (form.elements[i+1]){
            form.elements[i+1].focus();
          }
          return;
        }
      } 
    }
  }
  var textbox1 = document.getElementById("txtTel1");
  var textbox2 = document.getElementById("txtTel2");
  var textbox3 = document.getElementById("txtTel3");
  EventUtil.addHandler(textbox1, "keyup", tabForward);
  EventUtil.addHandler(textbox2, "keyup", tabForward);
  EventUtil.addHandler(textbox3, "keyup", tabForward);
})();
```

#### 14.2.4 HTML5 约束验证API

##### 1） 必填字段
```html
<input type="text" name="username" required>
```

##### 2) 其他输入类型
```html
<input type="email" name ="email">
<input type="url" name="homepage">
...
```

##### 3) 数值范围
```html
<input type="number" min="0" max="100" step="5" name="count">
```

##### 4) 输入模式
通过 pattern 属性添加正则表达式

```html
<input type="text" pattern="\d+" name="count">
```

##### 5）检测有效性

使用 `checkValidity()` 方法可以检测表单中的某个字段是否有效
```js
if (document.forms[0].elements[0].checkValidity()){ 
  // 字段有效
} else { 
  // 字段无效
}

// 检测整个表单是否所有字段都有效，表单自身调用 checkValidity() 方法
if (document.forms[0].checkValidity()){ 
  // 表单有效
} else { 
  // 表单无效
}
```

checkValidity() 用来判断是否有效，通过 validity 属性可以知道字段无效的原因。 validity 对象包含以下属性：
```js
customError	// Boolean	该元素的自定义有效性消息已经通过调用元素的setCustomValidity() 方法设置成为一个非空字符串.
patternMismatch	// Boolean	该元素的值与指定的pattern属性不匹配.
rangeOverflow	// Boolean	该元素的值大于指定的 max属性.
rangeUnderflow	// Boolean	该元素的值小于指定的 min属性.
stepMismatch	// Boolean	该元素的值不符合由step属性指定的规则.
tooLong	// Boolean	该元素的值的长度超过了HTMLInputElement 或者 HTMLTextAreaElement 对象指定的maxlength属性中的值. 注意:在Gecko中,该属性永远不会为true,因为浏览器会阻止元素的值的长度超过maxlength.
typeMismatch	// Boolean	该元素的值不符合元素类型所要求的格式(当type 是 email 或者 url时).
valid	// Boolean	其他的约束验证条件都不为true.
valueMissing	// Boolean	该元素有 required 属性,但却没有值.

// 例子
 if (input.validity && !input.validity.valid){
    if (input.validity.valueMissing){
        alert("Please specify a value.")
    } else if (input.validity.typeMismatch){
        alert("Please enter an email address.");
    } else {
        alert("Value is invalid.");
    }
}
```

##### 6）禁用验证

novalidate 属性：
```html
<form method="post" action="signup.php" novalidate></form>
```

formnovalidate 属性，指定某个按钮：
```html
<form method="post" action="foo.php">
  <input type="submit" value="Regular Submit">
  <input type="submit" formnovalidate name="btnNoValidate" value="Non-validating Submit">
</form>
```

通过 js ：
```js
document.forms[0].elements["btnNoValidate"].formNoValidate = true;
```

### 14.3 选择框脚本
主要是 `<select>` 和 `<option>` 元素，对应的类型是 HTMLSelectElement 和 HTMLOptionElement。

### 14.4 富文本编辑

其中一个关键属性 contenteditable，设置后可以直接在页面进行内容的编辑
```html
<blockquote contenteditable="true">
    <p>Edit this content to add your own quote</p>
</blockquote>

<cite contenteditable="true">-- Write your own name here</cite>
```

其他的关键点： document.execCommand() 等
