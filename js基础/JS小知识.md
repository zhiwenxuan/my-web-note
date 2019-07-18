# JS 小知识

1. 给一个 Object 定义 Key时，如果想用一个变量的值当做Key，语法如下：
```js
var value = 'age'
var obj = { value: 18 }  => { value: 18 } ❌
var obj = { [value]: 18 } => { age: 18 } ✅
```
