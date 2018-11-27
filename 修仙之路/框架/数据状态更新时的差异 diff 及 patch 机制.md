# 数据状态更新时的差异 diff 及 patch 机制

## 跨平台
Vue使用Virtual DOM，而Virtual DOM（虚拟DOM）是JavaScript对象，所以Vue具备跨平台能力。但是不同的平台，API不一样，Vue增加一层适配层，根据不同的平台（Weex，Web），调不同的API

## patch机制diff算法
diff过程是判断同层的树节点是否一致，运用两端比较的方法。所以时间复杂是O(n)，比较高效。

```js
    //diff算法伪代码
    let len = Math.max(oldVNodeNum, newVNodeNum);
    for(let i = 0; i < len; i++){
        if(!oldVNodeList[i]){
            //这种情况一般是增加了节点，新节点比旧节点多
            //这时直接插入新节点
        }else if(!newVNodeList[i]){
            //这种情况一般是删除了节点，旧节点比新节点多
            //这时直接删除久节点
        }else{
            if( sameVNode(oldVNodeList[i], newVModeList[i]) ){
                //节点一样，进行patchVnode过程
                //判断节点一样的逻辑：key，tag，同是注释节点，data同时定义或者同时不定义，如果是input标签，input type要一样
            }else{
                //节点不一样，替换旧节点
                replaceVNode(oldVNodeList[i], newVModeList[i])
            }
        }
    }
    
```

## patchVnode过程

```js
    //当节点一样时，进行patchVnode过程
    function patchVnode (oldVnode, vnode) {
        //新旧节点完全一样，不用处理
        if (oldVnode === vnode) {
            return;
        }

        //如果是同一个静态节点，只要复制旧节点的内容即可
        //静态节点的标识实在编译compile时的optimize阶段进行标识的
        if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
            vnode.elm = oldVnode.elm;
            vnode.componentInstance = oldVnode.componentInstance;
            return;
        }

        const elm = vnode.elm = oldVnode.elm;
        //旧节点孩子
        const oldCh = oldVnode.children;
        //新节点孩子
        const ch = vnode.children;

        if (vnode.text) {
            nodeOps.setTextContent(elm, vnode.text);
        } else {
            //情况1：新旧孩子都存在
            if (oldCh && ch) {
                //新旧节点孩子一样，不用处理
                if(oldCh === ch){
                    return
                }
                //新旧节点孩子不一样，更新孩子
                updateChildren(elm, oldCh, ch);
            } 
            //情况2：只有新节点有孩子，增加孩子节点即可
            else if (ch) {
                //如果旧节点是文本，要删除
                if (oldVnode.text) nodeOps.setTextContent(elm, '');
                //增加孩子节点
                addVnodes(elm, null, ch, 0, ch.length - 1);
            } 
            //情况3：只有旧节点有孩子，说明新节点没有孩子，所以只要把旧节点孩子删除即可
            else if (oldCh) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1)
            }
            //情况4：旧节点是文本节点，直接删除即可 
            else if (oldVnode.text) {
                nodeOps.setTextContent(elm, '')
            }
        }
    }
```
## 更新孩子过程updateChildren
