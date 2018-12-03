# 第二章 在HTML中使用JavaScript

## `<script>`标签属性
src: 可选，表示包含要执行代码的外部文件   
async: 可选，异步加载外部脚本，不阻塞，加载完后阻塞执行   
defer：可选，异步加载外部脚本，等文档完全被解析和显式后才执行  
charset： 可选，指定代码字符集，几乎很少用  
language： 可选，已丢弃  
type： 可选，表示脚本语言的内容类型，默认‘text/javascript’，其他类型很少用  

总结： 主要关注async和defer的使用
