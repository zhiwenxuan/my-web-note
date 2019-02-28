## arguments的一些小知识
arguments是传递给函数参数的类数组对象，也就是它的key值是0，1，2... ，它也是所有函数（除了箭头函数）可以用到的局部变量。

## 拓展
将 arguments 转成数组

```js
let args = Array.from(arguments)
let args = [...arguments]
```

## 实例

### 求和

```js
function add() {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
add()
add(1, 2)
add(1, 2, 3)
```

### 剩余参数，默认参数，解构赋值参数

arguments 对象可以与[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)和[解构赋值参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)结合使用


- 严格模式下，arguments 对象的值**不会跟踪**传入函数参数的值

```js
    'use strict'
    function fun(a) {
        a = 99; //更新了a， 不会更新arguments[0] 
        console.log(arguments[0])
    }
    fun(10) //会打印10


    'use strict'
    function fun(a) {
        arguments[0] = 99; //更新了arguments[0]， 不会更新a 
        console.log(a)
    }
    fun(10) //会打印10
```

- 非严格模式下且函数**没有包含**剩余参数、默认参数和解构赋值，arguments 对象的值**会跟踪**传入函数参数的值，如下：

```js
    'use strict'
    function fun(a) {
        arguments[0] = 99; //更新了arguments[0] 同样更新了a
        console.log(a)
    }
    fun(10) //会打印99，传入的值已经被改变

    function fun1(a) {
        a = 99; // 更新了a 同样更新了arguments[0] 
        console.log(arguments[0]) 
    }
    fun1(10) //会打印99，传入的值已经被改变
```

- 非严格模式下且函数**包含**剩余参数、默认参数和解构赋值，arguments 对象的值**不会跟踪**传入函数参数的值，arguments反映了调用时提供的参数。如下：

```js
    function func(a = 55) { 
      arguments[0] = 99; // updating arguments[0] does not also update a
      console.log(a);
    }
    func(10); // 10

    function func(a = 55) { 
      a = 99; // updating a does not also update arguments[0]
      console.log(arguments[0]);
    }
    func(10); // 10

    function func(a = 55) { 
      console.log(arguments[0]);
    }
    func(); // undefined

```
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)
