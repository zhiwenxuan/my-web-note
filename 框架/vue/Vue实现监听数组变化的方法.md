# Vue实现监听数组变化的方法

## 能改变数组本身的实例方法

```js
push // 在数组尾部添加元素
pop //获取数组尾部最后一个元素
shift // 获取数组头部第一个元素
unshift //在数组头部添加元素
sort //排序
reverse //倒置
splice //可删除替换元素
```

## 实现方法

因为只有对象提供劫持的方法，所以将数组的原型拷贝出来，并创建一个对象。最后对可以改变数组本身的**7**个实例方法进行劫持。

源码如下：

```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

//拷贝数组原型
const arrayProto = Array.prototype
//创建对象
export const arrayMethods = Object.create(arrayProto)

//能改变数组本身的实例方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```
