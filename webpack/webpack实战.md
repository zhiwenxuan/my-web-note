# Webpack 实战

本文主要讲 Webpack 在一些应用场景下的配置，如：ES6，SCSS，Vue，React 等等。希望对大家有帮助！

## ES6

使用 babel-loader, 可以将 ES6 源码转为 ES5

### 安装

```s
npm i -D babel-core babel-loader
```

### 实例

```js
const path = require("path");

module.exports = {
  // JS 执行入口文件
  entry: "./main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  },
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
```

## TypeScript

使用 awesome-typescript-loader, 可以将 TypeScript 源码转为 JavaScript， 另外还要将 TypeScript 文件设为首先寻找的模块文件

### 安装

```s
npm i -D typescript awesome-typescript-loader
```

### 实例

```js
const path = require("path");

module.exports = {
  // 执行入口文件
  entry: "./main",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    // 先尝试 ts 后缀的 TypeScript 源码文件
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  devtool: "source-map" // 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

## SCSS

使用 sass-loader, 可以将 SCSS 源码转为 CSS

### 安装

```s
# 安装 Webpack Loader 依赖
npm i -D  sass-loader css-loader style-loader
# sass-loader 依赖 node-sass
npm i -D node-sass
```

### 实例

```js
const path = require("path");

module.exports = {
  // JS 执行入口文件
  entry: "./main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader, css-loader, sass-loader"] // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
      }
    ]
  },
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
```

1. 通过 sass-loader 把 SCSS 源码转换为 CSS 代码，再把 CSS 代码交给 css-loader 去处理。

2. css-loader 会找出 CSS 代码中的 @import 和 url() 这样的导入语句，告诉 Webpack 依赖这些资源。同时还支持 CSS Modules、压缩 CSS 等功能。处理完后再把结果交给 style-loader 去处理。

3. style-loader 会把 CSS 代码转换成字符串后，注入到 JavaScript 代码中去，通过 JavaScript 去给 DOM 增加样式。如果你想把 CSS 代码提取到一个单独的文件而不是和 JavaScript 混在一起，可以使用 ExtractTextPlugin。

## PostCSS

使用 sass-loader, 可以将 SCSS 源码转为 CSS

### 安装

```s
# 安装 Webpack Loader 依赖
npm i -D postcss-loader css-loader style-loader
# 根据你使用的特性安装对应的 PostCSS 插件依赖
npm i -D postcss-cssnext
```

### 实例

```js
const path = require("path");

module.exports = {
  // JS 执行入口文件
  entry: "./main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader, css-loader, sass-loader"] // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
      }
    ]
  },
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
```

还得新建 postcss.config.js 文件，内容如下：

```js
module.exports = {
  plugins: [
    // 需要使用的插件列表
    require("postcss-cssnext")
  ]
};
```

## Vue

使用 vue-loader

### 安装

```s
# Vue 框架运行需要的库
npm i -S vue
# 构建所需的依赖
npm i -D vue-loader css-loader vue-template-compiler
```

### 实例

```js
const path = require("path");

module.exports = {
  // JS 执行入口文件
  entry: "./main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  },
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
```

## React

### Babel 项目中

要在使用 Babel 的项目中接入 React 框架是很简单的，只需要加入 React 所依赖的 Presets babel-preset-react。

### 安装

```s
# 安装 React 基础依赖

npm i -D react react-dom

# 安装 babel 完成语法转换所需依赖

npm i -D babel-preset-react
```

安装新的依赖后，再修改 .babelrc 配置文件加入 React Presets

```js
"presets": [
    "react"
],
```

### 在 TypeScript 项目中

TypeScript 相比于 Babel 的优点在于它原生支持 JSX 语法，你不需要重新安装新的依赖，只需修改一行配置。 但 TypeScript 的不同在于：

使用了 JSX 语法的文件后缀必须是 tsx。
由于 React 不是采用 TypeScript 编写的，需要安装 react 和 react-dom 对应的 TypeScript 接口描述模块 @types/react 和 @types/react-dom 后才能通过编译。
接下来通过修改 3-2 使用 TypeScript 语言中讲过的的项目，为其接入 React 框架。 修改 TypeScript 编译器配置文件 tsconfig.json 增加对 JSX 语法的支持，如下：

```json
{
  "compilerOptions": {
    "jsx": "react" // 开启 jsx ，支持 React
  }
}
```

由于 main.js 文件中存在 JSX 语法，再把 main.js 文件重命名为 main.tsx，同时修改文件内容为在上面 React 与 Babel 里所采用的 React 代码。 同时为了让 Webpack 对项目里的 ts 与 tsx 原文件都采用 awesome-typescript-loader 去转换， 需要注意的是 Webpack Loader 配置的 test 选项需要匹配到 tsx 类型的文件，并且 extensions 中也要加上 .tsx，配置如下：

```js
const path = require("path");

module.exports = {
  // TS 执行入口文件
  entry: "./main",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  devtool: "source-map" // 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

通过

```s
npm i react react-dom @types/react @types/react-dom
```

安装新的依赖后重启构建，重新打开网页即可。

## 图片

url-loader 会把根据图片内容计算出的 base64 编码的字符串直接注入到代码中，由于一般的图片数据量巨大， 这会导致 JavaScript、CSS 文件也跟着变大。 所以在使用 url-loader 时一定要注意图片体积不能太大，不然会导致 JavaScript、CSS 文件过大而带来的网页加载缓慢问题。

一般利用 url-loader 把网页需要用到的小图片资源注入到代码中去，以减少加载次数。因为在 HTTP/1 协议中，每加载一个资源都需要建立一次 HTTP 链接， 为了一个很小的图片而新建一次 HTTP 连接是不划算的。

url-loader 考虑到了以上问题，并提供了一个方便的选择 limit，该选项用于控制当文件大小小于 limit 时才使用 url-loader，否则使用 fallback 选项中配置的 loader。 相关 Webpack 配置如下：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 30KB 以下的文件采用 url-loader
              limit: 1024 * 30,
              // 否则采用 file-loader，默认值就是 file-loader
              fallback: "file-loader"
            }
          }
        ]
      }
    ]
  }
};
```

## SVG

### 当图片处理

直接把 SVG 文件当成一张图片来使用，方法和使用图片时完全一样。 使用 file-loader 和 使用 url-loader 对 SVG 来说同样有效，只需要把 Loader test 配置中的文件后缀改成 .svg，代码如下：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 30KB 以下的文件采用 url-loader
              limit: 1024 * 30,
              // 否则采用 file-loader，默认值就是 file-loader
              fallback: "file-loader"
            }
          }
        ]
      }
    ]
  }
};
```

### 使用 raw-loader

raw-loader 可以把文本文件的内容读取出来，注入到 JavaScript 或 CSS 中去。

例如在 JavaScript 中这样写：

```js
import svgContent from "./svgs/alert.svg";
```

经过 raw-loader 处理后输出的代码如下：

```js
module.exports = '<svg xmlns="http://www.w3.org/2000/svg"... </svg>'; // 末尾省略 SVG 内容
```

也就是说 svgContent 的内容就等于字符串形式的 SVG，由于 SVG 本身就是 HTML 元素，在获取到 SVG 内容后，可以直接通过以下代码将 SVG 插入到网页中：

```js
window.document.getElementById("app").innerHTML = svgContent;
```

使用 raw-loader 时相关的 Webpack 配置如下：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["raw-loader"]
      }
    ]
  }
};
```

由于 raw-loader 会直接返回 SVG 的文本内容，并且无法通过 CSS 去展示 SVG 的文本内容，因此采用本方法后无法在 CSS 中导入 SVG。  
也就是说在 CSS 中不可以出现 `background-image: url(./svgs/activity.svg)` 这样的代码，因为 `background-image: url(<svg>...</svg>)` 是不合法的。

## 后记
这只是 Webpack 实战的一部分，其他有待补充。本文主要参考[深入浅出 Webpack](http://webpack.wuhaolin.cn/)。
