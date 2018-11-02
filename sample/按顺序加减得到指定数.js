
// 算法：题目是将指定数字按照顺序的方式加上加号和减号的到指定结果。
// 题目：17，6，25，49，27，65，42，48 按顺序加减得99

let arr = [17, 6, 25, 49, 27, 65, 42, 48];
let flag = 99;
let len = arr.length;
//从第一个开始
addOrSub(1, arr[0], []);

//递归遍历树：从第一个开始，要么加，要么减，不断遍历，看最后的结果是否相等
function addOrSub(index, sum, res) {
    //退出条件
    if(index === len){
        // 没有相等，退出
        if(sum !== flag) {
            return;
        }
        //相等，打印结果
        let resStr = '';
        for(let i = 0; i < len - 1; i++) {
            resStr += arr[i] + ' ' + res[i] + ' ';
        }
        resStr += arr[len-1];
        console.log(resStr);
        return;
    }

    index ++ ;

    //加
    let tempAddSum = sum + arr[index - 1];
    //在原来的数组上添加‘+’
    let tempAddRes = [...res, '+'];
    addOrSub(index, tempAddSum, tempAddRes);

    //减
    let tempSubSum = sum - arr[index - 1];
    //在原来的数组上添加‘-’
    let tempSubRes = [...res, '-'];
    addOrSub(index, tempSubSum, tempSubRes);
};


// 是需要穷举遍历，但不一定要用递归树遍历。
// 只有加、减两种运算符，正好可以用二进制表示。算法可以简化为：
let arr = [17, 6, 25, 49, 27, 65, 42, 48];
let len = arr.length;
//有2^(len-1) 种可能
let l = 1 << (len -1 );
for(let j = 0; j < l; j++) {
    let str = arr[0];
    for(let i = 1; i < len; i++) {
        //取对应位的值，0 或者 1
        str += '-+'[(j >> i-1) & 1] + arr[i];
    }
    if(eval(str) == 99) {
        console.log(str);
    }
}