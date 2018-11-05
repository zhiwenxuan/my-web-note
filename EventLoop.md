# 事件循环EventLoop

## 几个重要概念
1. JavaScript是单线程语言，所有的JavaScript多线程都是用单线程模拟的，或者只是语法糖
2. 事件循环EventLoop是JavaScript的执行机制
3. 任务有同步队列和异步队列，其中异步队列包含宏任务task和微任务microtask
4. 事件循环的过程：
    1. 首先执行完所有的同步队列
    2. 接着看有没有异步微任务，有则执行完整个微任务队列里面的所有任务
    3. 接着看有没有异步宏任务，有则执行一个异步宏任务
    4. 重复第二第三步

## 一个小例子

```js
console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
})

new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})

setTimeout(() => {
    console.log(9)
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})

执行结果： 1，7，8，2，4，5，9，11，12
执行过程：
1. 首先打印 1
2. 遇到setTimeout， 放到异步任务队列里，这里记为：time1
3. 遇到promise，首先打印 7， 将then放到异步微任务队列
4. 再次遇到setTimeout，放到异步宏任务队列里，这里记为：time2
5. 这时同步任务队列执行完，这是去看微任务队列，执行第三步放进的任务，即打印 8
6. 这时执行异步宏任务队列time1，首先打印 2，接着打印 4，并将time1里面promise的then放到异步微队列里
7. 由于已经执行一次异步宏任务，这时看有没有异步微任务，发现第六步有加入一个微任务，执行打印 5
8. 这时再去看有没有异步宏任务，发现time2，首先打印 9， 接着打印 11， 并将time2里面promise的then放到异步微队列里
9. 由于已经执行一次异步宏任务，这时看有没有异步微任务，发现第八步有加入一个微任务，执行打印 12
10. 再看异步宏任务，没有了，再看异步微任务，没有了，结束！
```
## 一些好文章
[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
