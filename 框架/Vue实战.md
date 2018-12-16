## Vue 相关

### 关于 vue.js

#### 关于 watch 和 computed

- 尽可能不要修改 wacth 和 computed 的值，避免造成死循环。
- wacth 想监听对象内部属性变化时，可以使用 deep：true 或者 换成字符串格式监听：obj.a -> 'obj.a'，推荐使用后者
- 当 app 里面的任意属性发生变化时，template 会重新渲染。当 template 是通过 computed 方法获取值时，只有 computed 监听的属性发生变化时，才会重新调用函数，否则 computed 会取缓存里面的值；当 template 是通过 methods 里面的方法获取值时，只要 app 的任意属性发生变化，都会调用函数。所以，template 相对于通过 methods 里面的方法获取值，通过 computed 获取值性能会更高。
- computed 里面定义的属性，如果在 template<font color="red">没有引用</font>，不会触发改属性的  监听

### 关于 vue-router

[参考 vue-router 官网](https://router.vuejs.org/zh/ "vue-router官网")

- vue-router 别名  
  /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。  
  “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。  
  上面对应的路由配置为：

```javascript
const router = new VueRouter({
  routes: [{ path: "/a", component: A, alias: "/b" }]
});
```

- 给 router-view 加上过渡 transition，使得路由跳转有过渡的效果

```html
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
```

- 路由传参的三种方法：

  1. /:id 通过 this.$route 获得
  2. 设置路由配置的 props 属性为 true，组件直接在 props 中获得,比如：props['id']
  3. 直接在组件中调用 this.$route.query

- vue-router 编程式导航

```javascript
  const userId = 123
  //通过name
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  //通过path
  router.push({ path: `/user/${userId}` }) // -> /user/123

  // query 带查询参数
  router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private

  注意：如果通过 path，参数params 会被忽略
```

- vue-router 命名视图：同一个页面有多个组件  来组成

```html
一种常见的布局：上左右布局

<router-view class="view header" name="header"></router-view>
<router-view class="view left" name="left"></router-view>
<router-view class="view right" name="main-content"></router-view>

不过这种布局也可以由一个组件组合其他多个组件来合成一个路由。看情况取舍。
```

- vue-router 导航守卫

  - 总共有三种模式

    - 全局守卫

    ```
      const router = new VueRouter({ ... })

      1. 全局前置守卫
      router.beforeEach((to, from, next) => {
        //do something
      })

      三个参数解释：

      to(type: Route): 即将要进入的目标 路由对象

      from(type: Route): 当前导航正要离开的路由

      next(type: Function): 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

            next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

            next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

            next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

            next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

      2. 全局解析守卫
      router.beforeResolve( (to, from, next) => {
        //导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，被调用
      } )

      3. 全局后置钩子
      router.afterEach((to, from) =>{
        // do something
      })
      不会接受next函数来改变导航
    ```

    -  路由独享的守卫：在配置路由时使用

    ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: "/foo",
          component: Foo,
          beforeEnter: (to, from, next) => {
            // do something
          }
        }
      ]
    });
    //beforeEnter: 接收的三个参数和全局接收的一样
    ```

    - 组件内守卫

    ```javascript
      const Foo = {
        template: `...`,
        beforeRouteEnter (to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 `this`
          // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 触发时间：带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 `this`
        },
        beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 `this`
        }
      }
      //注意⚠️ ：
      //1. beforeRouteEnter不能获取组件示例this，但是可以通过next来获取
        beforeRouteEnter( (to, from, next) => {
          next(vm => {
            vm.xxx
          })
        })

      //2. beforeRouteUpdate可以用于子路有发生变化时，数据请求，比如：工程id发生变化了。

      //3. beforeRouteLeave其中的一个用法是当用户填写表单没有保存数据点击离开时，可以询问用户是否要离开
        beforeRouteLeave (to, from, next) {
          let isConfirm =  window.confirm("Do you really want to leave, you have not saved your changes.");
          if(isConfirm){
            next();
          }else{
            next(false);
          }
        }
    ```

  - 导航守卫执行顺序
    大体流程：
    全局前置守卫 beforeEach -> 路由 beforeEnter -> 组件 beforeRouteEnter -> 全局解析守卫 beforeResolve -> 全局后置钩子 afterEach

    完整流程：

    1. 导航被触发。
    2. 在失活的组件里调用离开守卫。
    3. 调用全局的 beforeEach 守卫。
    4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。( 重用的组件才执行)
    5. 在路由配置里调用 beforeEnter。
    6. 解析异步路由组件。
    7. 在被激活的组件里调用 beforeRouteEnter。
    8. 调用全局的 beforeResolve 守卫 (2.5+)。
    9. 导航被确认。
    10. 调用全局的 afterEach 钩子。
    11. 触发 DOM 更新。
    12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

- 路由元信息
  定义路由的时候可以配置 meta 字段，可用于  判断该路由是否需要登录之类的

  ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          children: [
            {
              path: 'bar',
              component: Bar,
              // a meta field
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    })

    在全局前置守卫获取meta并判断处理
    router.beforeEach((to, from, next) => {
      if( to.meta.requiresAuth ) { //需要登录
        if( !isLogin ) { //没有登录，跳转到登录页面
          router.push({name: "login"});
          return;
        }
        next(); //已经登录直接往下执行
      }else{ //不需要登录直接往下执行
        next();
      }
    })
  ```

- 数据获取
  1. 导航完成后获取数据：在 created 生命周期中获取
  2. 导航进入之前获取：在 beforeRouteEnter 导航守卫中获取，如果是重用组件，可以在 beforeRouteUpdate 中更新数据
  ```javascript
  export default {
    data() {
      return {
        post: null,
        error: null
      };
    },
    beforeRouteEnter(to, from, next) {
      getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post));
      });
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate(to, from, next) {
      this.post = null;
      getPost(to.params.id, (err, post) => {
        this.setData(err, post);
        next();
      });
    },
    methods: {
      setData(err, post) {
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      }
    }
  };
  ```
- 滚动行为
  ```javascript
    const router = new VueRouter({
      routes: [...],
      scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // return {x:0, y:0} 回到顶部
      }
    })
  ```
- 路由懒加载： 把组件按组分块
  ```javascript
  const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
  const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
  const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
  ```

### 关于 vuex

[参考 Vuex 官网](https://vuex.vuejs.org/zh/ "Vuex官网")

#### 核心概念

```javascript
  const store = new Vuex.Store({
    //Vuex使用单一状态树🌲 ，使用一个对象来保存整个应用层级的状态。
    //state就是这个对象，state里面的属性会保存整个应用需要保存的状态。
    state: {
      count: 0,
      user: {
        name: 'zhangsan'
      }
    },
    //Getter其实跟state差不多，但state的数据格式之类的不太满足要求时，可以在getter中做一些处理再返回。比如：后台返回数据的再一次封装。
    getters: {
      doubleCount: state =>  state.count * 2,
      evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    },
    //用来更改state的值
    //必须是同步函数
    //遵守Vue的响应规则
    //使用commit来触发更改， store.commit('incrementWithN', 10);
    mutations: {
      //参数1: state
      //参数2: 一般是一个对象
      incrementWithN (state, n) {
        state.count += n
      },
      //当要更改state里面的对象的属性,比如：user的name属性，name要提前声明
      //要不得使用
      setUserName (state, name) {
        state.user.name = name;
      },
      //user的phone属性没有声明
      setUserPhone (state, phone) {
        Vue.set(state.user, 'phone', phone); //使用Vue.set设置
        //或者使用点语法
        state.user = {...state.user, 'phone': phone};
      }
    },
    //actions类似mutations，
    //不同点：
    //Action 提交的是 mutation，而不是直接变更状态；
    //Action 可以包含任意异步操作。
    //使用store.dispacth触发， store.dispacth('incrementWithNAsync', n)
    actions: {
      //context 可以用使用到的模块替换
      //incrementWithNAsync ({commit}, n) -> commit('incrementWithN', n)
      incrementWithNAsync (context, n) {
        //异步和触发mutation
        setTimeout( () => {
          context.commit('incrementWithN', n);
        }, 1000);
      },
      // 假设 getData() 和 getOtherData() 返回的是 Promise
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
  })
```

#### 模块化(待补充)

#### 辅助函数

- mapState
- mapGetters
- mapMutations
- mapActions

#### 项目结构

```
  ├── index.html
  ├── main.js
  ├── api
  │   └── ... # 抽取出API请求
  ├── components
  │   ├── App.vue
  │   └── ...
  └── store                 #
      ├── index.js          # 我们组装模块并导出 store 的地方
      ├── states            # states文件夹
      ├── getter            # getter
      ├── actions           # actions
      ├── mutations         # mutations
      └── modules
          ├── cart.js       # 购物车模块
          └── products.js   # 产品模块
```

#### 热重载

```javascript
  // store.js
  import Vue from 'vue'
  import Vuex from 'vuex'
  import mutations from './mutations'
  import moduleA from './modules/a'

  Vue.use(Vuex)

  const state = { ... }

  const store = new Vuex.Store({
    state,
    mutations,
    modules: {
      a: moduleA
    }
  })

  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutations', './modules/a'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newMutations = require('./mutations').default
      const newModuleA = require('./modules/a').default
      // 加载新模块
      store.hotUpdate({
        mutations: newMutations,
        modules: {
          a: newModuleA
        }
      })
    })
  }
```
