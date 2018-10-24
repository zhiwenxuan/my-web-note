# typeof 一些记录

## 描述

| Type | Result | 
| :------ | :------ |
| Undefined | "undefined"| 
| Null | "object" (see below)| 
| Boolean | "boolean" | 
| Number | "number"|
| String | "string"|
| Symbol (new in ECMAScript 2015) | "symbol" | 
| Any other object | "object" |
| Host object (provided by the JS environment) | Implementation-dependent |
| Function object (implements [[Call]] in ECMA-262 terms) | "function" |

几个要点：
- 基本上跟七种基本数据类型一致，undefined， null， Boolean， String， Number， Symbol， Object

- null 比较特殊，值是object
- 另外还是函数类型，值是‘function’
- 通过内置构造创建的，值也是‘object’， 如：let num = new Number(10)	                        
     
## 例子

```js
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Despite being "Not-A-Number"
typeof Number('1') === 'number'; // Number tries to parse things into numbers


// Strings
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // note that a number within a string is still typeof string
typeof (typeof 1) === 'string'; // typeof always returns a string
typeof String(1) === 'string'; // String converts anything into a string, safer than toString


// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() will convert values based on if they're truthy or falsy
typeof !!(1) === 'boolean'; // two calls of the ! (logical NOT) operator are equivalent to Boolean()


// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'


// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 


// Objects
typeof {a: 1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // See Regular expressions section for historical results


// The following are confusing, dangerous, and wasteful. Avoid them.
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String('abc') === 'object';


// Functions
typeof function() {} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';
```
