# 第六章 代理模式

## 定义

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

代理模式是一种非常有意义的模式，在生活中可以找到很多代理模式的场景。比如，明星都有经纪人作为代理。如果想请明星来办一场商业演出，只能联系他的经纪人。经纪人会把商业演 出的细节和报酬都谈好之后，再把合同交给明星签。

代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身 对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之 后，再把请求转交给本体对象。

## 一个小例子

小明送花给女神 A，通过 B 来送，B 就是代理

```js
var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};

var B = {
  receiveFlower: function(flower) {
    A.receiveFlower(flower);
  }
};

var A = {
  receiveFlower: function(flower) {
    console.log(flower);
  }
};

xiaoming.sendFlower();
```

## 虚拟代理实现图片预加载

在 Web 开发中，图片预加载是一种常用的技术，如果直接给某个 img 标签节点设置 src 属性， 由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。常见的做法是先用一张 loading 图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到 img 节点里，这种 场景就很适合使用虚拟代理。

现在开始引入代理对象 proxyImage，通过这个代理对象，在图片被真正加载好之前，页面中
将出现一张占位的菊花图 loading.gif, 来提示用户图片正在加载。代码如下:

```js
var myImage = (function() {
  var imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  };
})();

var proxyImage = (function() {
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function(src) {
      myImage.setSrc("file:// /C:/Users/svenzeng/Desktop/loading.gif");
      img.src = src;
    }
  };
})();

proxyImage.setSrc("http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg");
```

现在我们通过 proxyImage 间接地访问 MyImage。proxyImage 控制了客户对 MyImage 的访问，并 且在此过程中加入一些额外的操作，比如在真正的图片加载好之前，先把 img 节点的 src 设置为 一张本地的 loading 图片。

## 虚拟代理合并 HTTP 请求

通过一个代理函数 proxySynchronousFile 来收集一段时间之内的请求， 最后一次性发送给服务器。比如我们等待 2 秒之后才把这 2 秒之内的请求发给 服务器.

## 缓存代理

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

例子：

1. 计算乘积
2. 缓存代理用于 ajax 异步请求数据：我们在常常在项目中遇到分页的需求，同一页的数据理论上只需要去后台拉取一次，这些已经拉取到的数据在某个地方被缓存之后，下次再请求同一页的时候，便可以直接使用之前的数据。

## 小结

代理模式包括许多小分类，在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。
