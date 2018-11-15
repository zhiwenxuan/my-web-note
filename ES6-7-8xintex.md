# ES6-7-8新特性

## ES6
```js
//Array 对象的补充节
Array iteration with for...of (Firefox 13)
Array.from() (Firefox 32)
Array.of() (Firefox 25)
Array.prototype.fill() (Firefox 31)
Array.prototype.find(), Array.prototype.findIndex() (Firefox 25)
Array.prototype.entries(),
Array.prototype.keys() (Firefox 28)
Array.prototype.copyWithin() (Firefox 32)
get Array[@@species] (Firefox 48)

//新的 Map 和 Set，以及 WeakMap 和 WeakSet 对象节
//Map (Firefox 13)
Map iteration with for...of (Firefox 17)
Map.prototype.forEach() (Firefox 25)
Map.prototype.entries(),
Map.prototype.keys(),
Map.prototype.values() (Firefox 20)
Constructor argument: new Map(null) (Firefox 37)
Monkey-patched set() in Constructor (Firefox 37)
get Map[@@species] (Firefox 41)

//Set (Firefox 13)
Set iteration with for...of (Firefox 17)
Set.prototype.forEach() (Firefox 25)
Set.prototype.entries(),
Set.prototype.keys(),
Set.prototype.values() (Firefox 24)
Constructor argument: new Set(null) (Firefox 37)
Monkey-patched add() in Constructor (Firefox 37)
get Set[@@species] (Firefox 41)

//WeakMap (Firefox 6)
WeakMap.clear() (Firefox 20)
optional iterable argument in WeakMap constructor (Firefox 36)
Constructor argument: new WeakMap(null) (Firefox 37)
Monkey-patched set() in Constructor (Firefox 37)

//WeakSet (Firefox 34)
Constructor argument: new WeakSet(null) (Firefox 37)
Monkey-patched add() in Constructor (Firefox 37)

//新的 Math 方法节
Math.imul() (Firefox 20)
Math.clz32() (Firefox 31)
Math.fround() (Firefox 26)
Math.log10(), Math.log2(), Math.log1p(), Math.expm1(), Math.cosh(), Math.sinh(), Math.tanh(), Math.acosh(), Math.asinh(), Math.atanh(), Math.hypot(), Math.trunc(), Math.sign(), Math.cbrt() (Firefox 25)

//Number 对象的补充节
Number.isNaN() (Firefox 16)
Number.isFinite() (Firefox 16)
Number.isInteger() (Firefox 16)
Number.parseInt() (Firefox 25)
Number.parseFloat() (Firefox 25)
Number.EPSILON (Firefox 25)
Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER (Firefox 31)
Number.isSafeInteger() (Firefox 32)

//Object 对象的补充节
Object.prototype.__proto__ 已经被标准化
Object.is() (Firefox 22)
Object.setPrototypeOf() (Firefox 31)
Object.assign() (Firefox 34)
Object.getOwnPropertySymbols() (Firefox 33)

//Date 对象的补充节
Date.prototype is an ordinary object (Firefox 41)
generic Date.prototype.toString (Firefox 41)
Date.prototype[@@toPrimitive] (Firefox 44)

//新的 Promise 对象节
Promise (Firefox 24,  在 Firefox 29 中默认启用)

//新的 Reflect 对象节
Reflect (Firefox 42)

//RegExp 对象的补充节
RegExp sticky (y) flag (Firefox 38)
RegExp unicode (u) flag (Firefox 46)
generic RegExp.prototype.toString (Firefox 39)
RegExp.prototype[@@match]() (Firefox 49)
RegExp.prototype[@@replace]() (Firefox 49)
RegExp.prototype[@@search]() (Firefox 49)
RegExp.prototype[@@split]() (Firefox 49)
get RegExp[@@species] (Firefox 49)

//String 对象的补充节
String.fromCodePoint() (Firefox 29)
String.prototype.codePointAt() (Firefox 29)
String.prototype.startsWith(), String.prototype.endsWith() (Firefox 17)
String.prototype.includes() (Firefox 40) (formerly String.prototype.contains() (Firefox 17))
String.prototype.repeat() (Firefox 24)
String.prototype.normalize() (Firefox 31)
String.raw() (Firefox 34)
\u{XXXXXX} Unicode code point escapes (Firefox 40)

//新的 Symbol 对象节
Symbol (Firefox 36)
Symbol.iterator (Firefox 36)
Symbol.for() - global Symbol registry (Firefox 36)
Symbol.match (Firefox 40)
Symbol.species (Firefox 41)
Symbol.toPrimitive (Firefox 44)
Symbol.prototype[@@toPrimitive] (Firefox 44)
Symbol.replace (Firefox 49)
Symbol.search (Firefox 49)
Symbol.split (Firefox 49)
Symbol.hasInstance (Firefox 50)

//Typed Arrays节
//Typed arrays 已经合并到 ECMAScript 2015 中，不再具有自己单独的规范。

ArrayBuffer
get ArrayBuffer[@@species] (Firefox 48)
DataView
Int8Array
Uint8Array
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
get %TypedArray%[@@species] (Firefox 48)

//表达式和操作符节
new.target (Firefox 41)
Spread operator for arrays (Firefox 16)
use Symbol.iterator property (Firefox 36)
Spread operator for function calls (Firefox 27)
use Symbol.iterator property (Firefox 36)

//语句节
for...of (Firefox 13)
works in terms of .iterator() and .next() (Firefox 17)
use "@@iterator" property (Firefox 27)
use Symbol.iterator property (Firefox 36)
函数节
Rest parameters (Firefox 15)
Default parameters (Firefox 15)
Parameters without defaults after default parameters (Firefox 26)
Destructured parameters with default value assignment (Firefox 41)
Arrow functions (Firefox 22)

//Generator function (Firefox 26)
yield (Firefox 26)
yield* (Firefox 27)
arguments[@@iterator] (Firefox 46)

//其他特性节
Binary and octal numeric literals (Firefox 25)

Template strings (Firefox 34)

Object initializer: shorthand property names (Firefox 33)
Object initializer: computed property names (Firefox 34)
Object initializer: shorthand method names (Firefox 34)
```

## ES7
```js
Array.prototype.includes() (Firefox 43)

TypedArray.prototype.includes() (Firefox 43)
```

## ES8
```js
Object.values() and Object.entries() (Firefox 47)

String.prototype.padEnd() (Firefox 48)

String.prototype.padStart() (Firefox 48)

Object.getOwnPropertyDescriptors() (Firefox 50)

Async Functions
async function (Firefox 52)
async function expression (Firefox 52)
AsyncFunction (Firefox 52)
await (Firefox 52)

Trailing commas in function parameter lists (Firefox 52)
```
