# Node 加载模块过程

## 概述

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

Node 要求 ES6 模块采用.mjs 后缀文件名。也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用.mjs 后缀名。require 命令不能加载.mjs 文件，会报错，只有 import 命令才可以加载.mjs 文件。反过来，.mjs 文件里面也不能使用 require 命令，必须使用 import。

目前，这项功能还在试验阶段。安装 Node v8.5.0 或以上版本，要用--experimental-modules 参数才能打开该功能。

```s
$ node --experimental-modules my-app.mjs
```

为了与浏览器的 import 加载规则相同，Node 的.mjs 文件支持 URL 路径。

import './foo?query=1'; // 加载 ./foo 传入参数 ?query=1
上面代码中，脚本路径带有参数?query=1，Node 会按 URL 规则解读。同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名中含有:、%、#、?等特殊字符，最好对这些字符进行转义。

目前，Node 的 import 命令只支持加载本地模块（file:协议），不支持加载远程模块。

如果模块名不含路径，那么 import 命令会去 node_modules 目录寻找这个模块。

```js
import "baz";
import "abc/123";
```

如果模块名包含路径，那么 import 命令会按照路径去寻找这个名字的脚本文件。

```js
import "file:///etc/config/app.json";
import "./foo";
import "./foo?search";
import "../bar";
import "/baz";
```

如果脚本文件省略了后缀名，比如 import './foo'，Node 会依次尝试四个后缀名：./foo.mjs、./foo.js、./foo.json、./foo.node。如果这些脚本文件都不存在，Node 就会去加载./foo/package.json 的 main 字段指定的脚本。如果./foo/package.json 不存在或者没有 main 字段，那么就会依次加载./foo/index.mjs、./foo/index.js、./foo/index.json、./foo/index.node。如果以上四个文件还是都不存在，就会抛出错误。

最后，Node 的 import 命令是异步加载，这一点与浏览器的处理方法相同。

 注：文章参考[Node 加载](http://es6.ruanyifeng.com/#docs/module-loader)
