# 关于 HTTP “长连接”和“短连接”

## 理解关键点

HTTP 是应用层协议，不存在长连接和短连接。连接是传输层协议 TCP 来完成的。**所以不存在 HTTP 长连接，应该是说 TCP 长连接。**

## 使用

HTTP 1.1 后，keep-alive 默认是 true，也就是说默认是长连接。

## TCP 长连接和短连接

### 短连接

经典的三次握手和四次挥手

### 长连接

client 向 server 发起连接，server 接受 client 连接，双方建立连接。Client 与 server 完成一次读写之后，它们之间的连接并不会主动关闭，后续的读写操作会继续使用这个连接。

## 参考

[http 的长连接和短连接（史上最通俗！）](https://www.jianshu.com/p/3fc3646fad80)  
[TCP 长连接与短连接的区别](http://www.cnblogs.com/liuyong/archive/2011/07/01/2095487.html)
