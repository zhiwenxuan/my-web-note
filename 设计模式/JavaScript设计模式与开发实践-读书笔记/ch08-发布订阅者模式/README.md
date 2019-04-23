# 第八章 发布-订阅模式

## 定义

发布-订阅模式定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型来替代传统的发布-订阅模式。

## 现实中的发布-订阅模式

不论是在程序世界里还是现实生活中，发布—订阅模式的应用都非常之广泛。我们先看一个现实中的例子。

小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼 MM 告诉小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。 但到底是什么时候，目前还没有人能够知道。

于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除 了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼 MM 决定辞职，因为厌倦了每天回答 1000 个相同内容的电话。

当然现实中没有这么笨的销售公司，实际上故事是这样的:小明离开之前，把电话号码留在 了售楼处。售楼 MM 答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一 样，他们的电话号码都被记在售楼处的花名册上，新楼盘推出的时候，售楼 MM 会翻开花名册， 遍历上面的电话号码，依次发送一条短信来通知他们。

**好处：**

购房者不用再天天给售楼处打电话咨询开售时间，在合适的时间点，售楼处作为发布者 会通知这些消息订阅者。

购房者和售楼处之间不再强耦合在一起，当有新的购房者出现时，他只需把手机号码留 在售楼处，售楼处不关心购房者的任何情况，不管购房者是男是女还是一只猴子。 而售 楼处的任何变动也不会影响购买者，比如售楼 MM 离职，售楼处从一楼搬到二楼，这些 改变都跟购房者无关，只要售楼处记得发短信这件事情。

**代码实现：**

```js
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
};

salesOffices.trigger = function() {
  // 发布消息
  var key = Array.prototype.shift.call(arguments), // 取出消息类型
    fns = this.clientList[key]; // 取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) {
    // 如果没有订阅该消息，则返回
    return false;
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
  }
};

salesOffices.listen("squareMeter88", function(price) {
  // 小明订阅88 平方米房子的消息
  console.log("价格= " + price); // 输出： 2000000
});

salesOffices.listen("squareMeter110", function(price) {
  // 小红订阅110 平方米房子的消息
  console.log("价格= " + price); // 输出： 3000000
});

salesOffices.trigger("squareMeter88", 2000000); // 发布88 平方米房子的价格
salesOffices.trigger("squareMeter110", 3000000); // 发布110 平方米房子的价格
```

## 发布-订阅模式一个通用的实现

```js
var event = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments), // (1);
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      // 如果没有绑定对应的消息
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments); // (2) // arguments 是trigger 时带上的参数
    }
  },
  remove: function(key, fn) {
    var fns = this.clientList[key];
    if (!fns) {
      // 如果key 对应的消息没有被人订阅，则直接返回
      return false;
    }
    if (!fn) {
      // 如果没有传入具体的回调函数，表示需要取消key 对应消息的所有订阅
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        // 反向遍历订阅的回调函数列表
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1); // 删除订阅者的回调函数
        }
      }
    }
  }
};

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

// 测试
var salesOffices = {};
var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

installEvent(salesOffices);

salesOffices.listen(
  "squareMeter88",
  (fn1 = function(price) {
    // 小明订阅消息
    console.log("价格= " + price);
  })
);

salesOffices.listen(
  "squareMeter88",
  (fn2 = function(price) {
    // 小红订阅消息
    console.log("价格= " + price);
  })
);

salesOffices.remove("squareMeter88", fn1); // 删除小明的订阅
salesOffices.trigger("squareMeter88", 2000000); // 输出：2000000
```

## 一些应用

### 网站登录

假设我们的网站有 header 头部、nav 导航、消息列表、购物车等模块。这几个模块的渲染有一个共同的前提条件，必须先用 ajax 异步请求获取用户的登录信息。另外还有个问题，之后有可能新增模块也要用到登录信息。

#### 先看一个不好的实现：

```js
login.succ(function(data) {
  header.setAvatar(data.avatar); // 设置header 模块的头像
  nav.setAvatar(data.avatar); // 设置导航模块的头像
  message.refresh(); // 刷新消息列表
  cart.refresh(); // 刷新购物车列表
});
```

缺点：这些模块和用户信息模块产生了强耦合，之后再添加模块比较困难

比如：现在要增加一个收货地址管理的模块，这个模块是另外一位同事负责，他没法在登录后刷新地址信息，得叫负责用户信息模块的同事添加地址刷新的代码。如下：

```js
login.succ(function(data) {
  header.setAvatar(data.avatar);
  nav.setAvatar(data.avatar);
  message.refresh();
  cart.refresh();
  address.refresh(); // 增加这行代码
});
```

#### 运用发布订阅者来实现

```js
$.ajax("http:// xxx.com?login", function(data) {
  // 登录成功
  login.trigger("loginSucc", data); // 发布登录成功的消息
});

var header = (function() {
  // header 模块
  login.listen("loginSucc", function(data) {
    header.setAvatar(data.avatar);
  });
  return {
    setAvatar: function(data) {
      console.log("设置header 模块的头像");
    }
  };
})();

var nav = (function() {
  // nav 模块
  login.listen("loginSucc", function(data) {
    nav.setAvatar(data.avatar);
  });
  return {
    setAvatar: function(avatar) {
      console.log("设置nav 模块的头像");
    }
  };
})();

// 新增地址模块
var address = (function() {
  // 地址模块
  login.listen("loginSucc", function(obj) {
    address.refresh(obj);
  });
  return {
    refresh: function(avatar) {
      console.log("刷新收货地址列表");
    }
  };
})();
```

### 全局的发布-订阅模式

```js
var Event = (function() {
  var clientList = {},
    listen,
    trigger,
    remove;
  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function() {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };
  remove = function(key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  };
})();

Event.listen("squareMeter88", function(price) {
  // 小红订阅消息
  console.log("价格= " + price); // 输出：'价格=2000000'
});

Event.trigger("squareMeter88", 2000000); // 售楼处发布消息
```

### 模块间通信

比如现在有两个模块，a 模块里面有一个按钮，每次点击按钮之后，b 模块里的 div 中会显示 按钮的总点击次数，我们用全局发布—订阅模式完成下面的代码，使得 a 模块和 b 模块可以在保 持封装性的前提下进行通信。

```html
<html>
  <body>
    <button id="count">点我</button>
    <div id="show"></div>
  </body>
  <script type="text/JavaScript">
    var a = (function(){
    	var count = 0;
    	var button = document.getElementById( 'count' );
    	button.onclick = function(){
    		Event.trigger( 'add', count++ );
    	}
    })();
    var b = (function(){
    	var div = document.getElementById( 'show' );
    	Event.listen( 'add', function( count ){
    		div.innerHTML = count;
    	});
    })();
  </script>
</html>
```

但在这里我们要留意另一个问题，模块之间如果用了太多的全局发布—订阅模式来通信，那 么模块与模块之间的联系就被隐藏到了背后。我们最终会搞不清楚消息来自哪个模块，或者消息 会流向哪些模块，这又会给我们的维护带来一些麻烦，也许某个模块的作用就是暴露一些接口给 其他模块调用。

### 必须先订阅再发布吗

我们所了解到的发布—订阅模式，都是订阅者必须先订阅一个消息，随后才能接收到发布者 发布的消息。如果把顺序反过来，发布者先发布一条消息，而在此之前并没有对象来订阅它，这 条消息无疑将消失在宇宙中。

在某些情况下，我们需要先将这条消息保存下来，等到有对象来订阅它的时候，再重新把消 息发布给订阅者。就如同 QQ 中的离线消息一样，离线消息被保存在服务器中，接收人下次登录 上线之后，可以重新收到这条消息。

这种需求在实际项目中是存在的，比如在之前的商城网站中，获取到用户信息之后才能渲染 用户导航模块，而获取用户信息的操作是一个 ajax 异步请求。当 ajax 请求成功返回之后会发布 一个事件，在此之前订阅了此事件的用户导航模块可以接收到这些用户信息。

但是这只是理想的状况，因为异步的原因，我们不能保证 ajax 请求返回的时间，有时候它返 回得比较快，而此时用户导航模块的代码还没有加载好(还没有订阅相应事件)，特别是在用了 一些模块化惰性加载的技术后，这是很可能发生的事情。也许我们还需要一个方案，使得我们的 发布—订阅对象拥有先发布后订阅的能力。

为了满足这个需求，我们要建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还 没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被 存入堆栈中，等到终于有对象来订阅此事件的时候，我们将遍历堆栈并且依次执行这些包装函数， 也就是重新发布里面的事件。当然离线事件的生命周期只有一次，就像 QQ 的未读消息只会被重 新阅读一次，所以刚才的操作我们只能进行一次。
