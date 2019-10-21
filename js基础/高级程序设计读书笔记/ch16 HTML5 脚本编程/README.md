# 第十六章 HTML5 脚本编程

### 16.1 跨文档消息传递
跨文档消息传递（cross-document messaging），简称 XDM，指的是在来自不同域的页面间传递消息。

XDM 的核心是 `postMessage()` 方法，该方法接收两个参数：消息和接收消息的文档所在的域。

接收到 XDM 消息时，会触发 window 对象的 message 事件。事件对象event 主要包含以下三方面的重要信息：
```
data : postMessage的第一个参数
origin： 发送消息的文档所在的域
source： 发送消息的文档的window对象的代理，这个代理一般只能调用 postMessage() 方法，其他属性不可以
```

例子：
```js
EventUtil.addHandler(window, "message", function(event){
    // 确保发送消息的域是已知的域
  if (event.origin == "http://www.wrox.com"){
    // 处理接收到的数据
    processMessage(event.data);
    // 可选：向来源窗口发送回执
    event.source.postMessage("Received!", "http://p2p.wrox.com"); 
  }
});
```

### 16.2 原生拖放

#### 16.2.1 拖放事件

拖放某元素时，依次触发一下事件：  
1）dragstart  
2）drag  
3）dragend

当某一个元素被拖到到一个有效的放置目标上时，依次触发以下事件：  
1）dragenter
2）dragover
3）dragleave 或 drop

#### 16.2.2 自定义放置目标
虽然所有的元素都支持放置目标事件，但是这些元素默认是不支持放置的。为了支持放置，可以重写 dragenter 和 dragover 事件的默认行为。

```js
var droptarget = document.getElementById("droptarget");
EventUtil.addHandler(droptarget, "dragover", function(event){ 
  EventUtil.preventDefault(event);
});
EventUtil.addHandler(droptarget, "dragenter", function(event){ 
  EventUtil.preventDefault(event);
});
```

#### 16.2.3 dataTransfer 对象
作用：拖放时进行数据交换。

主要有两个方法： `getData()` 和 `setData()`。`setData()`方法 第一个参数是 MIME类型，第二个参数是数据。`getData()`的参数是 MIME 参数。

```js
// 设置和接收文本数据
event.dataTransfer.setData("text/plain", "some text");
var text = event.dataTransfer.getData("text/plain"); 

 // 设置和接收 URL
event.dataTransfer.setData("text/uri-list", "http://www.wrox.com/"); 
var url = event.dataTransfer.getData("text/uri-list");
```

IE10 以前不支持 MIME，使用时请查看兼容性

#### 16.2.4 dropEffect 和 effectAllowed
这两个属性是 dataTransfer 对象的属性。通过 dropEffect 属性可以知道被拖动的元素能够执行哪种放置行为。effectAllowed 属性表示允许拖动元素的哪种 dropEffect。

#### 16.2.5 可拖动
默认情况下，图像、链接和文本（被选中的情况下）是可以拖动的。通过设置 dragable 属性为 true 可以让其他元素也可以拖动。

### 16.3 媒体元素
视频 `<video>` 和 音频 `<audio>`

```html
<!-- 嵌入视频 -->
<video src="conference.mpg" id="myVideo">Video player not available.</video>
<!-- 嵌入音频 -->
<audio src="song.mp3" id="myAudio">Audio player not available.</audio>
```

#### 16.3.1 属性

列举一些常用的属性：
```
autoplay : 布尔值，设置是否自动播放
controls ： 布尔值，设置是否显示内置控件
currentTime ： 已经播放的秒数
duration ： 媒体的总播放秒数
loop ： 是否循环播放
src ： 来源
```
其他详细属性请查看 [MDN文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

#### 16.3.2 事件

列举一些常用的事件
```
loadeddata 第一帧已经加载完成
loadedmetadata 媒体的元数据已加载完成
pause
play
......
```
其他详细属性请查看 [MDN文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

#### 16.3.3 自定义媒体播放器

借助 video 元素提供的属性和事件

```html
<div class="mediaplayer">
    <div class="video">
        <video id="player" src="movie.mov" poster="mymovie.jpg"
               width="300" height="200">
            Video player not available.
        </video>
    </div>
    <div class="controls">
        <input type="button" value="Play" id="video-btn">
        <span id="curtime">0</span>/<span id="duration">0</span>
    </div>
</div>
```

```js
// 取得元素的引用
var player = document.getElementById("player"),
    btn = document.getElementById("video-btn"),
    curtime = document.getElementById("curtime"),
    duration = document.getElementById("duration");

// 更新播放时间
duration.innerHTML = player.duration;

// 为按钮添加事件处理程序
EventUtil.addHandler(btn, "click", function(event){
    if (player.paused){
        player.play();
        btn.value = "Pause";
    } else {
        player.pause();
        btn.value = "Play";
    }
});
// 定时更新当前时间
setInterval(function(){
    curtime.innerHTML = player.currentTime;
}, 250);
```

#### 16.3.4 检测编解码器的支持情况
使用 `canPlayType()` 方法。
```js
if (audio.canPlayType("audio/mpeg")) {
  // 进一步处理
}
```


### 16.4 历史状态管理
前面13章，我们讲到。通过 hashchange 事件，可以知道 URL 的 hash 参数什么时候发生变化。MVVM 框架的路由的 hash 模式就是依赖这个来实现的。

现在来讲一下，MVVM 框架的路由的 history 模式的实现依赖。

主要有三点： 
```js
history.pushState(state, title, url); // 触发 popstate 事件

history.replaceState(state, title); // 不会触发 popstate 事件，只会重写当前的状态

popstate // 事件，通过监听 popstate，就可以判断路由发生变化，从而去更新页面内容
```
