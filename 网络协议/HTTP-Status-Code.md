# HTTP 响应状态码
本篇文章主要记录一下HTTP的响应状态码。

## 总共有五大类，如下表：

| Code | 类别 | 原因短语 |
| :------ | :------ | :------|
| 1XX | Informational（信息性状态码）| 接收的请求正在处理 |
| 2XX | Success （成功状态码）       | 请求正常处理完毕 |
| 3XX | Redirection（重定向状态码）  | 需要进行附加操作以完成请求 |
| 4XX | Client Error（客户端错误状态码）| 服务器无法处理的请求 |
| 5XX | Server Error （服务器错误状态码）| 服务器处理请求出错 |

## 比较常见的状态码

1. 200 OK
请求成功，服务器正常处理请求。

2. 204 No Content
 请求成功，但是服务器没有资源可以返回。

3. 206 Partial
客户端对资源某一部分进行请求

4. 301 Moved Permanently
永久性重定向。请求的资源已经分配了新的URI。

5. 302 Found
临时性重定向。 该状态码表示请求的资源已经分配了新的URI，希望用户（本次）能使用新的URI

6. 303 See Other
该资源已经存在新的URI，希望用户以后用新的URI。

7. 304 Not Modified
附带条件的请求。资源已经找到，但是资源没有满足请求条件。

    附件条件是指：请求报文中包含If-Match， If-Modified-Since， If-None-Match， If-Range， If-Unmodified-Since中任一首部

8. 307 Temporary Redirect
临时重定向。跟302 Found相似。不同点： 302 会把POST转为GET，而307不会。

9. 400 Bad Request
请求报文存在语法错误，比如请求参数名称不对等。

10. 401 Unauthorized
请求需要HTTP 认证。

11. 403 Forbidden
没有权限访问该资源

12. 404 Not Found
服务器上没有请求的资源。

13. 500 Internal Server Error
服务器执行程序发生错误，可能是代码bug或者服务器故障

14. 503 Service Unavailable
服务器处理超负载，无法处理请求
