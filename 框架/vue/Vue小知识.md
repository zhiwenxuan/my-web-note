#Vue 小知识

## 关于实战

### is

is 特性可以用来指定当前的组件。在不同组件之间进行动态切换是非常有用的。

值： string(已经注册的组件名) | Object (组件的选项对象)

```js
<component v-bind:is="currentTabComponent" class="tab" />;

Vue.component("tab-home", {
  template: "<div>Home component</div>"
});
Vue.component("tab-posts", {
  template: "<div>Posts component</div>"
});
Vue.component("tab-archive", {
  template: "<div>Archive component</div>"
});

new Vue({
  el: "#dynamic-component-demo",
  data: {
    currentTab: "Home",
    tabs: ["Home", "Posts", "Archive"]
  },
  computed: {
    currentTabComponent: function() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  }
});
```
