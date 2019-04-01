# 第 1 章 面向对象的 JavaScript

### 1.1 动态类型语言和鸭子类型

- 动态类型语言
  相对于动态类型语言的是静态类型语言。静态类型语言在编译时便已确定变量的类型，而动态类型语言的变量类型要到程序运行的时候，待变量赋值后，才会具有某种类型。

- 静态动态类型语言的优缺点
  静态类型语言优点在于编译时就能发现类型不匹配的错误，缺点在于迫使程序员遵循规则编码。动态类型语言刚好相反，优点在于编码灵活，代码简洁，缺点在于运行时才能发现类型不匹配的错误。

- 鸭子类型
  定义：如果它走起来像鸭子，叫起来也是鸭子，那么它就是鸭子。

  优点： 利用鸭子类型思想，能轻松在动态类型语言中实现一个原则：“面向接口编程，而不是面向实现编程”。

### 1.2 多态

- 含义:

  同一操作作用在不同的对象，可以产生不同的解释和不同的执行结果。

```js
var makeSound = function() {
    if(animal instanceof Duck) {
        console.log("嘎嘎嘎")；
    }else if(animal instanceof Chicken) {
        console.log("咯咯咯")；
    }
};

var Duck = function(){};
var Chicken = function() {};

makeSound( new  Duck() ); //嘎嘎嘎
makeSound( new Chicken() ); //咯咯咯

```

- 思想:

  将 “做什么” 和 “谁去做以及怎样去做” 分离开来，也就是将 “不变的事物” 与 “可能改变的事物” 分离开来

```js
// “让动物叫是不变的”，分离开来
var makeSound = function(animal) {
  animal.sound();
};

// 动物的类型和叫法是可变的，需要封装
var Duck = function() {};
Duck.prototype.sound = function() {
  console.log("嘎嘎嘎");
};

var Chicken = function() {};
Chicken.prototype.sound = function() {
  console.log("咯咯咯");
};

//给鸭和鸡发出“叫唤”的消息时，它们做出不同的反应
makeSound(new Duck());
makeSound(new Chicken());

//增加新的动物-狗
var Dog = function() {};
Dog.prototype.sound = function() {
  console.log("汪汪汪");
};
//不用修改 makeSound 方法就可以很好新增新的对象
makeSound(new Dog());
```

- 通过继承实现多态
  鸡鸭都属于动物，所以鸡鸭可以继承动物这一对象，并重写动物叫 (sound) 的方法，就可以实现多态

- JavaScript 的多态
  因为 JavaScript 对象可以在运行时改变类型，所以 JavaScript 的多态是与生俱来的

### 1.3 封装

封装的目的是将信息隐藏，包括：封装数据、封装实现、封装类型、封装变化

- 封装数据:

  给数据提供不同的访问权限，如：private，protected，public 等等

- 封装实现:

  隐藏实现细节、设计细节以及隐藏对象的类型等等

- 封装类型:

  封装类型是静态类型语言中一种重要的封装方式。对于 JavaScript 来说，没有能力做到

- 封装变化:

  封装变化是封装更重要层面的体现，通过封装变化，把系统中稳定不变的部分和容易变化的部分隔离开来。在系统演变过程中，只需替换那些容易变化的部分。

### 1.4 原型模式和基于原型继承的 JavaScript 对象系统

- 在 JavaScript 语言中不存在类的概念，对象也并非从类中创建出来，所有的 JavaScript 对象都是从某个对象上克隆而来的。

- 原型编程范型的基本原则：

  - 所有的数据都是对象
  - 要得到一个对象，不是通过实例化类，而是找一个对象作为原型并克隆它
  - 对象会记住它的原型
  - 如果对象无法响应某个请求，他会把这个请求委托给自己的原型

- 基于原型链的委托机制是原型继承的本质
