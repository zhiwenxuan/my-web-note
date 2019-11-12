# 第二十一章 Ajax 与 Comet

### 21.1 XMLHTTPRequest 对象

```js
// 兼容性：IE7+、Firefox、Opera、Chrome 和 Safari
var xhr = new XMLHttpRequest();
```

#### 21.1.1 XHR 用法

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText)
    }
  }
}
xhr.open('post', 'url', false);
xhr.send(data);
```

readyState 的几个值：
- 0 : 未初始化。尚未调用 open() 方法
- 1： 启动。已经调用 open() 方法，但尚未调用 send() 方法
- 2 ： 发送。已经调用 send() 方法
- 3 ： 接收。已经接收到部分响应数据
- 4 ： 完成。已经接收到全部响应数据。

XMLHttpRequest 的其他属性和方法请查看 [MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

### 21.2 跨域资源共享CORS

#### 21.2.1 实现
CORS 通过一种叫做 Preflighted Request 的透明服务器验证机制支持开发人员使用自定义的头部以及不同类型的主体内容。向服务器发送一个 Preflight请求时，使用 OPTIONS 方法，发送下列头部：  
```
Origin: 来源
Access-Control-Request-Method：请求自身使用的方法
Access-Control-Request-Headers: （可选）自定义的头部信息，多个头部以逗号分隔

例子：
Access-Control-Request-Headers: authorization // 用来携带Token
Access-Control-Request-Method: GET
Origin: https://www.example.com
```

发送这个请求后，服务器可以决定是否允许这种类型的请求。服务器通过在响应中发送如下头部与浏览器进行沟通。
```
Access-Control-Allow-Origin: 来源
Access-Control-Allow-Methods: 允许的方法，多个方法以逗号分隔
Access-Control-Allow-Headers: 允许的头部，多个头部以逗号分隔
Access-Control-Max-Age: 应该将这个 PreFlight 请求缓存多长时间（以秒表示）

例子：
Access-Control-Allow-Credentials: true // 这个是设置 withCredentials 为 true时返回
Access-Control-Allow-Headers: Authorization,Content-Type,X-Requested-With,accept,Origin
Access-Control-Allow-Methods: GET,POST,HEAD,OPTIONS,PUT,DELETE,PATCH
Access-Control-Allow-Origin: https://www.example.com
Access-Control-Expose-Headers: Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Credentials
Access-Control-Max-Age: 3600
```

要想请求带凭据（Token），需要设置 withCredentials 为true。

### 21.3 其他跨域技术

#### 21.3.1 图像 Ping

图像 Ping 通过动态创建图像实现。图像 Ping 是与服务器进行简单、单向的跨域通信的一种方式。请求的数据是通过查询字符串的形式发送的。如下例子：
```js
var img = new Image();
img.onload = img.onerror = function(){
    alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas";
```

用途：图像 Ping 最常用于跟踪用户点击页面或动态广告曝光次数。  
缺点：1. 只能发送 Get 请求；2. 无法访问服务器响应的文本。

#### 21.3.2 JSONP
JSONP 是 JSON with padding （填充式JSON或参数式JSON）的简写，是应用 JSON 的一种新方法。JSONP 看起来与 JSON 差不多，只不过是被包含在函数调用中的 JSON，如下：
```js
callback({ "name": "Tom" });
```

JSONP 有两部分组成：回调函数和数据。回调函数是当响应到时应该在页面中调用的函数。回调函数的名字一般是在请求中指定。而数据就是传入回调函数中的JSON 数据。如下：
```js
// 地理定位服务例子
// http://freegeoip.net/json/?callback=handleResponse

function handleResponse(response){
  alert("You are at IP address " + response.ip + ", which is in " +
          response.city + ", " + response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse"; 
document.body.insertBefore(script, document.body.firstChild);
```

与图像 Ping 相比，它的优点在于直接访问响应文本，支持在浏览器与服务器之间双向通信。

缺点：1. 安全性，JSONP 是从其他域中加载代码执行，如果其他域不安全，可能夹带恶意代码； 2. 很难确定 JSONP 请求是否成功

#### 21.5.3 服务器推送 Comet
有两种实现 Comet 的方式： 长轮询 和 流。

长轮询是传统轮询（短轮询）的一个翻版，即浏览器定时向服务器发送请求，看有没有更新的数据。页面发起请求，服务器保持连接打开，直到有数据可发送，接收完数据后，浏览器关闭连接。短轮询的不同点在于，服务器立即响应，不关数据是否有效。

第二种实现方式是 HTTP 流。页面整个生命周期内只使用一个 HTTP 连接。就是浏览器发送请求，服务器保持连接打开，然后周期性向浏览器发送数据。PHP 实现例子：
```php
<?php
  $i = 0;
  while (true) {
    // 输出一些数据，然后立即刷新输出缓存
    echo "Number is $i";
    flush();

    // 等几秒钟
    sleep(10);

    $i++;
  }
```

浏览器端实现：
```js
function createStreamingClient (url, propress, finished) {
  var xhr = new XMLHttpRequest();
  var received = 0;

  xhr.open('get', url, true);
  xhr.onreadystatechange = function() {
    var result;

    if (xhr.readyState === 3) {
      
      // 只取得最新数据并调整计数器
      result = xhr.responseText.substring(received);
      received += result.length;

      // 调用 progress 回调函数
      progress(result);

    } else if (xhr.readyState === 4) {
      finished(xhr.responseText);
    }
  };
  xhr.send(null);
  return xhr;
}

var client = createStreamingClient("streaming.php", function(data) { 
  alert("Received: " + data);
}, function(data) {
   alert("Done!");
});
```

#### 21.5.4 服务器发送事件 SSE
SSE （Server-Sent Events， 服务器发送事件） 是围绕 Comet 交互推出的 API。SSE API 用于创建到服务器的单向连接， 服务器通过这个连接可以发送任意数量的数据。服务器响应的 MIME 类型必须是 text/event-stream。

一个关键的类： EventSource 。

```js
// 创建对象
var source = new EventSource('myevents.php'); // url 要跟创建页面同源

// 属性
readyState // 值为 0 时代表正在连接服务器， 1 代表打开连接， 2 代表关闭了连接。

// 三个事件
open // 建立连接时触发
message //  从服务器收到信息时触发
error // 无法建立连接时触发

source.onmessage = function (event) {
  var data = event.data;
  // 处理数据
}

// 强制立即断开连接
source.close();
```

#### 21.5.5 Web Sockets
Web Sockets 的目标是在一个单独的持久连接上提供双向通信。在 JavaScript 中创建了 Web Socket之后，发送一个 HTTP 请求，取得服务器响应后，建立的连接从HTTP 协议交换为 Web Socket 协议。

Web Sockets API
```js
// 创建对象
var socket = new WebSocket("ws://www.example.com/server.php")

// readyState 属性
WebSocket.OPENING 0 // 正在建立连接
WebSocket.OPEN 1 // 已经建立连接
WebSocket.CLOSING 2 // 正在关闭连接
WebSocket.CLOSE 3 // 已经关闭连接

// 关闭连接
socket.close()

// 发送数据
socket.send('Hello World!') // 参数为字符串，如果是对象可以使用 JSON.stringify()

// 接收数据
socket.onmessage = function(event) {
  var data = event.data;
  // 处理数据
}

// 其他事件
open // 在成功建立连接时触发
error // 在发生错误时触发
close // 在连接关闭时触发
```
