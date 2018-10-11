# 浏览器加载 JS 脚本流程

## 加载传统 ES5 JS 脚本的流程

在 HTML 网页中，浏览器通过`<script>`标签加载 JavaScript 脚本。

```js
//页面内嵌的脚本
<script type="application/javascript">
  // module code
</script>

//外部脚本
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

上面代码中，由于浏览器脚本的默认语言是 JavaScript，因此 type="application/javascript"可以省略。

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，`<script>`标签打开 defer 或 async 属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

defer 与 async 的区别是：defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer 是“渲染完再执行”，async 是“下载完就执行”。另外，如果有多个 defer 脚本，会按照它们在页面出现的顺序加载，而多个 async 脚本是不能保证加载顺序的。

## 加载 ES6 JS 脚本的流程

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入 type="module"属性。

```js
<script type="module" src="./foo.js" />
```

上面代码在网页中插入一个模块 foo.js，由于 type 属性设为 module，所以浏览器知道这是一个 ES6 模块。

浏览器对于带有 type="module"的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的 defer 属性。

```js
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

如果网页有多个`<script type="module">`，它们会按照在页面出现的顺序依次执行。

`<script>`标签的 async 属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

```js
<script type="module" src="./foo.js" async />
```

一旦使用了 async 属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```js
<script type="module">import utils from "./utils.js"; // other code</script>
```

对于外部的模块脚本（上例是 foo.js），有几点需要注意。

1. 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
2. 模块脚本自动采用严格模式，不管有没有声明 use strict。
3. 模块之中，可以使用 import 命令加载其他模块（.js 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 export 命令输出对外接口。
4. 模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。
5. 同一个模块如果加载多次，将只执行一次。

下面是一个示例模块。

```js
import utils from "https://example.com/js/utils.js";

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

利用顶层的 this 等于 undefined 这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```js
const isNotModuleScript = this !== undefined;
```
