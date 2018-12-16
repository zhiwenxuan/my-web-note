### 从输入 url 到看到页面的详细过程

主要有两个过程

1. 加载资源的过程 
    1. 浏览器根据域名从 DNS 服务器获取 IP 地址 
    2. 向该 IP 地址的机器发送 http 请求 
    3. 服务器收到请求，返回数据 
    4. 浏览器接受返回的数据

2. 渲染页面的过程 
    1. 根据 html 渲染成 DOM Tree，只是 DOM 节点结构，还没有样式 
    2. 根据 css 渲染成 CSSOM 
    3. 将 DOM Tree 和 CSSOM 整合成渲染树 RenderTree，既有结构，又有样式 
    4. 浏览器根据 RenderTree 展示页面
    5.  遇到 script 会发生阻塞，先执行 JavaScript 的内容，因为 js 可以改变 DOM 节点和结构  

    备注：第 1、2、3 步没有固定顺序，如果已经渲染 CSSOM，在渲染 html 时，会即时渲染成 RenderTree