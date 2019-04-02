# 第二章 this、call 和 apply

### this

JavaScript 的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

#### this 指向

除了不常用的 with 和 eval ，this 的指向主要有四种：作为对象的方法调用、作为普通函数调用、构造函数调用、Function.prototype.call 或 Function.prototype.apply 调用

1. 作为对象的方法调用
   当函数作为对象的方法被调用时，this 指向该对象

```js
var obj = {
  a: 1,
  getA: function() {
    alert(this === obj); // 输出:true
    alert(this.a); // 输出: 1
  }
};
obj.getA();
```

2. 作为普通函数调用
   当函数不作为对象的属性被调用时，this 指向调用的环境，如果调用环境是全局作用域，则 this 指向的对象是 window

```js
window.name = "globalName";
var getName = function() {
  return this.name;
};
console.log(getName()); // 输出:globalName

//或者:
window.name = "globalName";
var myObject = {
  name: "sven",
  getName: function() {
    return this.name;
  }
};

var getName = myObject.getName;
console.log(getName()); // globalName
```

3. 构造函数调用
   当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的 this 指向返回的这个对象。

```js
var MyClass = function() {
  this.name = "sven";
};
var obj = new MyClass();
alert(obj.name); // 输出:sven
```

但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对
象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this:

```js
var MyClass = function() {
  this.name = "sven";
  return {
    // 显式地返回一个对象
    name: "anne"
  };
};

var obj = new MyClass();
alert(obj.name); // 输出:anne
```

如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述 问题:

```js
var MyClass = function() {
  this.name = "sven";
  return "anne"; // 返回 string 类型
};

var obj = new MyClass();
alert(obj.name); // 输出:sven
```

4. Function.prototype.call 或 Function.prototype.apply 调用

跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地 改变传入函数的 this:

```js
var obj1 = {
  name: "sven",
  getName: function() {
    return this.name;
  }
};

var obj2 = { name: "anne" };

console.log(obj1.getName()); // 输出: sven
console.log(obj1.getName.call(obj2)); // 输出:anne
```

### call 和 apply

#### call 和 apply 区别

- call 和 apply 作用基本一致，区别主要是传入参数不一致
- apply 传入的参数有两个，第一个是要指向的对象，第二个是参数集合，数组或者类数组
- call 传入的参数数量不固定，第一个同样是要指向的对象，第二个开始是依次传入函数的参数
- 当第一个参数为 null 时，this 指向 window

#### call 和 apply 的作用

1. 改变 this 指向

call 和 apply 最常见的用途是改变函数内部的 this 指向

2. 实现 `Function.prototype.bind`

call 和 apply 改变了函数的 this 上下文后便执行该函数,而 bind 则是返回改变了上下文后的一个函数。

```js
Function.prototype.mbind = function() {
  var thatFuc = this; //保存原函数
  var context = arguments[0]; // 保存要指向的对象
  var args = [].slice.call(arguments, 1); // 保存bind时传入的参数
  if (typeof thatFuc !== "function") {
    return console.error("bind must be called by function");
  }
  return function() {
    //返回的函数可能传入新的参数，把它们跟在bind时传入的参数合并。
    var newArgs = [].concat.call(args, [].slice.call(arguments, 0));
    return thatFuc.apply(context, newArgs);
  };
};

//例子
var name = 888;
var obj = {
  name: 666
};

var func = function(a, b, c, d) {
  console.log(this.name);
  console.log([a, b, c, d]);
}.mbind(obj, 1, 2);

func(3, 4);
//打印666 和 [1,2,3,4]
```

3. 借用其他对象的方法

借用方法的第一种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果:

```js
var A = function(name) {
  this.name = name;
};

var B = function(name) {
  A.apply(this, name);
};
B.prototype.getName = function() {
  return this.name;
};

var b = new B("zhiwenxuan");
console.log(b.getName()); //zhiwenxuan
```
