# nuxt.js 静态化实践

### 1. 动态路由
**使用 `query` 来代替动态变化的参数**

#### 关于AWS S3 和 CloudFront 配套设施问题

##### 1）S3 子目录静态索引失效，导致刷新找不到对应的文件

解决方案：  
配置 cloudfront 时， `Origin Domain Name` 要指向桶的 `static domain`, 参考如下： 

`There IS a way to do this. Instead of pointing it to your bucket by selecting it in the dropdown (www.example.com.s3.amazonaws.com), point it to the static domain of your bucket (eg. www.example.com.s3-website-us-west-2.amazonaws.com)`
[详细链接](https://stackoverflow.com/questions/31017105/how-do-you-set-a-default-root-object-for-subdirectories-for-a-statically-hosted)

另外一个重要的注意点：
路由参数最后要带上 `/`，要不刷新时，URL 的 query 参数会丢失。 如：`project/boundary/?projectId=1000878`, 而不是`project/boundary?projectId=1000878`

### 2. 环境变量处理

使用 `cross-env` 插件在 `package.json` 注入 `MODE` 变量来区分不同的环境，比如：dev、stag、prod。然后新建一个 `env.js` 文件来定义不同环境的各种变量。之后在 `nuxt.config.js` 的 `env` 选项根据 `MODE` 的值来引入。

#### 示例

```js
// package.json
{
  "scripts": {
    "dev": "cross-env MODE=dev nuxt",
    "build:stag": "cross-env MODE=stag nuxt generate",
    "build:prod": "cross-env MODE=prod nuxt generate"
  }
}

// dev.js 新建的文件
export default {
  dev: {
    MODE: 'dev',
    BaseURL: 'localhost'
  },
  stag: {
    MODE: 'stag',
    BaseURL: 'https://test.domain.com'
  },
  prod: {
    MODE: 'prod',
    BaseURL: 'https://www.domain.com'
  }
}

// nuxt.config.js
import env from './env'
const devModeName = 'dev';

export default {
  env: {
    // 判断是否存在 MODE 环境变量，存在话，根据MODE变量取值，否则取开发环境的值
    BaseURL: process.env.MODE ? env[process.env.MODE].BaseURL : env[devModeName].BaseURL
  }
}

// 优化 nuxt.config.js 取值方式，遍历取值dev.js 文件来取值，不用每次都要在 nuxt.config.js 文件中定义
// 不足： env.js 文件各个环境的 key 的定义要保持一致且要同时存在
import env from './env'
const devModeName = 'dev';
const envObject = {};
Object.keys(env[devModeName]).forEach(item => {
  // 判断是否存在 MODE 环境变量，存在话，根据MODE变量取值，否则取开发环境的值
  envObject[item] = process.env.MODE ? env[process.env.MODE][item] : env[devModeName][item]
})

export default {
  env: envObject
}
```

### 3. 关于路由

#### 路由拓展
1. 404 页面拓展  
2. 路由拦截  

在`nuxt.config.js` 配置如下：
```js
{
  router: {
    // 拓展 404 页面
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Error',
        path: '*',
        component: resolve(__dirname, 'pages/404/index.vue')
      })
    },
    // 配置路由拦截中间件
    middleware: 'route-interceptor'
  }
}
```

### 4. 其他
有待补充或者可以看[文档](https://nuxtjs.org/guide)。
