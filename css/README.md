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

### sass 学习笔记

- Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器

```css
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}

编译为 #main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```

- 父选择器 &: 代表嵌套规则外层的父选择器

```css
a {
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  body.firefox & {
    font-weight: normal;
  }
}

编译为 a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
body.firefox a {
  font-weight: normal;
}
```

- 属性嵌套: CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中

```css
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

编译为:  

  .funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

- 注释： Sass 支持标准的 CSS 多行注释 /\* \*/，以及单行注释 //，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会

- 变量 $:  
  变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 !global 声明。  
  可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```
  $width: 5em;

  直接使用即调用变量：

  #main {
    width: $width;
  }
```

- 数据类型: 支持 6 种主要的数据类型

```
  数字，1, 2, 13, 10px
  字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
  颜色，blue, #04a3f9, rgba(255,0,0,0.5)
  布尔型，true, false
  空值，null
  数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
  maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
```

- 运算

1. 数字运算
2. 颜色值运算
3. 字符串运算
4. 布尔运算

- 函数

- 插值语句 #{}: 通过 #{} 插值语句可以在选择器或属性名中使用变量

```css
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
编译为 p.foo {
  border-color: blue;
}
```

- @extend 引用另一个类的样式

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}

-- > .error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

- 控制指令: @if @for @each @while

- 混合指令 (Mixin Directives)
  混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 .float-left。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

1. 定义混合指令 @mixin

```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

2. 引用混合样式 @include

```css
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

3. 参数

```css
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue, 1in);
}
```

### Element UI

#### el-popover

如果依赖的 dom 节点在它本身渲染之后出现，el-popover 将找不到相对定位的点，视图  则会出现在左上角。  
 可能导致的场景：使用 v-if，一开始有依赖 dom 节点，后来 dom 节点清除掉，然而 el-popover 只是设置为 display:none。当 dom 节点 v-if 的条件再次为 true 时，el-popover 的渲染  会比它依赖的 dom 节点快。（ 具体原因有待深究）
