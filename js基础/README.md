## JavaScript

### js四舍五入保留两位小数
Math.round会四舍五入保留整数，利用这个特性，先乘上100取整，再除以100就可以四舍五入保留两位小数
```js
Math.round(number * 100) / 100
```

### jQuery 点击事件失效

- 使用 $("#id").click(function(){ }); 有时会失效  
   原因：  
   直接将事件绑定在#id 元素上，如果#id 元素在绑定后生成，则不会触发改事件
- 推荐使用以下形式

```javascript
$(document).on("click", "#id", function() {
  console.log("document");
});
```

原因：  
将事件绑定在 document DOM 树下，当事件到达#id 元素时，事件程序被执行，由于是从整个 document 下寻找的，可以保证事件被触发  
[参考链接](https://stackoverflow.com/questions/14879168/document-onclick-id-function-vs-id-onclick-function "jQuery $(#id).click 和 $(document).on(click,#id,function(){ })区别")

### if 语句为 false 的几种情况：

- 数字 0
- 非数字 NaN
- 空字符串 ''
- 空指针 null
- 没有定义 undefined
- false 本身

### js 发生异步的情况：需要等待

等待的场景有：

- 定时任务：setTimeout, setInterval
- 网络请求：ajax 请求，图片 img 加载等
- 事件绑定

[博客整理](http://blog.csdn.net/lizhenqii/article/details/77806681 "博客整理")

### 防止浏览器缓存

    链接加上一个随机数，比如js中用Math.random()

### BOM 常见操作

1. 判断浏览器类型 navigator

```javascript
var ua = navigator.userAgent;
var isChrome = ua.indexOf("Chrome");
console.log(isChrome);
```

2. 获取屏幕宽高 screen

```javascript
screen.width;
screen.height;
```

3. 拆解 url 各个部分 location  
   http://coding.xuan.com/lesson/115.html?id=1#mid=5390

```javascript
location.href; //获取整一个连接
location.protocol; //协议类型 http
location.hash; //如 #mid=5390
location.search; // 获取查询部分，如 ?id=1
location.pathname; // 'lesson/115.html'
```

4. 页面回退与前进 history

```javascript
history.back();
history.forward();
```

### js 获取随机数，要求长度一致的字符串格式

```javascript
var random = Math.random() + "0000000000"; //使用Math random 获取随机数，再加上10位0
var random = random.slice(0, 10); //截取前10位
```

### 使用 XMLHttpRequest 写一个简单的 ajax 请求(暂未兼容 IE)

```javascript
xhr = new XMLHttpRequest(); //新建对象
xhr.open("GET", "/api", false); //初始化请求
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    //请求完成
    if (xhr.status === 200) {
      //服务器返回状态码
      window.alert(xhr.responseText);
    }
  }
};
xhr.send(null);
```

状态码 readyState 说明

- 0 : (未初始化）还没有调用 send()方法
- 1 :（载入）已调用 send()方法，正在发送请求
- 2 : (载入完成) send 方法执行完成，已经接受请求的全部内容
- 3 : (交互) 正在解析交互内容
- 4 : (完成) 解析内容完成，客户端可以调用

[可参考文章](http://blog.csdn.net/liujiahan629629/article/details/17126727 "可参考文章")

### cookie 和 sessionStorage localStorage 区别

- 容量：cookie 大小只有 4KB，sessionStorage 和 localStorage 有 5MB
- 请求携带：所有 http 请求都要到上 cookie，影响效率
- API 易用性：cookie 简单，需要封装，document.cookie = …  
  其他两个简单易用，如 localStorage.getItem(key) localStorage.setItem(key, value)

### 监听页面加载完的两种形式

- 资源全部加载完的情况

```javascript
window.addEventListener("load", function() {
  // 页面资源全部加载完全，包括视频、图片，才能执行
});
```

- 只渲染完 DOM，未加载完全部资源

```javascript
document.addEventListener("DOMContentLoaded", function() {
  // 只渲染完DOM即可执行，未加载完全部资源，如视频、图片
});
```

### 国外信用卡格式

```javascript
defaultFormat = /(\d{1,4})/g;
cards = [
  {
    type: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true
  },
  {
    type: "dankort",
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "hipercard",
    pattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    format: defaultFormat,
    length: [14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "dinersclub",
    pattern: /^(36|38|30[0-5])/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "jcb",
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "laser",
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "maestro",
    pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "mastercard",
    pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "unionpay",
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: "visaelectron",
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "elo",
    pattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "visa",
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16, 19],
    cvcLength: [3],
    luhn: true
  }
];
```

### Promise

一个简单的例子：

```javascript
  let httpBasePostRequest = (url, params) => {
      return new Promise((resolve, reject) => {
          axios.post(url, params).then(
              res => {
                  resolve(res); //成功返回
              },
              err => {
                  reject(err); //失败
              }
          );
      });
  }

  let url = 'https://www.exmple.com//login';
  let params = {
    user: 'zhangsan',
    password: '123456'
  };
  httpBasePostRequest(url, params).then( (res) => {
    console.log('Login success.');
  }).catch( (err) => {
    console.log(err);
  })

  备注：
  Promise.resolve只可以接受一个参数
  参数类型有三种：
  Promise.resolve(value); //需要解析的参数
  Promise.resolve(promise); //直接返回这个Promise对象
  Promise.resolve(thenable);

  Promise.reject //返回一个带有拒绝原因reason参数的Promise对象
```

Promise 嵌套：

```javascript
  //实现一秒中后(n * n)，接着一秒后(n*n + n*n),最后打印出来

  //1秒后执行num1*num1
  function MyMultiply(num1) {
    return new Promise((resolve, reject) => {
    console.log('start mutil')
    setTimeout(resolve, 1000, num1*num1);
    })
  };

  //1秒后执行num1+num1
  function myAdd(num1) {
    return new Promise( (resolve, reject) => {
      console.log('start add')
      setTimeout(resolve, 1000, num1+ num1)
      } )
  }

  new Promise( (resolve, reject) => {
    console.log('Start promise');
    let n = 5;
    resolve(n);
  } )
  .then(MyMultiply)
  .then(myAdd)
  .then(result => {
    console.log(result)
  });

  结果：
  Start promise
  Promise {<pending>}
  start mutil
  start add
  50
```

### ES7

ES7 主要增加了两项内容：幂运算(\*\*) 和 Array.prototype.includes

- 幂运算（\*\*）

```
  7的8次方 => 7**8
```

- Array.property.includes
  判断数组是否  包含某项元素，和 ES6 的 Array.prototype.indexOf 相似

```javascript
["a", "b", "c"]
  .includes("a") //true
  [("a", "b", "c")].indexOf("a") > -1; //true
```

### ES8

[可参考](https://blog.csdn.net/lihefei_coder/article/details/75068578, "ECMAScript规范第8版(ES2017)已发布，新功能一览")
ES8 主要增加：

- 异步函数(Async functions)
- Object.entries()和 Object.values()
- 字符串填充：padStart 和 padEnd
- Object.getOwnPropertyDescriptors()
- 函数参数列表与调用中的尾部逗号
- 共享内存和原子（Shared memory and atomics）

###  图片懒加载
实现步骤：  
1. img的src属性不添加值或者添加一个默认图片
2. 给img自定义一个属性data-*，比如data-src，用来保存真实的路径
3. 判断img是否在用户可视范围，如果在可视范围，将data-src属性的值赋予src
  - 去重处理： 给所有需要懒加载的图片添加同一个类名，当已经给src赋值时，去掉该类名
  - 判断是否可视依据：‘img距离文档顶部的距离’是否小于 ‘窗口的高度’ + ’滚动条滚动的高度‘

实现样例：

```javascript
  var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
  var windowHeight = window.innerHeight;// 视窗高度
  var imgs = document.getElementsByClassName('lazyloadimg');
  for (var i =0; i < imgs.length; i++) {
    var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度  
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
        imgs[i].src = imgs[i].getAttribute('data-src');
        img[i].className = img[i].className.replace('lazyloadimg','')
    }
  }
```
优化：加上防抖节流
