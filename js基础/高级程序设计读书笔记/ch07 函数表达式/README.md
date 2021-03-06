# 第七章 函数表达式

### 7.1 递归
递归函数是在一个函数通过名字调用自身的情况下构成的。

写递归函数有两个要点：  
1. 结束条件（什么时候结束）
2. 没有结束时，怎么实现递归公式

一个经典的例子，求阶乘：
```js
function factorial(num) {
  if(num <= 1) { // 小于等于1时结束
    return 1;
  } else {
    return num * factorial(num - 1); // 递归公式
  }
}
```

递归函数实现简单，但是效率很低，递归调用的过程当中系统为每一层的返回点、局部变量等开辟了栈来存储。递归次数过多容易造成栈溢出。所以尽量不要使用递归算法。

### 7.2 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。 创建必报的常见方式：就是在一个函数内部创建另一个函数。

#### 7.2.1 闭包与变量
可以利用闭包保存变量，避免被污染。
```js
function createFunctions () {
    var result = new Array();
    for (var i=0; i < 10; i++){
      result[i] = function(){
        return i; 
      };
    }
    return result;
}

// =>

function createFunctions () {
    var result = new Array();
    for (var i=0; i < 10; i++){
      result[i] = function(num){
        return function() {
          return num;
        };
      }(i);
    }
    return result;
}

```

#### 7.2.2 关于 this 对象
this 对象是在运行时基于函数的执行环境绑定的。 所以在闭包中使用 this 时，要注意最后调用闭包函数的执行环境是什么。

#### 7.2.3 内存泄漏
因为闭包引用别的函数作用域中的变量，导致闭包没有销毁时，引用的变量的函数作用域的对象也办法销毁，最后导致内存泄漏。所以使用闭包时，要注意手动释放内存，将闭包设为 null。

### 7.3 模仿块级作用域
因为 JavaScript 没有块级作用域，当我们需要时，可以使用代码进行模拟。

JavaScript 中除了全局作用域，只有函数可以创建作用域。所以我们可以使用匿名函数（相当于闭包）来创建作用域，这样就可以模拟块级作用域了。
```js
(function() {
  // 块级作用域
})()
// let 的实现，也是通过使用闭包来实现的。

// 块级作用域例子
function outputNumbers(count){
  (function () {
    for (var i=0; i < count; i++){
      alert(i);
    }
  })();
  alert(i); // 报错，因为匿名函数执行完后，i 就被销毁了
}
```

### 7.4 私有变量
任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括：函数的参数、局部变量和在函数内部定义的其他函数（函数也是一种变量）。



### 7.5 总结

在 JavaScript 编程中，函数表达式是一种非常有用的技术。使用函数表达式可以无须对函数命名，
从而实现动态编程。匿名函数，也称为拉姆达函数，是一种使用 JavaScript 函数的强大方式。以下总结了函数表达式的特点。

- 函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表
达式也叫做匿名函数。
- 在无法确定如何引用函数的情况下，递归函数就会变得比较复杂；
- 递归函数应该始终使用 arguments.callee 来递归地调用自身，不要使用函数名一一函数名可
能会发生变化

当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理
如下。

- 在后台执行环境中，闭包的作用域链包含着它自己的作用域、包含函数的作用域和全局作用域。
- 通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。
- 但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。

使用闭包可以在 JavaScript 中模仿块级作用域（ JavaScript 本身没有块级作用域的概念），要点如下。
- 创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。
- 结果就是函数内部的所有变量都会被立即销毁一一除非将某些变量赋值给了包含作用域（即外
部作用域）中的变量。

闭包还可以用于在对象中创建私有变量，相关概念和要点如下。

- 即使JavaScript中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。
- 有权访问私有变量的公有方法叫做特权方法。
- 可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强
的模块模式来实现单例的特权方法。

JavaScript中的函数表达式和闭包都是极其有用的特性，利用它们可以实现很多功能。不过，因为
创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。


### 备注
要理解闭包，首先要理解作用域、作用域链等。 可以参考这[一系列文章](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)，我觉得是目前写得最通俗易懂的。
