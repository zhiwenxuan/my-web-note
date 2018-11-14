//1. 原型链继承
function Parent() {
    this.name = 'name';
}
Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child() {

}
Child.prototype = new Parent();
let child1 = new Child();
child1.getName();

//2. 借助构造函数(经典继承)
function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}

let child2 = new Child('child2');
console.log(child2.name);

//3. 组合继承：原型链 + 构造函数
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function() {
    return this.name;
}

//借助构造函数
function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
//借助原型链
Child.prototype = new Parent();

let child3 = new Child('child3', 18);
console.log(child3.getName());
console.log(child3.colors);




//数组去重小例子
//1. 使用include
Array.prototype._unique = function(){
    let temp = [];
    this.forEach(ele => {
        if(!temp.includes(ele)) {
            temp.push(ele)
        }
    })
    return temp;
}

let arr = [1, 2, 5, 3, 3, 6, 5, 1];
arr._unique();

//2. 优化，利用filter去掉forEach循环
Array.prototype._unique = function() {
    let res = this.filter( (item, index) => {
        return this.indexOf(item) === index
    } )
    return res;
}
let arr = [1, 2, 5, 3, 3, 6, 5, 1];
arr._unique();
