# web安全

## 攻击类型
1. XSS
2. CSRF
3. 前端Cookies问题
4. 前端点击劫持问题
5. 传输安全
6. 密码安全
7. SQL注入
8. 上传文件漏洞
9. 社会工程学和信息泄漏
10. DOS攻击
11. 重放攻击

---

### 前端Cookies问题
安全策略：  
1. 签名防伪造
2. 私有交换（加密）
3. http-only：js不能读取，防止XSS
4. secure：只能在https协议下使用
5. SameSite： 禁止第三方网站携带cookie，防止CSRF攻击

---

### 前端点击劫持问题

#### 点击劫持特征及危害
1. 用户亲自操作
2. 用户不知情
3. 套取用户资金（转账，消费）
4. 获取敏感信息（比如邮件信息，邮件信息里的验证码）

#### 点击劫持攻击原理
将目标网站通过iframe嵌入攻击者网站，并设置目标网站透明度为0，在攻击者网站设置点击引导，通过引导，让用户对目标网站进行操作，从而达到攻击的效果。这里很容易看到，用户并不知情，但却是自己操作的。

```js
// 1. 为整个网页设置了背景图片，背景图片里面有引导点击按钮
// 2. 通过iframe引入目标网站
// 3. 设置opacity为0
// 这样用户以为点击的是背景图片，实际点击的目标网站
<body style="background:url(clickhijack.png) no-repeat">
    <iframe style="opacity:0" src="http://localhost:1521/post/15" width="800" height="600"></iframe>
</body>
```

#### 点击劫持防御

1. JavaScript 防止内嵌
通过window.top来判断是否网页被第三方网站内嵌，如果是则跳转到自身的网址
```js
if(top.location != window.location){
    top.location = window.location;
}
```
缺陷：如果攻击者网站禁用JavaScript，则无法达到防御效果

2. X-Frame-Options 禁止内嵌

X-Frame-Options 有三个值:
```js
DENY
表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
SAMEORIGIN
表示该页面可以在相同域名页面的 frame 中展示。
ALLOW-FROM uri
表示该页面可以在指定来源的 frame 中展示。
```
**这个是比较好的解决方案**

---

### 传输安全
传输的所有链路都可能被窃听和篡改

#### HTTP窃听
1. 窃听用户密码
2. 窃听敏感信息
3. 非法获取资料

#### HTTP篡改
1. 插入广告
2. 重定向网址
3. 无法防御XSS和CSRF攻击（因为可以更改内容）

#### 窃听篡改攻击例子
1. 运营商劫持
2. 支付宝的局域网劫持（获取用户输入的账号密码）
3. 公共Wi-Fi获取你的所有信息（密码之类的）

#### 传输安全防御
使用HTTPS

---

### 密码安全

#### 密码泄漏的渠道
1. 数据库被偷
2. 服务器被入侵
3. 通讯被窃听
4. 内部人员泄漏数据
5. 其他网站泄漏（撞库）

#### 密码存储
1. 严禁明文存储

---

### SQL注入

```sql
例子1:

select * from user where username = ${username} and password = ${password};

用户输入：
username: 'zhangsan',
password: '1' or '1' = '1'

最后拼接成：
select * from user where username = 'zhangsan' and password = '1' or '1' = '1';
由于 or '1' = '1' ,这个条件永远成立，登录判断无效

例子2:
select * from user where id = ${id};

用户输入：1; drop table user;

最后拼接：
select * from user where id = 1; drop table user;
恶意删除数据库

```

### 上传文件漏洞

#### 特征
1. 文件由用户上传
2. 用户可以通过URL访问刚上传的文件
3. 文件可以当程序来解析 （一般做一些恶意的操作）
4. php，jsp后台服务器出现比较多
---

#### 上传问题防御
1. 限制上传后缀
2. 文件类型检查
3. 文件内容检查
4. 程序输出
5. 权限控制-可写可执行互斥

---

### 社会工程学和信息泄漏

#### oAuth思想
1. 一些行为由用户授权
2. 授权行为不泄漏敏感信息
3. 授权会过期

---

### DOS攻击

#### DOS攻击原理
1. 模拟正常用户
2. 大量占用服务器资源
3. 无法服务正常用户

#### DOS攻击类型
1. TCP半连接
2. HTTP连接
3. DNS

### 重放攻击

#### 重放攻击特征
1. 请求被窃听或记录
2. 再次发起相同的请求
3. 产生意外的结果

#### 重放攻击危害
1. 用户被多次消费
2. 用户登录态被盗取
3. 多次抽奖/刷票

#### 重放攻击防御
1. 加密（HTTPS）
2. 时间戳
3. token（session）
4. nonce
5. 签名