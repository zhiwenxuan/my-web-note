# Vue 模板compile编译过程
Vue 模板编译主要有三个阶段：解析parse、优化optimize、生成generate

## 解析parse
parse 用正则等方式将 template 模板中进行字符串解析，得到指令、class、style等数据，形成 AST（抽象语法树）。  

AST结构如下：
```js
{
    /* 标签属性的map，记录了标签上属性 */
    'attrsMap': {
        ':class': 'c',
        'class': 'demo',
        'v-if': 'isShow'
    },
    /* 解析得到的:class */
    'classBinding': 'c',
    /* 标签属性v-if */
    'if': 'isShow',
    /* v-if的条件 */
    'ifConditions': [
        {
            'exp': 'isShow'
        }
    ],
    /* 标签属性class */
    'staticClass': 'demo',
    /* 标签的tag */
    'tag': 'div',
    /* 子标签数组 */
    'children': [
        {
            'attrsMap': {
                'v-for': "item in sz"
            },
            /* for循环的参数 */
            'alias': "item",
            /* for循环的对象 */
            'for': 'sz',
            /* for循环是否已经被处理的标记位 */
            'forProcessed': true,
            'tag': 'span',
            'children': [
                {
                    /* 表达式，_s是一个转字符串的函数 */
                    'expression': '_s(item)',
                    'text': '{{item}}'
                }
            ]
        }
    ]
}

```

## 优化optimize
这个过程主要为每个节点添加static属性，来标记是否是静态节点。为之后的patch过程可以跳过这些静态节点，不需要做diff比较。

## 生成generate
主要将AST生成render function 字符串