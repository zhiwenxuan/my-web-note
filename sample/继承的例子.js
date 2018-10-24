//继承小例子

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