## CSS

### 一些有趣属性收集

[所有属性集](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

```
background-clip：设置元素的背景（背景图片或颜色）是否延伸到边框下面。
  background-clip: border-box
  background-clip: padding-box
  background-clip: content-box
  background-clip: inherit

background-origin： 规定了指定背景图片background-image 属性的原点位置的背景相对区域.

border-image： CSS属性允许在元素的边框上绘制图像

calc() ： 你就可以通过计算来决定一个CSS属性的值

inherit：继承

initial : 是将属性的初始值( initial value)赋给元素

:invalid ： CSS 伪类 表示任意内容未通过验证的 <input> 或其他 <form> 元素
  /* 可选定任意无效的<input> */
  input:invalid {
    background-color: pink;
  }

filter： CSS滤镜，提供的图形特效，像模糊，锐化或元素变色。过滤器通常被用于调整图片，背景和边界的渲染。

linear-gradient() : 此函数用于创建一个表示两种或多种颜色线性渐变的图片

mask: 允许使用者通过部分或者完全隐藏一个元素的可见区域

:read-only : 伪类 表示元素不可被用户编辑的状态（如锁定的文本输入框）

transform : 允许你修改CSS视觉格式模型的坐标空间。使用它，元素可以被转换（translate）、旋转（rotate）、缩放（scale）、倾斜（skew)

transition: 过渡



```

### 去除所有情况下 a 标签的下划线

```css
a {
  text-decoration: none;
}
a:hover,
a:visited,
a:link {
  text-decoration: none;
}
```

### position：static/absolute/relative

- static: 默认值，无特殊定位，对象遵循 HTML 原则;
- absolute:  
   绝对定位，将对象从文档流中拖离出来，使用 left/right/top/bottom 等属性相对其最接近的一个并有定位设置的父元素进行绝对定位;若没有父元素，则以 html、body，浏览器的位置为相对位置，而其层叠通过 z-index 属性定义;
- relative:  
   相对定位，对象不可层叠，将依据 right，top，left，bottom（相对定位）等属性在正常文档流中偏移位置(相对于谁呢？相对于它自己本身，即是在原来位置上偏移，而且注意原有位置就是在保留的);

### 隐藏多余溢出文字并显示省略号的样式

```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

### a 标签点击失效

可能的原因是层级问题，被覆盖，解决办法设置定位 position:relative 和 z-index

### :hover 改变其他元素样式时，只对子元素和相邻的兄弟元素有作用



### css 匹配规则

[CSS 选择器从右向左的匹配规则](http://www.cnblogs.com/zhaodongyu/p/3341080.html)
