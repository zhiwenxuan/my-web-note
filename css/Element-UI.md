### Element UI

#### el-popover

如果依赖的 dom 节点在它本身渲染之后出现，el-popover 将找不到相对定位的点，视图 则会出现在左上角。  
 可能导致的场景：使用 v-if，一开始有依赖 dom 节点，后来 dom 节点清除掉，然而 el-popover 只是设置为 display:none。当 dom 节点 v-if 的条件再次为true 时，el-popover 的渲染 会比它依赖的 dom 节点快。（具体原因有待深究）
