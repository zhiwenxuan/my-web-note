记录web前端学习的收获

####### 2017.06.23 ##########  
1. 获取标签宽度  
   HTMLElement.offsetWidth  
   [参考链接](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth "获取标签宽度")  

2. jQuery点击事件失效  
   + 使用 $("#id").click(function(){ }); 有时会失效  
     原因：  
     直接将事件绑定在#id元素上，如果#id元素在绑定后生成，则不会触发改事件  
   + 推荐使用以下形式    

   	```javascript
     $(document).on('click','#id',function(){  
        console.log('document');  
     });  
	```

     原因：  
     将事件绑定在document DOM树下，当事件到达#id元素时，事件程序被执行，由于是从整个document下寻找的，可以保证事件被触发  
     [参考链接](https://stackoverflow.com/questions/14879168/document-onclick-id-function-vs-id-onclick-function "jQuery $(#id).click 和 $(document).on(click,#id,function(){ })区别")  
3. 去除所有情况下a标签的下划线  

	```css
   	a {   text-decoration: none;  }  
   	a:hover, a:visited, a:link {  text-decoration: none; }  
   ```

4. position：static/absolute/relative  
   + static: 默认值，无特殊定位，对象遵循HTML原则;  
   + absolute:   
	 绝对定位，将对象从文档流中拖离出来，使用left/right/top/bottom等属性相对其最接近的一个并有定位设置的父元素进行绝对定位;若没有父元素，则以html、body，浏览器的位置为相对位置，而其层叠通过z-index属性定义;  
   + relative:  
	 相对定位，对象不可层叠，将依据right，top，left，bottom（相对定位）等属性在正常文档流中偏移位置(相对于谁呢？相对于它自己本身，即是在原来位置上偏移，而且注意原有位置就是在保留的);	  
5. 隐藏多余溢出文字并显示省略号的样式  
	```css
    overflow: hidden;  
    white-space: nowrap;  
    text-overflow: ellipsis;   
    ```
6. a标签点击失效，可能的原因是层级问题，被覆盖，解决办法设置定位position:relative和z-index  
7. :hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用   
8. if语句为false的几种情况：  
  数字 0   
  非数字 NaN   
  空字符串 ''   
  空指针 null  
  没有定义 undefined  
  false本身   
9. js发生异步的情况：需要等待  [博客整理](http://blog.csdn.net/lizhenqii/article/details/77806681 "博客整理")  
	等待的场景有：

		- 定时任务：setTimeout, setInterval  
		- 网络请求：ajax请求，图片img加载等  
		- 事件绑定  

10. 防止浏览器缓存  
	链接加上一个随机数，比如js中用Math.random()  
11. DOM的property和Attribute区别  
	- property是js中对象中的标准属性,DOM.className  
	- Attribute是标签文档中的属性,比如DOM.getAttribute('href')  
12. 给标签添加自定义属性，需要在前面加上'data-'，比如：

	```html
	<a data-mid='2'>加上一个mid自定义属性</a>
	```
13. BOM常见操作  
	1. 判断浏览器类型navigator  

	```javascript
	var ua = navigator.userAgent
	var isChrome = ua.indexOf('Chrome')
	console.log(isChrome)
	```
	2. 获取屏幕宽高screen  

	```javascript
	screen.width
	screen.height
	```
	3. 拆解url各个部分location  
	http://coding.xuan.com/lesson/115.html?id=1#mid=5390  

	```javascript
	location.href //获取整一个连接
	location.protocol //协议类型 http
	location.hash //如 #mid=5390 
	location.search // 获取查询部分，如 ?id=1
	location.pathname // 'lesson/115.html'
	```
	4. 页面回退与前进 history  
	
	```javascript
	history.back()
	history.forward()
	```
14. js获取随机数，要求长度一致的字符串格式  
	
	```javascript
	var random = Math.random() + '0000000000' //使用Math random 获取随机数，再加上10位0
	var random = random.slice(0,10) //截取前10位

	```
15. 使用XMLHttpRequest写一个简单的ajax请求(暂未兼容IE) [可参考文章]("http://blog.csdn.net/liujiahan629629/article/details/17126727" "可参考文章")   

	```javascript

	xhr = new XMLHttpRequest() //新建对象
	xhr.open('GET', '/api', false) //初始化请求
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4){ //请求完成
			if(xhr.status === 200){ //服务器返回状态码
				window.alert(xhr.responseText)
			}
		}
	}
	xhr.send(null)

	```
	状态码readyState说明  

	 - 0 - (未初始化）还没有调用send()方法   
	 - 1 -（载入）已调用send()方法，正在发送请求   
	 - 2 - (载入完成) send方法执行完成，已经接受请求的全部内容  
	 - 3 - (交互) 正在解析交互内容  
	 - 4 - (完成) 解析内容完成，客户端可以调用  

16. 服务器状态码
	
	 - 2xx - 请求成功，如200
	 - 3xx - 需要重定向，服务器直接跳转
	 - 4xx - 客户端请求错误，如：找不到请求资源 404
	 - 5xx - 服务器端错误

17. 跨域
	
	 - 跨域原因：浏览器有同源策略，不执行其他源网站的脚本  
	 - 同源条件：协议、域名、端口都要相同  
	 - 允许跨域加载资源的三个标签
	 	 - <img src= "xxx">
	 	 - <link href= "xxx">
	 	 - <script src= "xxx"></script>
 	 - 所有的跨域请求都必须经过信息提供方允许
 	 - 解决跨域的两种方法  [可参考文章]("http://blog.csdn.net/liujiahan629629/article/details/17126727" "可参考文章")  
 	 	- jsonp 利用<script>标签中src属性能够跨域访问的特性，先定义了一个回调方法，然后将其当作url参数的一部分发送到服务端，服务端通过字符串拼接的方式将数据包裹在回调方法中，再返回回来
 	 	- 服务器端设置 http header

18. cookie 和 sessionStorage localStorage区别
	
	 - 容量：cookie大小只有4KB，sessionStorage和localStorage有5MB
	 - 请求携带：所有http请求都要到上cookie，影响效率
	 - API易用性：cookie简单，需要封装，document.cookie = …
           其他两个简单易用，如localStorage.getItem(key) localStorage.setItem(key, value)









    



