## 第二十二章 高级技巧

### 22.1 高级函数

#### 22.1.1 安全的类型检测
使用 `Object.prototype.toString.call(value)`

```js
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}
```

#### 22.1.2 作用域安全的构造函数
锁定构造函数的作用域，防止没有使用 new 关键字而导致 this 对象指向不明。
```js
function Person(name, age, job){
  if (this instanceof Person){
      this.name = name;
      this.age = age;
      this.job = job;
  } else {
      return new Person(name, age, job);
  }
}
```

#### 22.1.3 惰性载入函数

先看一个例子，每次调用时，都要进行能力检查
```js
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
    if (typeof arguments.callee.activeXString != "string") {
      var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
        "MSXML2.XMLHttp"],
        i, len;
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex) {
          // 跳过
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR object available.");
  }
}
```

有两种优化方式，第一种是初次调用时进行能力检查，第二种是加载时进行能力检查。如下：

```js
// 第一种，第一次调用时进行能力检查，并覆盖 createXHR 方法
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    createXHR = function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i, len;
        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //skip 
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    createXHR = function () {
      throw new Error("No XHR object available.");
    };
  }
  return createXHR();
}

// 第二种，加载时进行能力检查
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    return function () {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    return function () {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
          i, len;
        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //skip 
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    return function () {
      throw new Error("No XHR object available.");
    };
  }
})();
```

#### 22.1.4 函数绑定

一个简单的实现：
```js
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments);
  }
} 

// 例子
var handler = {
  message: "Event handled",
  handleClick: function(){
    alert(this.message);
  }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));
```

#### 22.1.5 函数柯里化
用于创建已经设置好了一个或多个参数的函数。函数柯里化的基本方法和函数绑定一样：使用一个闭包返回一个函数。

```js
// 通用的创建函数
function curry(fn) {
  // 获取除了执行函数之外的参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    // 获取创建好的函数的传入参数
    var innerArgs = Array.prototype.slice.call(arguments);
    // 拼接参数
    var finalArgs = args.concat(innerArgs);
    // 返回执行结果
    return fn.apply(null, finalArgs);
  }
}

// 例子
function add(num1, num2) {
  return num1 + num2;
}
var curriedAdd1 = curry(add, 1);
curriedAdd1(2); // 3

var curriedAdd2 = curry(add, 1, 2);
curriedAdd2(); // 3
```

利用函数柯里化的思想，创建更加复杂的 bind 函数：
```js
function bind(fn, context) {
  // 绑定的时候可以传入参数
  var args = Array.prototype.slice.call(arguments, 2);
  return function() {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    return fn.apply(context, finalArgs);
  }
}

// 例子
var handler = {
  message: "Event handled",
  handleClick: function(name, event){
    alert(this.message + ":"+ name + ":"+ event.type);
  }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler, "my-btn"));
```

**注：**函数柯里化和函数绑定可以用于复杂的算法和功能，但是两者不应该滥用，因为都用到闭包，有额外的开销。


### 22.2 防篡改对象

#### 22.2.1 不可扩展对象

默认情况下，所有对象都是可以扩展的。我们可以先定义对象，再给它添加属性。使用 `Object.preventExtensions()` 方法可以阻止对象扩展。

```js
var persion = {
  name: 'Tom'
}
Object.preventExtensions(persion);

person.age = 18;
console.log(person.age) // undefined 严格模式会报错。不过已有的属性还可以修改和删除
```

使用 `Object.isExtensible()` 可以判断对象是否可以扩展。
```js
var persion = {
  name: 'Tom'
}
console.log(Object.isExtensible(persion)) // true

Object.preventExtensions(persion);
console.log(Object.isExtensible(persion)) // false
```

#### 22.2.2 密封对象
ES5 为对象定义的第二个保护级别是密封对象。密封对象不可扩展，而且已有成员的`[[Configurable]]`特性被设置为false，意味着不能删除属性和方法等。

要密封对象，使用 `Object.seal()` 的方法

```js
var person = { name: "Nicholas" };
Object.seal(person);

person.age = 29; 
alert(person.age); //undefined

delete person.name; 
alert(person.name); //"Nicholas"
```

使用 `Object.isSealed()` 方法可以确定对象是否被密封。

#### 22.2.3 冻结对象
最严格的防篡改级别是冻结对象。冻结对象既不可扩展，又是密封的，而且对象数据属性的`[[Writable]]`特性会被设置为false。

```js
var person = { name: "Nicholas" };
Object.freeze(person);

person.age = 29; 
alert(person.age); //undefined

delete person.name; 
alert(person.name); //"Nicholas"

person.name = "Greg"; 
alert(person.name); //"Nicholas"
```

可以使用 `Object.isFrozen()` 方法检测对象是否冻结。

**对于 JavaScript 库的作者而言，冻结对象是很有用的。因为 JavaScript 库最怕有人意外修改库中的核心对象。**


### 22.3 高级定时器

#### 22.3.1 重复的定时器
当使用 `setInterval()` 时，仅当没有改定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

这种重复定时器的规则有两个问题：1）某些建个会被跳过：2）多个定时器的代码执行之间的间隔可能会比预期的小。

为了避免`setInterval()` 的两个缺点，可以使用 `setTimeout()` 链式调用
```js
setTimeout(function() {
  // do something

  setTimeout(arguments.callee, interval);
}, interval);

// 例子
setTimeout(function(){
  var div = document.getElementById("myDiv");
  left = parseInt(div.style.left) + 5;
  div.style.left = left + "px";

  if (left < 200){
    setTimeout(arguments.callee, 50);
  } 

 }, 50);
```

#### 22.3.2 Yielding Processes
运行在浏览器中的 JavaScript 都被分配一个确定数量的资源，被严格限制，防止恶意的 Web 程序员把用户的计算机高挂。
其中一个是限制长时间运行脚本。如果代码达到限制，会弹出一个浏览器错误的对话框，告诉用户是否要继续执行。为了避免这种不好的用户体验，我们需要处理脚本长时间运行的问题。

脚本长时间运行的问题通常是两个原因之一造成的：过长的、过深的嵌套的函数调用或者是进行大量的处理的循环。

下面对大量循环的情况（处理不需要同步，数据不需要按顺序完成）进行处理。使用数据分块（array chunking）的技术，小块小块地处理数组。

```js
function chunk(array, process, context){
  setTimeout(function(){
    // 每次处理一块
    var item = array.shift();
    process.call(context, item);

    if (array.length > 0){
      // 继续处理
      setTimeout(arguments.callee, 100);
    }
  }, 100);
}

// 例子
var data = [12,123,1234,453,436,23,23,5,4123,45,346,5634,2234,345,342];
function printValue(item){
  var div = document.getElementById("myDiv");
  div.innerHTML += item + "<br>";
}
chunk(data.concat(), printValue); // 使用data.concat() 获取数据副本，避免污染
```

#### 22.3.3 函数节流
