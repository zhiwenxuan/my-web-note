# webpack 基本知识

经过对 webpack 一段时间的学习，想总结一下对 webpack 的认识。本文只是 webpack 入门知识的总结，希望对想入门 webpack 的小伙伴有一定的帮助。

## 小谈 webpack 的产生背景

相信大家都记得刚入门前端的时候，都是写一些原生的 HTML，CSS，Javascript。 然而我们很难只用原生的 HTML，CSS，Javascript 写出方便管理维护的大型应用。这个背景下， 前端出现了模块化的概念，如：CommonJS，AMD，ES6 模块化，还出现一些新的语言框架，如：Vue，React，Scss 等等。这些都大大提高了我们开发的效率，然而这些新框架的源码  大部分不能直接在浏览器上运行。

所以 ，我们要想办法把新框架的源码转化成可以直接在浏览器上运行的代码。 这时，构建工具就产生了，但构建工具不仅仅只做转化代码的工作。构建工具主要做的事如下：

- 代码转换： ES6 转成 ES5，SCSS 编译成 CSS 等
- 文件优化： 压缩 Javascript， CSS， HTML 代码，压缩图片
- 代码分割： 提取多个页面的代码，提取首屏不需要执行的代码让其异步加载
- 模块合并： 把项目里面需要合并的模块  合并成一个文件
- 自动刷新： 监听本地源代码，自动重新构建，刷新浏览器
- 代码校验： 在代码被提交到仓库前，需要校验代码是否符合规范，以及单元测试是否通过
- 自动发布： 更新完代码后，自动构建出线上发布的代码， 并传输到发布系统 

这些过程，也体现了工程化，自动化。

历史上，出现了很多构建工具，如：Glunt，Gulp，Webpack 等。本文主要对 Webpack 进行介绍。

## webpack 是什么

Webpack 是一个现代 Javascript 应用程序的静态模块打包器。在 webpack 处理应用程序时，它会在内部创建一个依赖图，用于映射到项目需要的每个模块，然后将所有这些依赖生成到一个或多个 bundle。

![webpack构建图][1]

从以上这张图可以看到，对 Webpack 而言，js，css，scss，图片等一切文件都是模块，webpack 可以将这些模块的依赖关系梳理清楚，最后编译打包生成可以在浏览器运行的 CSS，Javascript，图片等静态文件。

## webpack 安装

具体可以参考[webpack 官网](https://webpack.js.org/guides/installation/) 或者[webpack 中文官网](https://webpack.docschina.org/guides/installation/)

```
//安装当前项目的开发依赖中
npm i -save-dev webpack

//安装在全局环境中
npm i -g webpack
```

## Webpack 小小使用

1. 新建一个项目 webpack-demo，进入项目，使用 npm 初始化项目（当然前提你得先安装 npm 和 node）

```s
mkdir webpack-demo
cd webpack-demo
npm init
```

2. 安装 webpack 和 webpack-cli

```s
npm i webpack webpack-cli -save-dev
```

3. 初始化工程结构

```s
├── dist //打包文件存储位置
├── index.html //html
├── node_modules //安装包
├── package-lock.json //
├── package.json //npm 配置
├── src
│   └── index.js // 打包入口Entry
└── webpack.config.js //webpack配置
```

下面附上文件内容：

// index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Webpack Demo</title>
</head>

<body>

</body>
<script src="./dist/index.bundle.js"></script>

</html>
```

// src/index.js

```js
let component = () => {
  let div = document.createElement("div");
  let helloText = "Hello Webpack";
  div.innerHTML = helloText;
  return div;
};

document.body.appendChild(component());
```

// package.json

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "webpack demo",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "author": "zhenqi.li",
  "email": "lizq0604@gmail.com",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"
  }
}
```

// webpack.config.js

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", //入口
  output: {
    //打包输出
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js"
  }
};
```

4. 打包项目

```s
npm run build
```

最后用浏览器打开 index.html 就可以看到'Hello Webpack'

## webpack 概念

### 核心概念

1. entry： 入口起点，指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，webpack 会找出哪些模块和 library 是入口起点（直接和间接）依赖的。
2. module：模块，在 webpack 里一切皆模块，一个模块对应着一个文件。从 entry 开始递归找出所有依赖的模块
3. chunk：代码块，一个 chunk 有一个或多个模块组合而成，用于代码合并与分割
4. loader： 模块转换器，用于把模块原内容按照需要转换成新的内容
5. plugin： 扩展插件，可以理解成 loader 的扩展，在 webpack 构建流程中的特定时机注入扩展来改变构建结果或者做你想做的事
6. output：结果输出，在 webpack 经过一系列处理后并得到最终想要的代码
   ![webpack构建过程](https://img-blog.csdn.net/20181013160631941?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpemhlbnFpaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
   ![webpack工作流程图][1]

Webpack 启动后会从 entry 里配置的 module 开始递归解析 entry 所依赖的所有 module。  
每找到一个 module， 就会根据配置的 loader 找到对应的转换规则，对 Module 进行转换后，再解析出当前 module 依赖的 module。  
这些模块会以 entry 为单位进行分组，一个 entry 和其依赖的 module 被分到一组，也就是一个 chunk。  
最后 wenpack 会把所有 chunk 转化成文件输出。  
在整个流程 webpack 会在适当的时机执行 plugin 里定义的逻辑。

### 其他概念

1. mode：模式，提供配置选项，告知 Webpack 使用相应的模式，比如：development，production 等模式
2. resolve： 解析，设置模块如何被解析，比如设置一个模块的别名 alias，默认后缀名等。[详细参考](https://webpack.docschina.org/configuration/resolve/)
3. optimization：优化
4. devServer： 提供日常开发效率的工具，可以本地开一个服务器协助开发. [详细参考](https://webpack.docschina.org/configuration/dev-server/)
5. devtool: 控制是否生成以及如何生存 source map，主要用于协助调试。 [详细参考](https://webpack.docschina.org/configuration/devtool/)
6. target: 构建目标，JavaScript 的应用场景越来越多，比如：web（默认），Nodejs，Electron 等。target 配置项可以指示 Webpack 构建出对应环境的代码。[详细参考](https://webpack.docschina.org/configuration/target/)
7. watch 和 watchOptions： Webpack 可以监听文件变化，当文件修改后会重新编译。
8. externals： 外部扩展，Webpack 主要在模块化的项目中使用的，有一些插件库不支持模块化，这时可以过滤掉这些依赖，比如：使用 CDN 引入的 jQuery。[详细参考](https://webpack.docschina.org/configuration/externals/)

## webpack 工作流程

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

3. 确定入口：根据配置中的 entry 找出所有的入口文件；

4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## Webpack 配置

###  整体配置

```js
const path = require("path");

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array
  entry: "./app/entry", // 只有1个入口，入口只有1个文件
  entry: ["./app/entry1", "./app/entry2"], // 只有1个入口，入口有2个文件
  entry: {
    // 有2个入口
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },

  // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
  output: {
    // 输出文件存放的目录，必须是 string 类型的绝对路径。
    path: path.resolve(__dirname, "dist"),

    // 输出文件的名称
    filename: "bundle.js", // 完整的名称
    filename: "[name].js", // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
    filename: "[chunkhash].js", // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的 URL 前缀，string 类型
    publicPath: "/assets/", // 放到指定目录下
    publicPath: "", // 放到根目录下
    publicPath: "https://cdn.example.com/", // 放到 CDN 上去

    // 导出库的名称，string 类型
    // 不填它时，默认输出格式是匿名的立即执行函数
    library: "MyLibrary",

    // 导出库的类型，枚举类型，默认是 var
    // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，
    libraryTarget: "umd",

    // 是否包含有用的文件路径信息到生成的代码里去，boolean 类型
    pathinfo: true,

    // 附加 Chunk 的文件名称
    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js",

    // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunction: "myWebpackJsonp",

    // 生成的 Source Map 文件名称
    sourceMapFilename: "[file].map",

    // 浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]",

    // 异步加载跨域的资源时使用的方式
    crossOriginLoading: "use-credentials",
    crossOriginLoading: "anonymous",
    crossOriginLoading: false
  },

  // 配置模块相关
  module: {
    rules: [
      // 配置 Loader
      {
        test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
        include: [
          // 只会命中这里面的文件
          path.resolve(__dirname, "app")
        ],
        exclude: [
          // 忽略这里面的文件
          path.resolve(__dirname, "app/demo-files")
        ],
        use: [
          // 使用那些 Loader，有先后次序，从后往前执行
          "style-loader", // 直接使用 Loader 的名称
          {
            loader: "css-loader",
            options: {
              // 给 html-loader 传一些参数
            }
          }
        ]
      }
    ],
    noParse: [
      // 不用解析和处理的模块
      /special-library\.js$/ // 用正则匹配
    ]
  },

  // 配置插件
  plugins: [],

  // 配置寻找模块的规则
  resolve: {
    modules: [
      // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // 模块的后缀名
    alias: {
      // 模块别名配置，用于映射模块
      // 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'
      module: "new-module",
      // 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，
      // 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'
      "only-module$": "new-module"
    },
    alias: [
      // alias 还支持使用数组来更详细的配置
      {
        name: "module", // 老的模块
        alias: "new-module", // 新的模块
        // 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射
        onlyModule: true
      }
    ],
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ["package.json"], // 模块的描述文件
    mainFields: ["main"], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false // 是否强制导入语句必须要写明文件后缀
  },

  // 输出文件性能检查配置
  performance: {
    hints: "warning", // 有性能问题时输出警告
    hints: "error", // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function(assetFilename) {
      // 过滤要检查的文件
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },

  devtool: "source-map", // 配置 source-map 类型

  context: __dirname, // Webpack 使用的根目录，string 类型必须是绝对路径

  // 配置输出代码的运行环境
  target: "web", // 浏览器，默认
  target: "webworker", // WebWorker
  target: "node", // Node.js，使用 `require` 语句加载 Chunk 代码
  target: "async-node", // Node.js，异步加载 Chunk 代码
  target: "node-webkit", // nw.js
  target: "electron-main", // electron, 主线程
  target: "electron-renderer", // electron, 渲染线程

  externals: {
    // 使用来自 JavaScript 运行环境提供的全局变量
    jquery: "jQuery"
  },

  stats: {
    // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true
  },

  devServer: {
    // DevServer 相关的配置
    proxy: {
      // 代理到后端服务接口
      "/api": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "public"), // 配置 DevServer HTTP 服务器的文件根目录
    compress: true, // 是否开启 gzip 压缩
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    https: false // 是否开启 HTTPS 模式
  },

  profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

  cache: false, // 是否启用缓存提升构建速度

  watch: true, // 是否开始
  watchOptions: {
    // 监听模式选项
    // 不监听的文件或文件夹，支持正则匹配。默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
    poll: 1000
  }
};
```

### 配置技巧

想让源文件加入到构建流程中去被 Webpack 控制，配置 entry。

想自定义输出文件的位置和名称，配置 output。

想自定义寻找依赖模块时的策略，配置 resolve。

想自定义解析和转换文件的策略，配置 module，通常是配置 module.rules 里的 Loader。

其它的大部分需求可能要通过 Plugin 去实现，配置 plugin。

[1]: http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/img/1-2webpack.png

 本文参考文章有：
[webpack 官网](https://webpack.js.org/guides/installation/)
[webpack 中文官网](https://webpack.docschina.org/guides/installation/)
[深入浅出 Webpack](http://webpack.wuhaolin.cn/)
