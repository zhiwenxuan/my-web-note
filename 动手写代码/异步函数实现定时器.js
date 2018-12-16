/*
 * @Author: zhenqi.li
 * @Email: 1045875816@qq.com
 * @Date: 2018-10-24 16:05:26
 * @LastEditors: zhenqi.li
 * @LastEditTime: 2018-10-24 16:06:45
 * @Description: 使用异步函数实现定时器
 */

//定时器，单位为毫秒
function timeout(ms) {
    return  new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function asyncPrint(msg, ms) {
    await timeout(ms);
    console.log(msg);
}

//2秒后打印 Hello World
asyncPrint('Hello World', 2000);
