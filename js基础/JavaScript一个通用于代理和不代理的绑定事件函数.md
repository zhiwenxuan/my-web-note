这篇文章主要关于js一个通用的绑定事件函数。绑定事件在我们开发的过程中会经常用到。写一个通用的函数是很必要的。  

这里先讲一下代理。如一下代码，ul中有很多个li，而且li还有可能增加。如果要为每个li添加一个点击事件，操作起来将比较麻烦，代码量大不简洁，占内存。这时可以将事件代理到ul上，当点击li时，由于事件冒泡，ul上也起作用，之后再判断是点击那个li即可。
```
<ul id="uid">
	<li id="id1">id1</li>
	<li id="id2">id2</li>
	<li id="id3">id3</li>
	<li id="id4">id4</li>
	<li id="id5">id5</li>
	...
</ul>
```
这里也可以提一下，事件的代理的好处是：代码简洁和减少浏览器内存占用。

说完了事件代理，下面来到本文章的重点，通用绑定事件函数。废话不多说，直接上代码。

```
 /**
	 * 一个通用代理和不代理的绑定事件函数
	 * @param  {[type]}   elme     [要绑定事件元素]
	 * @param  {[type]}   type     [事件类型]
	 * @param  {Function} fn       [处理函数]
	 * @param  {[type]}   selector [可选参数，要代理事件的元素]
	 * @return {[type]}            [无]
	 */
	function bindEvent(elme, type, fn, selector){

		elme.addEventListener(type, function(e){
			var target;
			if(selector){//使用代理
				target = e.target;//获取触发事件的元素
				if(target.mathchs(selector)){
					fn.call(target,e);
				}
			}else{
				fn(e);
			}

		});
	}
```
函数比较简单，就不多解释。下面运用这个通用函数，写两个例子。

```
    //使用代理，为每一个li将点击事件代理在父级元素ul上
	var ul = document.getElementById('uid');
	bindEvent(ul, 'click', function(e){
		console.log(this.innerHTML);
	},'li');

	//不使用代理
	var l1 = document.getElementById('id1');
	bindEvent(l1, 'click', function(e){
		console.log(l1.innerHTML);
	});
```

这篇文章就到这了，记录学习心得，如有错误，恳请指正！  
