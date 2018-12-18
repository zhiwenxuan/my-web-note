# web安全-CSRF

## 定义
跨站请求攻击（Cross-Site Request Forgery），简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

## csrf攻击原理
![csrf攻击原理](https://raw.githubusercontent.com/zhiwenxuan/My_web_note/master/img/csrf-principle.png)
1. 用户登录A网站
2. A网站验证用户身份
3. B网站向A网站发送请求（携带A网站的身份），这一步一般是用户访问了B网站（恶意网站），然后不知情的情况下触发了请求。

**例子**  
假如一家银行用以运行转账操作的URL地址如下： http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName

那么，一个恶意攻击者可以在另一个网站上放置如下代码：` <img src="http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman">`

如果有账户名为Alice的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那么她就会损失1000资金。


## csrf攻击危害
1. 利用用户登录态
2. 用户不知情
3. 完成业务请求
4. 盗取用户资金
5. 冒充用户发帖背锅
6. 损坏网站声誉


## csrf攻击特征
![csrf攻击特征](https://raw.githubusercontent.com/zhiwenxuan/My_web_note/master/img/csrf-attack-features.png)
1. 向A网站发送请求并携带A网站的身份（一般是cookie ）
2. 不经过A网站前端发送请求
3. HTTP referer头指向B网站（攻击网站）

## 防御手段

### 使用set-Cookie的SameSite属性
设置SameSite=Strict，限制第三方网站携带cookie，针对csrf攻击特征1（携带用户身份）
```js
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
```
缺陷：兼容性差，只在Chrome和Opera中有效  


### 使用验证码
每次调用请求接口，用户都要输入验证码进行验证。  
针对csrf攻击特征2（不经过A网站前端发送请求）  
缺陷：用户体验差

### 使用Token
在后端生成Token（如随机数），并提前发送到前端，请求时带上Token  
针对csrf攻击特征2（不经过A网站前端发送请求）  

### 使用HTTP referer字段
根据HTTP 的referer字段判断请求是否来自第三方网站，如果是，可以进行拦截之类的操作  
针对csrf攻击特征3（ HTTP referer头指向B网站（攻击网站））

```js
var referer = ctx.request.headers.referer;
if(!/^https?:\/\/localhost/.test(referer)){
    throw new Error('非法请求');
}
```
