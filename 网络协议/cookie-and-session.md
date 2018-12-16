# cookie 和 session学习

## cookie

1. 背景
HTTP是无状态协议，为了保存用户的信息，增加cookie来存储用户的信息

2. 产生
一般由服务器产生，随HTTP返回给客户端，但是web端也可以通过操作document.cookie生成新的cookie。之后的客户端与服务器之间的请求都要带上cookie。

3. 存储位置
在客户端存储，分为两种：内存存储和硬盘存储  
内存存储：浏览器关闭后即消失  
硬盘存储：有一个过期时间，如果用户不手动清除，直到到过期时间才消失  

4. 缺陷
    1. 只有4KB大小，无法存储复杂的数据
    2. 明文存储，不安全，除非在https
    3. HTTP的每个请求都要带上Cookie，浪费流量

## session

1. 机制
session机制是一种服务器端的机制，服务器使用一种类似于散列表的结构（也可能就是使用散列表）来保存信息。

    当程序需要为某个客户端的请求创建一个session时，服务器首先检查这个客户端的请求里是否已包含了一个session标识（称为session id），如果已包含则说明以前已经为此客户端创建过session，服务器就按照session id把这个session检索出来使用（检索不到，会新建一个），如果客户端请求不包含session id，则为此客户端创建一个session并且生成一个与此session相关联的session id，session id的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串，这个session id将被在本次响应中返回给客户端保存。

    保存这个session id的方式可以采用cookie，这样在交互过程中浏览器可以自动的按照规则把这个标识发挥给服务器。一般这个cookie的名字都是类似于SEEESIONID。但cookie可以被人为的禁止，则必须有其他机制以便在cookie被禁止时仍然能够把session id传递回服务器。

2. 存储位置
服务器

## cookie 和 session 区别

1. 存取方式不同（数据类型）
cookie只能存储ASCII字符串，其他Uicode字符串或者二进制需要编码才能存储  
session中能够存取任何类型的数据，包括而不限于String、Integer、List、Map等  

2. 安全性
cookie存储在客户端，如果明文存储关键信息，不安全  
session存储在服务器，相对安全

3. 有效期
cookie可以很方便设置有效期   
session依赖名为JSESSIONID的cookie，而JSESSIONID有效期默认为-1，只要关闭浏览器就会失效。如果失效时间过长，会造成服务器内存溢出。  

4. 服务器压力（占用服务器资源）
session保存在服务器，如果用户非常多，并未每个用户创建一个session，会消耗大量的内存。  
cookie保存在客户端，不会存在资源消耗。  
所以想谷歌和百度，用户量极大，一般都是采用cookie保存用户的登录状态

5. 浏览器支持
有些浏览器会禁用cookie，如果要完成交互，要借助session+URL地址重写

6. 跨域支持
cookie可以设置跨域  
session不可以

## 总结
一般是结合cookie 和 session一起使用。

## 参考
[Cookie 与 Session 的区别](https://juejin.im/entry/5766c29d6be3ff006a31b84e)  
[MDN Cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#Syntax)
