// 1. 随意给一个无序，不重复的数组data，任意抽出n个，相加和为sum，
    //也可能无解，写出该函数。

//运用递归
//退出条件 最后一个
// 
function sumOfKNumber() {
    data.sort((a, b) => {return a -b});
    let currentSum = data[0];
    res.push(0);
    
    for(let i = 1; i < len; i++) {
        console.log(i)
        if(currentSum === sum) {
            console.log('finish');
            return;
        }else if(currentSum < sum) {
            res.push(i);
            currentSum += data[i]
        }else {
            let popV1 = res.pop();
            let index = res[res.length-1] + 1;
            res.push(index);
            currentSum += (data[index] - data[popV1]); 
        }
        console.log(res)
    }

}
let data = [1, 9, 2, 5, 4, 6, 7, 8];
let len = data.length;
let sum = 14;
let res = [];
sumOfKNumber();
console.log(res);




// 2. 节流函数怎么写

// 3. 手写bind函数
//bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 
Function.prototype.myBind = function(obj){
    let args = [].splice.call(arguments, 1);
    console.log(args);
    let context = this;
    return function() {
        let oAgrs = args.concat([].splice.call(arguments, 0));
        console.log(oAgrs)
        context.apply(obj, oAgrs);
    }
}

// 4. arguments

function testArg(a, b) {
    //类数组对象，转数组
    console.log([].splice.call(arguments));
    console.log([...arguments])
}

// 5. 事件循环

// 6. 使用纯css实现自适应搜索框，至少两种方法

// 7. css画一个三角形 和 '>'
// #demo {
//     width: 0;
//     height: 0;
//     border: 100px solid transparent;
//     border-bottom: 100px solid red;
// }

// 8. 跨域通信问题

// 9. 使用数组reduce方法实现数组map方法

// 10. 判断数组两种方法，非数组转数组

// 11. 原生实现ajax

// 12. 元素相对浏览器位置

// 13. 拖拽事件

// 14. 点击一个a标签，从事件角度，说明控制器输出起href值过程

// 15. 获取一个二叉树最大深度
function TreeNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}
function maxDepth(root) {
    if(root === null){
        return 0;
    }
    let leftDepth = maxDepth(root.left),
        rightDepth = maxDepth(root.right);
    let childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
    return 1 + childDepth;
}
let root = {};
root = new TreeNode(0);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
maxDepth(root);


// 16. amd 和 cmd 规范

// 17. 解析一个url，包括hash值
location.href; //获取整一个连接
location.protocol; //协议类型 http
location.hash; //如 #mid=5390
location.search; // 获取查询部分，如 ?id=1
location.pathname; // 'lesson/115.html'

// 18. cookie安全设置

// 19. 有一个versions是一个项目的版本号列表，因多人维护，
   // 不规则var versions = ['1.45.0', '1.5', '6', '3.3.3.3.3.3'],要求从小到大排序，注意‘1.45’比‘1.5’大， 排序结果： ['1.5', '1.45.0', '3.3.3.3.3.3', '6']
20. 