## HTML

### 获取标签宽度

HTMLElement.offsetWidth  
 [参考链接](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth "获取标签宽度")

### DOM 的 property 和 Attribute 区别

- property 是 js 中对象中的标准属性,DOM.className
- Attribute 是标签文档中的属性,比如 DOM.getAttribute('href')

### 给标签添加自定义属性

```html
需要在前面加上'data-'，比如：

<a data-mid='2'>加上一个mid自定义属性</a>
```
### 自动补全属性autocomplete
可以用于信用卡💳自动补全等

### HTML高级文字格式
- 描述列表
整一个描述列表使用dl，每一项使用dt，每一项里面的具体内容使用dd，如下：
```html
  <dl>
    <dt>soliloquy</dt>
    <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
    <dt>monologue</dt>
    <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
    <dt>aside</dt>
    <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.</dd>
  </dl>
```

- 缩略语
使用abbr包含引用，并提供title来解释缩略语，如下： 
```html
  <p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>
```

- 标记联系人address
```html
  <address>
    <p>Chris Mills, Manchester, The Grim North, UK</p>
  </address>
```

- 上标<sup></sup>和下标<sub></sub>
```html
  <p>My birthday is on the 25<sup>th</sup> of May 2001.</p>
  <p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
  <p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>
```

- 展示计算机代码
code: 用于标记计算机通用代码。  
pre: 对保留的空格（通常是代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在pre标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。  
var: 用于标记具体变量名。  
kbd: 用于标记输入电脑的键盘（或其他类型）输入。  
samp: 用于标记计算机程序的输出。  

```html
<pre><code>var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}</code></pre>

<p>You shouldn't use presentational elements like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</p>

<p>In the above JavaScript example, <var>para</var> represents a paragraph element.</p>


<p>Select all the text with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>.</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>
```
结果如下：
```
var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}
You shouldn't use presentational elements like <font> and <center>.

In the above JavaScript example, para represents a paragraph element.

Select all the text with Ctrl/Cmd + A.

$ ping mozilla.org
PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms
```

- 标记时间和日期 time
```html
<!-- Standard simple date -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- Just year and month -->
<time datetime="2016-01">January 2016</time>
<!-- Just month and day -->
<time datetime="01-20">20 January</time>
<!-- Just time, hours and minutes -->
<time datetime="19:30">19:30</time>
<!-- You can do seconds and milliseconds too! -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- Date and time -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- Date and time with timezone offset-->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- Calling out a specific week number-->
<time datetime="2016-W04">The fourth week of 2016</time>
```

- 标示删除的文本del
```html
<p><del>This text has been deleted</del>, here is the rest of the paragraph.</p>
<del ><p >This paragraph has been deleted.</p ></del >
```

- 标示插入的文本ins