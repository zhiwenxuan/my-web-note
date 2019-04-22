# 每日一道题

### 2019.04.02

```js
var obj = {
  "2": 3,
  "3": 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push
};

obj.push(1);
// =>
obj = {
  2: 1,
  3: 4,
  length: 3,
  splice: Array.prototype.splice,
  push: Array.prototype.push
};

obj.push(2);
// =>
obj = {
  2: 1,
  3: 2,
  length: 4,
  splice: Array.prototype.splice,
  push: Array.prototype.push
};

// 原理：obj调push函数时，找obj的length属性，给obj[length]赋值，之后obj.length++
```

# 2019.04.09

实现 (5).add(3).minus(2);

```js
//给 Number 添加原型
Number.prototype.add = function(i = 0) {
  return this.valueOf() + i;
};
Number.prototype.minus = function(i = 0) {
  return this.valueOf() - i;
};
//5 + 3 - 2
(5).add(3).minus(2);
```
