# webpack 学习笔记

## 为什么使用

## 怎样使用

### 基本语法

### 项目常见使用

## 优化

---

有没有去研究 webpack 的一些原理和机制，怎么实现的

1. 解析 webpack 配置参数，合并从 shell 传入和 webpack.config.js 文件里配置的参数，生产最后的配置结果。

2) 注册所有配置的插件，好让插件监听 webpack 构建生命周期的事件节点，以做出对应的反应。

3. 从配置的 entry 入口文件开始解析文件构建 AST 语法树，找出每个文件所依赖的文件，递归下去。

4) 在解析文件递归的过程中根据文件类型和 loader 配置找出合适的 loader 用来对文件进行转换。

5. 递归完后得到每个文件的最终结果，根据 entry 配置生成代码块 chunk。

6) 输出所有 chunk 到文件系统。

---

虽然 Webpack 功能强大且配置项多，但只要你理解了其中的几个核心概念，就能随心应手地使用它。 Webpack 有以下几个核心概念。

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

在实际应用中你可能会遇到各种奇怪复杂的场景，不知道从哪开始。 根据以上总结，你会对 Webpack 有一个整体的认识，这能让你在以后使用 Webpack 的过程中快速知道应该通过配置什么去完成你想要的功能，而不是无从下手。

---

整体配置结构

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

---

多种配置类型
除了通过导出一个 Object 来描述 Webpack 所需的配置外，还有其它更灵活的方式，以简化不同场景的配置。 下面来一一介绍它们。

导出一个 Function
在大多数时候你需要从同一份源代码中构建出多份代码，例如一份用于开发时，一份用于发布到线上。

如果采用导出一个 Object 来描述 Webpack 所需的配置的方法，需要写两个文件。 一个用于开发环境，一个用于线上环境。再在启动时通过 webpack --config webpack.config.js 指定使用哪个配置文件。

采用导出一个 Function 的方式，能通过 JavaScript 灵活的控制配置，做到只用写一个配置文件就能完成以上要求。

导出一个 Function 的使用方式如下：

```js
const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = function(env = {}, argv) {
  const plugins = [];

  const isProduction = env["production"];

  // 在生成环境才压缩
  if (isProduction) {
    plugins.push(
      // 压缩输出的 JS 代码
      new UglifyJsPlugin()
    );
  }

  return {
    plugins: plugins,
    // 在生成环境不输出 Source Map
    devtool: isProduction ? undefined : "source-map"
  };
};
```

在运行 Webpack 时，会给这个函数传入 2 个参数，分别是：

env：当前运行时的 Webpack 专属环境变量，env 是一个 Object。读取时直接访问 Object 的属性，设置它需要在启动 Webpack 时带上参数。例如启动命令是 webpack --env.production --env.bao=foo 时，则 env 的值是 {"production":"true","bao":"foo"}。
argv：代表在启动 Webpack 时所有通过命令行传入的参数，例如 --config、--env、--devtool，可以通过 webpack -h 列出所有 Webpack 支持的命令行参数。
就以上配置文件而言，在开发时执行命令 webpack 构建出方便调试的代码，在需要构建出发布到线上的代码时执行 webpack --env.production 构建出压缩的代码。

本实例 提供项目完整代码

导出一个返回 Promise 的函数
在有些情况下你不能以同步的方式返回一个描述配置的 Object，Webpack 还支持导出一个返回 Promise 的函数，使用如下：

```js
module.exports = function(env = {}, argv) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        // ...
      });
    }, 5000);
  });
};
```

导出多份配置
除了只导出一份配置外，Webpack 还支持导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建。

注意本特性从 Webpack 3.1.0 版本才开始支持。

使用如下：

```js
module.exports = [
  // 采用 Object 描述的一份配置
  {
    // ...
  },
  // 采用函数描述的一份配置
  function() {
    return {
      // ...
    };
  },
  // 采用异步函数描述的一份配置
  function() {
    return Promise();
  }
];
```

以上配置会导致 Webpack 针对这三份配置执行三次不同的构建。

这特别适合于用 Webpack 构建一个要上传到 Npm 仓库的库，因为库中可能需要包含多种模块化格式的代码，例如 CommonJS、UMD。

---

配置总结
从前面的配置看来选项很多，Webpack 内置了很多功能。 你不必都记住它们，只需要大概明白 Webpack 原理和核心概念去判断选项大致属于哪个大模块下，再去查详细的使用文档。

通常你可用如下经验去判断如何配置 Webpack：

想让源文件加入到构建流程中去被 Webpack 控制，配置 entry。
想自定义输出文件的位置和名称，配置 output。
想自定义寻找依赖模块时的策略，配置 resolve。
想自定义解析和转换文件的策略，配置 module，通常是配置 module.rules 里的 Loader。
其它的大部分需求可能要通过 Plugin 去实现，配置 plugin。

---
