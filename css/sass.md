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

- 变量 \$:  
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
