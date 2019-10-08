# 第六章 面向对象的程序设计

### 6.1 理解对象

#### 6.1.1 属性类型
两种属性类型： 数据属性和访问器属性

1. 数据属性
数据属性包含一个数值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性，在 JavaScript 中不能直接访问它们。4 个特性如下：

- `[[Configurable]]`: 表示能否删改。字面量方式定义默认为 true，如果通过Object.defineProperty 来定义，如果缺定义，值为 false。
- `[[Enumerable]]`: 表示能否通过 for-in 循环返回属性。 默认为 true，如果通过Object.defineProperty 来定义，如果缺定义，值为 false。
- `[[Writable]]`: 表示能否修改属性的值。默认为 true，如果通过Object.defineProperty 来定义，如果缺定义，值为 false。
- `[[Value]]`: 包含这个属性的数据值，从这个位置读取属性值。默认为 undefined。

```js
var person = {
  name: 'Andy'
}
这里创建了一个名为 name 的属性，[[Value]] 特性的值是 'Andy'，其他三个都为true。
```

要修改属性默认的特性，必须使用 Object.defineProperty() 。这个方法接收三个参数： 属性所在的对象、属性的名字和一个描述符对象（属性只能是： configurable、enumerable、writable 和 value）。如下：
```js
var person = {};
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'Andy'
})

console.log(person.name) // Andy
person.name = 'Greg';
console.log(person.name) // Andy, 非严格模式操作忽略，严格模式，复制操作将会导致抛出错误。
```

2. 访问器属性
访问器属性不包含数据值，它们包含一对 getter 和 setter 函数（两个函数都不是必须的）。getter 函数负责返回值；setter 函数负责写入值。

访问器属性有如下 4 个 特性：
- `[[Configurable]]`: 能否删改，字面量定义默认为 true。
- `[[Enmuerable]]`: 表示能否通过 for-in 循环返回属性，字面量定义默认为 true。
- `[[Get]]`: 在读取属性时调用的函数。默认为 undefined。
- `[[Set]]`: 在写入属性时调用的函数。默认为 undefined。

访问属性不能直接定义，必须使用 Object.defineProperty() 。
```js
var book = {
  _year: 2004,
  edition: 1 
};
Object.defineProperty(book, "year", {
    get: function(){
      return this._year;
    },
    set: function(newValue){
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
    } }
});
book.year = 2005; 
alert(book.edition); //2
```
如果没有指定 setter ，意味只读不可写。

#### 6.1.2 定义多个属性
使用 Object.defineProperties() 可以一次定义多个属性。

```js
var book = {};
Object.defineProperties(book, {
  __year: {
    value: 2019
  },
  edition: {
    witable: true,
    value: 1
  },
  year: {
    get: function() {
      return this.__year;
    }
  }
})
```

#### 读取属性的特性

通过 Object.getOwnPropertyDescriptor() 方法可以读取属性的描述符。这个方法接收两个参数：属性所在的对象和属性名；返回一个对象。
```js
var book = {};
Object.defineProperties(book, {
  __year: {
    value: 2019
  },
  edition: {
    witable: true,
    value: 1
  },
  year: {
    get: function() {
      return this.__year;
    }
  }
})
Object.getOwnPropertyDescriptor(book, '__year') // {value: 2019, configurable: false, wirtable: false, enumerable: false}
```

### 6.2 创建对象

#### 6.2.1 工厂模式
优点：抽象了创建具体对象的过程解决创建多个相似对象的问题；  
缺点： 没有解决对象识别的问题 （不知道对象的类型）

```js
function createPerson(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    alert(this.name);
  };
  return o; 
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```

#### 6.2.2 构造函数模式
除了原生的构造函数，如：Object、Array 等，也可以自定义构造函数。使用自定义构造函数重写上面工厂模式的例子，如下：

```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    alert(this.name);
  }; 
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
与 createPerson 函数的不同点：  
1. 没有显性的创建对象
2. 直接将属性和方法赋值给 this
3. 没有 return 语句

一个小的注意点，按照规范，**构造函数首字母大写**，用于区分其他函数，因为构造函数主要用来创建对象的。

使用构造函数创建实例时，要使用 new 关键字。创建实例会经历以下过程：  
1. 创建一个新的对象
2. 将构造函数的作用域赋给新对象 （因此 this 就指向了这个新对象）
3. 执行构造函数中的代码 （为这个新对象添加属性和方法）
4. 返回新对象

在前面的例子，person1 和 person2 分别保存这 Person 的一个不同的实例。 这两个对象都有一个 constructor （构造函数）属性，该属性指向 Person。  
```js
alert(person1.constructor === Person); //true
alert(person2.constructor === Person); //true
```

对象的 constructor 属性最初是用来标识对象类型的。但是检测对象类型， instanceof 更可靠全面。  

**构造函数模式优缺点**  

**优点**：识别实例类型，解决工厂模式的缺点。  
**缺点**： 每个方法都要在每个实例重新创建一遍，每个实例上的同一个方法不是同一个对象，浪费内存。


#### 6.2.3 原型模式

所有的实例都可以共享构造函数原型 prototype 上的属性，因此将所有的信息挂载在原型 prototype 上。

```js
function Person() {};

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
  alert(this.name)
}

var person1 = new Person();
person1.sayName(); // Nicholas
var person2 = new Person();
person2.sayName(); // Nicholas

// 一个注意点，如果以如下方式定义原型，将会重写了 prototype, 要注意一些属性的丢失
function Person() {};

Person.prototype = {
  constructor: Person, // 需要补上指向
  name: "",
  age: 29,
  job: "Software Engineer",
  sayName: function() { console.log(this.name) }
}
```

**优点**： 对于函数方面的比较友好，因为所有的实例都想共享函数的实现。

**缺点：** 所有实例在默认情况下都将取得相同的属性值。另外一个比较严重的缺点，因为原型的属性是被所有实例共享的，如果属性是引用类型，当一个实例修改引用类型属性的值时，也会导致其他实例的该属性的值发生改变（耦合太紧密），所以一般很少单独使用原型模式。例子如下：  
```js
function Person () {};
Person.friends = ['Andy', 'Tom'];

var person1 = new Person();
var person2 = new Person();

person1.friends.push('Jonh');
console.log(person2.friends) // ['Andy', 'Tom', 'Jonh'] 导致 person2 的 friends 属性也发生改变。
```

##### 一些拓展
1. 访问实例的属性时，首先从实例上找，如果没有，从实例的构造函数的原型 prototype 上找（如果没有，继续往构造函数的构造函数的原型上找，层层递进）
2. 构造函数的 原型prototype 的 constructor 属性 指向构造函数本身，如：`Person.prototype.constructor === Person // true`
3. hasOwnProperty 检测属性是在实例上还是原型上，如果是在实例上返回 true
4. hasPrototypeProperty 检测属性是在原型上还是实例上，如果是在原型上返回 true
5. isPrototypeOf() 方法可以判断一个实例是否从构造函数创建的，如： `Person.prototype.isPrototypeOf(person1) // true`
6. getPrototypeOf() 方法可以获取一个实例的构造函数的原型，如： `Object.getPrototypeOf(person1) === Person.prototype // true`
7. in 操作符单独使用时，无论属性是在实例上还是实例的构造函数的原型上，都会返回 true，如： `"name" in person1 // true`
8. for-in 循环时，返回实例对象可以访问的且是可枚举的所有属性


#### 6.2.4 组合使用构造函数模式和原型模式
组合使用构造函数模式和原型模式是最常见的创建自定义类型的方式。 结合以上谈的优缺点，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。这样每个实例都可以有一份实例属性的副本，又可以共享方法的引用，最大限度地节省内存。重写以上的例子：

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}
Person.prototype.sayName = function() {
  console.log(this.name);
}

var person1 = new Person('Andy', 19, 'Software Engineer');
var person2 = new Person('Tom', 21, 'Doctor');

person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Count,Van"
alert(person2.friends);    //"Shelby,Count"
alert(person1.friends === person2.friends); // false
alert(person1.sayName === person2.sayName); // true 
```

### 6.3 继承

#### 6.3.1 原型链
主要依靠原型链。将子类的构造函数的原型 prototype 指向父类的实例。这样子类构造函数的原型就可以继承父类的所有属性和方法，而子类的实例又可以访问子类的原型，进而获得父类的所有属性和方法。

```js
function SuperType() {
  this.superProperty = true;
}
SuperType.prototype.getSuperPropertyValue = function() {
  return this.superProperty;
}

function SubType() {
  this.subProperty = false;
}
// 继承了 SuperType
SubType.prototype = new SuperType(); // 将原型指向超（父）类的实例
SubType.prototype.getSubPropertyValue = function() {
  return this.subProperty;
}

var instance = new SubType();
console.log(instance.getSuperPropertyValue()) // true
```

##### 缺点
1. 如果父类有引用类型的属性，继承过来时，当子类的一个实例修改值时，会影响其他实例。（前面通过原型模式创建对象同样存在这个缺点）如下：  
```js
function SuperType() {
  this.colors = ['red'];
}

function SubType() {
}
SubType.prototype = new SuperType();

var instance1 = new SubType();
var instance2 = new SubType();
instance1.colors.push('blue');
console.log(instance1.colors) // ['red', 'blue']
console.log(instance2.colors) // ['red', 'blue'], 影响了 instance2
```

2. 不能在创建子类实例时为父类的构造函数传入参数（不同实子类例继承的属性都是一样的）。结合缺点1，很少单独使用原型链模式继承。

#### 6.3.2 借用构造函数
实现方式： 在子类构造函数中调用父类的构造函数
```js
function SuperType() {
  this.colors = ['red'];
}

function SubType() {
  // 继承了 SuperType
  SuperType.call(this); // 这样子类创建的实例都有父类属性的一个副本，解决了原型链继承的缺点1
}

var instance1 = new SubType();
var instance2 = new SubType();
instance1.colors.push('blue');
console.log(instance1.colors) // ['red', 'blue']
console.log(instance2.colors) // ['red']
```

另外一个好处，可以向**父类构造函数传参**  
```js
function SuperType(name) {
  this.name = name;
  this.colors = ['red'];
}

function SubType(name) {
  // 传入参数
  SuperType.call(this, name); 
}

var instance1 = new SubType('Andy');
var instance2 = new SubType('Tom');
console.log(instance1.name) // Andy
console.log(instance2.name) // Tom
```

**缺点：** 同样存在构造函数模式创建对象的问题---方法只能在父类构造函数中创建，每次创建实例都要重新创建一次，浪费内存。因此也很少单独使用构造函数继承。

#### 6.3.3 组合继承
充分利用原型链和借助构造函数继承的优势。利用原型链实现原型属性和方法的继承；利用构造函数实现实例属性的继承。

```js
function SuperType(name) {
  this.name = name;
  this.colors = ['red']
}

SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('Andy', 21);
var instance2 = new SubType('Tom'. 22);
instance1.sayName(); // Andy
instance2.sayName(); // Tom
```

组合继承是 JavaScript 最常用的继承模式。不过也存在不足之处，在下面寄生组合式继承中来提。

#### 6.3.4 原型式继承
基于已有的对象并借助原型创建新的对象。实现函数如下：
```js
function object(o) {
  function F() {}; // 首先创建一个临时的构造函数
  F.prototype = o; // 将传入的对象当做临时构造函数的原型
  return new F(); // 返回临时类型的一个新实例
}
```
本质上讲，object() 对传入其中的对象执行了一次浅复制

例子：
```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie" 引用类型的属性都会改变
```

ES6 新增 Object.create() 方法规范化原型式继承。如下：
```js
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person); // 和 object() 行为相同
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```

**使用场景**: 只想让一个对象跟另外一个对象保持类似

**注意点**: 引用类型的属性会在不同实例共享一样的值，和原型模式一样。

#### 6.3.5 寄生式继承
寄生式继承是与原型式继承紧密相关的一种思路，类似寄生构造函数和工厂陌生，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。

实现函数：
```js
function createAnother(original) {
  var clone = Object.create(original); // 创建一个新的对象
  clone.sayHi = function() { // 以某种方式增强这个对象
    console.log('hi')
  }
  return clone; // 返回这个对象
}

// 例子
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

#### 6.3.6 寄生组合式继承

前面讲的组合继承是最常用的继承模式，不过也存在不足之处。组合继承最大的问题是调用两次父类的构造函数：一次是在创建子类的原型时，另一次是子类的构造函数中。这样的话，子类会重复包含父类的全部实例属性。如下：
```js
 function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  SuperType.call(this, name); // 第二次调用SuperType()
  this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance = new SubType('Andy', 20);
```
有两组 name 和 colors 属性：一组在实例 instance 上，一组在 SubType 原型中，浪费内存。

下面用**寄生组合式继承**来优化。

寄生组合式继承是通过借助构造函数来继承属性（第二次调用没变），通过寄生式继承来继承父类的原型，然后再将结果指向子类的原型（取消第一次调用）。  
基本模式如下：
```js
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 继承父类原型
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 指定给子类的原型
}
```

使用例子：
```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  SuperType.call(this, name); // 此处不变
  this.age = age;
}
inheritPrototype(SubType, SuperType); // 替换调用父类的构造函数
SubType.prototype.sayAge = function() {
  console.log(this.age)
}
```

**这样就可以减少父类实例属性赋值给子类的原型了, 避免 SubType.prototype 上面创建多余的属性。**

因此综合来看。寄生组合式继承是引用类型最理想的继承范式。

### 6.4 总结
本章知识主要有：理解对象、原型、原型链、对象创建、继承等。