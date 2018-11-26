/*
 * @Author: zhenqi.li
 * @Email: lizq0604@gmail.com
 * @Date: 2018-11-26 15:23:37
 * @LastEditors: zhenqi.li
 * @LastEditTime: 2018-11-26 17:44:33
 * @Description: 
 */

 // 设计思路
 // 1. Vue类
 // 2. 总体监听的入口函数
 // 3. 设置属性响应的工具函数
 // 4. setter响应回调,更新视图

/**
 * @Description: 视图更新回调
 */
 let cb = () => {
     console.log('View has updated.');
 }

 
 /**
  * @Description: 设置属性响应的工具函数
  */
 let defineReactive = (obj, key, value) => {
     Object.defineProperty(obj, key, {
         configurable: true,
         enumerable: true,
         get: function reactiveGetter(value){
             return value;
         },
         set: function reactiveSetter(newVal) {
            //  数据没有更新，不用处理， 注意NaN值的判断
             if(value === newVal || (value !== value && newVal !== newVal)){
                 return;
             }
             value = newVal;
             cb(newVal);
         }
     })
 }

 /**
  * @Description: 总体监听入口函数
  */
 let observer = (data) => {
     //过滤异常数据
    if(!data || (typeof data !== 'object')) {
        return;
    }

    //为data对象每一个属性设置响应式
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
    })
 }

 /**
  * @Description: 定义Vue类
  */
class Vue{
    constructor(options){
        this._data = options.data;
        //为所有属性增加监听（这里要优化，只有模板依赖的才要增加监听）
        observer(this._data);
    }
}

//测试
let vue = new Vue({
    data: {
        test: 'test vue'
    }
});
vue._data.test = 'change test value';
