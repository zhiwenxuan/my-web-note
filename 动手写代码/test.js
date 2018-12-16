//组合继承
function Parent(name) {
    this.name = name;
    this.util = {};
}
Parent.prototype.getName = function(){
    return this.name;
}

function Child(name, age){
    this.age = age;
    Parent.call(this, name);
}
Child.prototype = new Parent();
let child = new Child('Tom', 18);

console.log(child.name);
console.log(child.getName())

//代理delegate
function bindEvent(parent, target, event, handler) {
    parent.addEventLisenter(event, (e) => {
        if(e.target === target) {
            handler();
        }
    })
}

//事件防抖debounce,只执行最后一次操作
let print = () => {
    //打印滚动条Y轴位置
    console.log(`Scroll Y: ${window.scrollY}`);
}
function debounce(handler, delay) {
    let timer = null;
    return function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(handler, delay);
    }
}
window.addEventListener('scroll', debounce(print, 100));

//事件节流throttle，一段时间内，只执行一次
let print = () => {
    console.log(`Scroll Y: ${window.scrollY}`);
}
function throttle(handler, interval) {
    let last = (new Date()).getTime();
    return function() {
        let now = (new Date()).getTime();
        if(now - last > interval) {
            last = now;
            handler();
        }
    }
}
window.addEventListener('scroll', throttle(print, 100));

//在事件节流里加上防抖，解决节流最后一次时间间隔的操作的响应
let print = () => {
    console.log(`Scroll Y: ${window.scrollY}`);
}
function throttleDebounce(handler, interval) {
    let timer = null;
    let last = +new Date(); //(new Date()).getTime();
    return function() {
        let now = +new Date(); //(new Date()).getTime();
        if(now - last > interval) {
            last = now;
            handler();
        }else { //响应最后一次时间间隔的操作
            window.clearTimeout(timer);
            timer = window.setTimeout(handler, interval);
        }
    }
}
window.addEventListener('scroll', throttleDebounce(print, 100));

//手动实现Strin.prototype.trim()
String.prototype.myTrim = function() {
    //输入校验，排除非字符串
    if(Object.prototype.toString.call(this) !== '[object String]'){
        return this;
    }
    let length = this.length;
    let beginInd = 0, endInd = 0;
    for(let i = 0; i < length; i++) {
        if(this[i] !== ' '){
            beginInd = i;
            break;
        }
    }
    if(beginInd === 0 && this[0] === ' '){
        return '';
    }
    for(let i = length - 1; i >= beginInd; i--) {
        if(this[i] !== ' '){
            endInd = i;
            break;
        }
    }
    return this.slice(beginInd, endInd + 1);
}
let str = '     Hello Wolrd    ';
str.myTrim();




