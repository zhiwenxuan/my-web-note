# 记录关于Symbol一些小知识

## 要点
1. ES6新增的原始数据类型，js的第七种数据类型
2. 能生成独一无二的值，主要用于解决对象属性名的命名冲突

## 语法
```js
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false 

let s3 = Symbol('s3');
let s4 = Symbol('s4');

s3 === s4 // false 
```
Symbol()每次生成的值都是不一样的，所以就算传入的参数一样，最后的值也是不相等。  
不能使用new 关键字在Symbol函数前，因为Symbol生成的值是原始数据类型，而new 新建的是对象

## 实际使用的场景

### 消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中，字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

常用的消除魔术字符串的方法，就是把它写成一个变量。

```js
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。

如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```js
const shapeType = {
  triangle: Symbol()
};
```

//未完（待补充）
