# 第七章 迭代器模式

## 定义

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

现在很多语言都内置了迭代器的实现，如 JavaScript 中 `Array.prototype.forEach`。这章节主要了解这种思想为主。

## jQuery 中的迭代器

迭代器模式无非就是循环访问聚合对象中的各个元素。比如 jQuery 中的\$.each 函数，其中回调函数中的参数 i 为当前索引，n 为当前元素，代码如下:

```js
$.each([1, 2, 3], function(i, n) {
  console.log("当前下标为: " + i);
  console.log("当前值为:" + n);
});
```

## 实现自己的迭代器

现在我们来自己实现一个 each 函数，each 函数接受 2 个参数，第一个为被循环的数组，第 二个为循环中的每一步后将被触发的回调函数:

```js
var each = function(arr, callback) {
    for(var i =0; l =arr.length; i < l; i++) {
        callback.call(arr[i], i, arr[i]);
    }
}
each([1,2,3,4], function(i, n) {
    console.log([i, n])
})
```

## 内部迭代器 和 外部迭代器

### 内部迭代器

上面编写的 each 函数属于内部迭代器，each 函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。

内部迭代器在调用的时候非常方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅 仅是一次初始调用，但这也刚好是内部迭代器的缺点。由于内部迭代器的迭代规则已经被提前规 定，上面的 each 函数就无法同时迭代 2 个数组了。

比如现在有个需求，要判断 2 个数组里元素的值是否完全相等， 如果不改写 each 函数本身 的代码，我们能够入手的地方似乎只剩下 each 的回调函数了，代码如下:

```js
var compare = function(ary1, ary2) {
  if (ary1.length !== ary2.length) {
    throw new Error("ary1 和 ary2 不相等");
  }
  each(ary1, function(i, n) {
    if (n !== ary2[i]) {
      throw new Error("ary1 和 ary2 不相等");
    }
  });
  alert("ary1 和 ary2 相等");
};
compare([1, 2, 3], [1, 2, 4]); // throw new Error ( 'ary1和ary2不相等' );

//这个实现不太友好
```

### 外部迭代器

外部迭代器必须显式地请求迭代下一个元素。

外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制 迭代的过程或者顺序。

下面这个外部迭代器的实现来自《松本行弘的程序世界》第 4 章，原例用 Ruby 写成，这里 我们翻译成 JavaScript:

```js
var Iterator = function(obj) {
  var current = 0;

  var next = function() {
    current += 1;
  };

  var isDone = function() {
    return current >= obj.length;
  };

  var getCurrentItem = function() {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  };
};

//再看看如何改写 compare 函数:

var compare = function(iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error("iterator1 和 iterator2 不相等");
    }
    iterator1.next();
    iterator2.next();
  }
  alert("iterator1 和 iterator2 相等");
};
var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
compare(iterator1, iterator2); // 输出:iterator1 和 iterator2 相等
```

外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。
