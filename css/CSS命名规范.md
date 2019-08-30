# CSS 命名规范

## BEM 命名规范

使用 BEM 命名规范，理论上讲，每行 css 代码都只有一个选择器。

BEM代表 “块（block）,元素（element）,修饰符（modifier）”,我们常用这三个实体开发组件。

在选择器中，由以下三种符号来表示扩展的关系：

```
-   中划线 ： 仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
__  双下划线：双下划线用来连接块和块的子元素
--  双中划线：双中划线用来描述一个块或者块的子元素的一种状态

type-block__element--modifier

例子1：
<!-- S Search Bar 模块 -->  // 开始标记
<div class="search-bar">
  <input class="search-form__input"/>
  <!-- / input 输入框子元素 -->
  <button class="search-form__button"></button>
  <!-- / button 搜索按钮子元素 -->
</div>
<!-- E Search Bar 模块 --> // 结束标记

例子2：
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>

.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```


这样命名的好处是，模块语义化了，便于后期的维护，而且减少了 CSS 样式的层层嵌套，提升了网页的渲染效率。

通常在开发中使用 BEM 命名方法，会搭配 CSS 的预处理语言，如 SCSS 等。这可以一定程度上解决手写冗长命名的繁琐。

```
// 以下是 SCSS 代码
.search-bar {
  &__input { ... } // 用  & 代替.search-bar
  &__button { ... }
}
```
