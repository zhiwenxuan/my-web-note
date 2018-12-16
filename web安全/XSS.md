# web安全-XSS

## 定义
全称跨站脚本攻击(Cross-Site-Script)，简写XSS。 一种典型且常见的攻击方式。攻击者通过注入外部脚本，执行程序，进行一些恶意的操作。

## XSS攻击的恶意操作
1. 获取页面数据
2. 获取cookies
3. 劫持前端逻辑
4. 发送请求
5. 偷取网站任意数据
6. 偷取用户资料
7. 偷取用户密码和登录状态
8. 欺骗用户

## 攻击分类
1. 反射型：URL参数直接注入
2. 存储型：存储到DB后读取时注入(危害更大)

## XSS攻击注入点

### HTML节点内容
HTML某节点内容依赖用户的输入，如在URL的query参数
```js
www.example.com?from=google<script>alert(xss)</script>
<div>
 ${from}
</div>

=>

<div>google<script>alert(xss)</script></div>
```

### HTML属性
通过取巧的拼接方式，为HTML标签增加属性，如下：
```js
www.example.com?avatarId=1" onerror="alert(xss)
<img src="image/${avatarId}"/>

=>

<img src="image/1" onerror="alert(xss)"/>
`1" onerror="alert(xss)` 为用户输入，输入1等不存在的链接后，添加 `"` 关闭src属性，之后触发执行onerror函数里面的脚本。
```

### JavaScript代码
JavaScript代码的某些数据来自用户的输入，用户可以拼接恶意脚本，如下：
```js
用户输入：`hi";"alert(xss)"`
var data = ${data};

=>

var data = "hi";"alert(xss)";

```

### 富文本
发表博客，说说之类的内容都是富文本。因为富文本要保留 HTML，而 HTML 会导致 XSS 攻击，所以富文本中很容易导致 XSS 攻击。

## 防御手段

### 请求头添加 X-XSS-Protection
只对 HTML 节点注入和属性注入有效

语法
```
X-XSS-Protection: 0
X-XSS-Protection: 1
X-XSS-Protection: 1; mode=block
X-XSS-Protection: 1; report=<reporting-uri>

0
禁止 XSS 过滤。
1
启用XSS过滤（通常浏览器是默认的）。 如果检测到跨站脚本攻击，浏览器将清除页面（删除不安全的部分）。
1;mode=block
启用XSS过滤。 如果检测到攻击，浏览器将不会清除页面，而是阻止页面加载。
1; report=<reporting-URI>  (Chromium only)
启用XSS过滤。 如果检测到跨站脚本攻击，浏览器将清除页面并使用CSP report-uri指令的功能发送违规报告。
```

### 转义

1. 针对 HTML 节点注入和属性注入
将一些特殊符号转为HTML实体符号，浏览器依旧可以识别
```js
var escapeHtml = function(str) {
	if(!str) return '';
    //针对&符号
	str = str.replace(/&/g, '&amp;'); 

    //针对HTML节点注入，主要转义 `<` 和 `>`
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');

    //针对HTML属性注入，主要转义双引号和单引号
	str = str.replace(/"/g, '&quto;');
	str = str.replace(/'/g, '&#39;');
	// str = str.replace(/ /g, '&#32;');
	return str;
};
```

2. 针对JavaScript代码注入
主要考虑双引号和单引号，可以使用 `JSON.stringify()`

3. 富文本
按照白名单使用部分标签和属性

可以第三方库来协助，如：cheerio 和js-xss


### 使用请求头 Content-Security-Policy(CSP)
内容安全策略，指定某些内容可以执行

可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
