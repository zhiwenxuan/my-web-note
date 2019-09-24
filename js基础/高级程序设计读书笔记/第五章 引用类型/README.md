# 第五章 引用类型

### 5.1 Object 类型

访问属性时，可以使用点语法和方括号语法。平时大多使用点语法，但是方括号语法支持变量当属性以及特殊字符（比如空格）
```js
// 点语法
person.name

// 方括号语法
var prop = 'name'
person[prop]

person['first name']
```

### 5.2 Array 类型

#### 5.2.1 length 属性
通过length 可以改变数组，当减小length 时，会丢掉数组后面的值，当增加length 时，以目标值或者Undefined 来填充。
```js
var arr = ['a', 'b'];
arr.length = 1; // arr[1] = undefined

var arr = ['a', 'b'];
arr.length = 4; // arr = ['a','b', undefined, undefined]
```

#### 5.2.2 检测数组

```js
var arr = [];

// way1
Object.prototype.toString.call(arr) === '[object Array]'

// way2
arr instanceof Array

// way3 es6
Array.isArray(arr)
```

#### 5.2.3 转换方法
toString(), valueOf(), toLocalString() 他们大多时候返回的值一样，以逗号分隔数组内容形成字符串，相当于join(',')。
```js
var arr = ['a', 'b'];
arr.toString(); // "a,b"
```

#### 5.2.4 栈方法
1. push，往数组后面加入一项或多项
2. pop， 取数组后面的一项

#### 5.2.5 队列方法

```js
// shift 取得前面的第一项
var arr = [5,6,7];
var item = arr.shift(); // 5

// unshift 往数组前面加入一项或多项
var arr = [5,6,7];
arr.unshift(8,9); // arr = [8,9,5,6,7]
```

#### 5.2.6 重排序方法
1. reverse 倒置数组
2. sort 排序

默认情况下，如果sort() 没有参数传入，会把数组的每一项通过 toString() 进行转换，然后按字符串升序排序。如果是数字时，容易造成误排。
```js
var values = [0, 1, 5, 10, 15];
values.sort();
alert(values);     //0,1,10,15,5
```

一般会传入一个比较函数当做参数
```js
var arr;
arr.sort((a, b) => a - b); // 升序
arr.sort((a, b) => b - a); // 降序
```

#### 5.2.7 操作方法
1. concat 拼接数组，不影响原来的数组
```js
var arr1 = [2];
var arr2 = arr1.contact(3, [4]);
// arr1 = [2] 不变
// arr2 = [2,3,4];
```

2. slice 截取数组， 不影响原来的数组
```js
var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
alert(colors2);   //green,blue,yellow,purple
alert(colors3);   //green,blue,yellow
```

3. splice 主要用于删除元素，灵活使用时，可以用作插入元素和替换元素；影响原来的数组

语法：
```js
var deletedItem = originalItem.splice(start, [, deleteCount[, item1[, item2[, ...]]]])
```

实例：
```js
var colors = ["red", "green", "blue"];

var removed = colors.splice(0,1); 
alert(colors); // green,blue  删除第一个元素
alert(removed); // [red]

removed = colors.splice(1, 0, "yellow", "orange"); 
alert(colors); // green,yellow,orange,blue  没有删除项，插入两项
alert(removed); // [] 空数组

removed = colors.splice(1, 1, "red", "purple"); 
alert(colors); // green,red,purple,orange,blue  // 用两项替换一项
alert(removed); // [yellow]
```

#### 5.2.8 位置方法

1. indexOf(item) 查找元素的方法，从前面往后面找，找到即停止
2. lastIndexOf(item) 查找元素的方法，从后面往前面找

```js
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4));        //3
alert(numbers.lastIndexOf(4)); //5
```

#### 5.2.9 迭代方法

1. every() 对数组中的每一项运行给定函数，如果该函数对每一项都返回 true， 则返回 true。
2. some() 对数组中的每一项运行给定函数，如果该函数对某一项返回 true，则返回 true。
3. filter() 对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
4. forEach() 对数组中的每一项运行给定函数。这个方法没有返回值。
5. map() 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

#### 5.2.10 归并方法

有两个归并数组的方法，reduce() 和 reduceRight() 。这个两个方法都会迭代数组的所有项，然后构建一个最终返回的值。reduce() 方法从第一项开始，而reduceRight() 方法从最后一项开始。

都是接收 4 个参数： 前一个值、当前值、项的索引和数组对象。

```js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
    return prev + cur;
});
alert(sum); //15
```

### 5.3 Date 类型

#### 5.3.1 继承的方法

1. toString() 和 toLocalString() 都是返回时间字符串表示形式，toLocalString() 会根据浏览器设置的地区而不同。另外结果会因不同的浏览器不同。
2. valueOf() 返回数值毫秒数
```js
new Date().valueOf() // 1569309942192
+new Date() // 实际上也是调用 valueOf 方法
```

#### 5.3.2 日期格式化方法

1. toDateString()  ------- 显示星期几、月、日和年；
2. toTimeString()  ------- 显示 时、分、秒和时区；
3. toLocalDateString() --- 显示星期几、月、日和年，因地区而不同；
4. toLocalTimeString() --- 显示 时、分、秒和时区，因地区而不同；
5. toUTCString() --------- 完整的UTC日期

#### 5.3.3 日期/时间组件方法

```js
getTime() // 和valueOf 取得的值一样
setTime(毫秒) 
getFullYear()  // 取得 4 位数的年份 2019
getUTCFullYear()  // 取得 UTC日期的 4 位数年份
setFullYear(年) 
setUTCFullYear(年) 
getMonth() // 0~11
getUTCMonth() 
setMonth(月) 
setUTCMonth(月) 
getDate() // 第几天 1 ~ 31
getUTCDate() 
setDate(日) 
setUTCDate(日) 
getDay() // 星期几 0代表星期日
getUTCDay() 
getHours()  // 小时 0 ~ 23
getUTCHours() 
setHours(时) 
setUTCHours(时) 
getMinutes() // 0 ~ 59
getUTCMinutes() 
setMinutes(分) 
setUTCMinutes(分) 
getSeconds() // 0 ~ 59
getUTCSeconds() 
setSeconds(秒) 
setUTCSeconds(秒) 
getMilliseconds() 
getUTCMilliseconds() 
setMilliseconds(毫秒)
setUTCMilliseconds(毫秒)
getTimezoneOffset() // 返回本地时间与UTC 时间差的分钟数
```

### 5.4 RegExp 类型

#### 5.4.1 语法

```js
var expression = / pattern / flags;
```

1. 模式 pattern： 部分可以是任何简单或复杂的正则表达式，可以包含字符类、限定符、分组、向前查找以及反向引用。
2. 标记 flags ： 可以有一个或多个，标明正则表达式的行为。
- g: 表示全局模式，即模式将被应用于所有的字符串，而非在发现第一个匹配时立即停止
- i：表示不区分大小写
- m：表示多行模，即在到达一行文本末尾时还会继续查找下一行
- u：Unicode; 将模式视为Unicode序列点的序列
- y： 粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。
- s： dotAll模式，匹配任何字符（包括终止符 '\n'）。

#### 其他拓展
可以查看 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

### 5.5 Function 类型
函数实际上是对象，函数名是指向函数对象的指针。

#### 5.5.1 没有重载

#### 5.5.2 函数声明与函数表达式

#### 5.5.3 作为值的函数
函数本身就是个变量，函数可以做值返回

#### 5.5.4 函数内部属性
两个特殊的属性： this 和 arguments

1. this 引用的是函数据以执行的环境对象（调用函数的环境对象），如果在全局作用域中则是 window
2. arguments 保存传入函数参数的类数组

#### 5.5.5 函数属性和方法

##### 属性
1. length 表示函数希望接收的命名参数的个数
2. prototype 保存浏览器内置的实例方法的地方

##### 方法
1. apply()： 接收两个参数：第一个是在其中运行函数的作用域，另外一个是参数数组。第二个参数可以是Array 实例，也可以是 arguments 对象
2. call()： call 只是与 apply 接收参数不同，第一个参数不变，其余参数都直接传递给函数，一一列举。
3. bind()：创建一个函数的实例，其 this 值会被绑定到传给 bind() 函数的值
```js
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor();    //blue
```

### 5.6 基本包装类型

#### 5.61 Boolean
#### 5.6.2 Number
#### 5.6.3 String

### 5.7 单体内置对象

#### 5.7.1 Global 对象
一些浏览器内置的对象，挂载在 window 对象上，比如isNaN() 等等

#### 5.7.2 Math 对象

1. Math.ceil() 向上舍入
2. Math.floor() 向下舍入
3. Math.round() 四舍五入
4. Math.random() 生成 大于等于0小于1 的随机数
5. ...
