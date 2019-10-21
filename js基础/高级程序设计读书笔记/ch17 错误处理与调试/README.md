# 第十七章 错误处理与调试

### 17.1 浏览器报告的错误
学会查看每种浏览器报告的错误。

### 17.2 错误处理

#### 17.2.1 try-catch 语句

```js
try {
  // 可能会导致错误的代码
} catch (error) {
  // 在错误发生时怎么处理
}
```

**1）finally**子句：可选项，但是一经使用，其代码无论如何都会执行。
```js
// 最终结果返回 0，return会被忽略
function testFinally(){
  try {
    return 2;
  } catch (error){
    return 1;
  } finally {
    return 0; 
  }
}
```

**2）错误类型：**  
```js
Error new Error([message[, fileName[,lineNumber]]])

EvalError // 创建一个error实例，表示错误的原因：与 eval() 有关。

InternalError  // 创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多".

RangeError // 创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。

ReferenceError // 创建一个error实例，表示错误的原因：无效引用。

SyntaxError // 创建一个error实例，表示错误的原因：eval()在解析代码的过程中发生的语法错误。

TypeError // 创建一个error实例，表示错误的原因：变量或参数不属于有效类型。

URIError // 创建一个error实例，表示错误的原因：给 encodeURI()或  decodeURl()传递的参数无效。
```

使用 instanceof 判断类型：
```js
try {
  someFunction()
} catch (error) {
  if (error instanceof TypeError) {
    // 处理类型错误
  } else if (error instanceof ReferenceError) {
    // 处理引用错误
  } else {
    // 处理其他错误
  }
}
```

#### 17.2.2 抛出错误
与 try-catch 语句相配的还有一个 throw 操作符。在遇到 throw 操作符时，代码会立即停止执行。仅当有 try-catch 语句捕获到被抛出的值时，代码才会继续执行。

**自定义错误信息**：
```js
function CustomError (message) {
  this.name = "CustomError";
  this.message = message;
}

CustomError.prototype = new Error();
throw new CustomError("My message");
```

#### 17.2.3 错误（error）事件
任何没有通过 try-catch 处理的错误都会触发 window 对象的 error 事件。在任何浏览器，onerror 事件处理程序都不会创建 event 对象，但它可以接收三个参数：错误信息，错误所在的 URL 和 行号。 onerror 事件处理程序是 DOM0 级事件，要使用 DOM0 级技术。

```js
window.onerror = function (message, url, line) {
  console.log(message);
}
```

使用 `return false` 阻止浏览器报告错误（即阻止浏览器输出错误在控制台等默认行为）
```js
window.onerror = function (message, url, line) {
  console.log(message);
  return false;
}
```
#### 17.2.4 处理错误的策略
搞清楚何时以及为什么发生错误

#### 17.2.5 常见的错误类型
1. 类型转换错误
2. 数据类型错误
3. 通信错误

#### 17.2.6 区分致命错误和非致命错误

非致命错误：  
- 不影响用户的主要任务；  
- 只影响页面的一部分；  
- 可以恢复；  
- 重复相同操作可以消除错误。

致命错误：  
- 应用程序根本无法继续运行；  
- 错误明显影响到了用户的主要操作；  
- 会导致其他连带错误。

区分非致命错误与致命错误主要看对用户的影响。

#### 17.2.7 把错误记录到服务器
保存错误日志到服务器。我们可以在 try-catch 中将错误上报。具体的上报规则需要好好设计。

### 17.3 调试技术
打印消息到控制台、断点等。
