记录web前端学习的收获

/****2017.06.23****/  
1.获取标签高度  
HTMLElement.offsetWidth
[参考链接](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth "获取标签高度")  

2.jQuery点击事件失效，使用以下格式  
$(document).on('click','.a_test',function(){  
    console.log('document');  
});  
[参考链接](http://www.chenglin.name/web/js-web/484.html "jQuery点击事件失效")  

3.去除所有情况下a标签的下划线  
a{  
   text-decoration: none;  
}  
a:hover,a:visited,a:link{  
   text-decoration: none;  
}  
  
