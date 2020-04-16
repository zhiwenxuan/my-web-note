### 第22章 代码重构

#### 22.1 提炼函数
需要提炼的场景：函数过长，不得不加上若干主食才能让这个函数显得易读一些。

提炼的好处：
1. 避免出现超大函数
1. 独立出来的函数有助于代码复用
1. 独立出来的函数更容易被覆写
1. 独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用

#### 22.2 合并重复的条件片段
场景：函数内有一些条件分支语句，这些条件分支语句内部散布了一些重复的代码

```js
// 优化前
var paging = function( currPage ){
  if ( currPage <= 0 ){
    currPage = 0;
    jump( currPage ); // 跳转
  }else if ( currPage >= totalPage ){
    currPage = totalPage;
    jump( currPage ); // 跳转
  }else{
    jump( currPage ); // 跳转
  }
};

// 优化后
var paging = function( currPage ){
  if ( currPage <= 0 ){
    currPage = 0;
  }else if ( currPage >= totalPage ){
    currPage = totalPage;
  }
  jump( currPage ); // 把jump 函数独立出来
};
```

#### 22.3 把条件分支语句提炼成函数
场景：条件分支语句逻辑比较复杂

例子：如果是夏天，价格打8折

```js
// 优化前
var getPrice = function( price ){
  var date = new Date();
  if ( date.getMonth() >= 6 && date.getMonth() <= 9 ){ // 夏天
    return price * 0.8;
  }
  return price;
};

// 优化后
// 提炼成函数后，又起到注释的作用
var isSummer = function(){
  var date = new Date();
  return date.getMonth() >= 6 && date.getMonth() <= 9;
};

var getPrice = function( price ){
  if ( isSummer() ){ // 夏天
    return price * 0.8;
  }
  return price;
};
```

#### 22.4 合理使用循环
场景：在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以 完成同样的功能，还可以使代码量更少。

下面有一段创建 XHR 对象的代码，为了简化示例，我们 只考虑版本 9 以下的 IE 浏览器，代码如下:

```js
var createXHR = function(){
  var xhr;
  try{
    xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' );
  }catch(e){
    try{
      xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' );
    }catch(e){
      xhr = new ActiveXObject( 'MSXML2.XMLHttp' );
    }
  }
  return xhr;
};
var xhr = createXHR();

//下面我们灵活地运用循环，可以得到跟上面代码一样的效果：
var createXHR = function(){
  var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
  for ( var i = 0, version; version = versions[ i++ ]; ){
    try{
      return new ActiveXObject( version );
    }catch(e){
    }
  }
};
var xhr = createXHR();
```

#### 22.5 提前让函数退出代替嵌套条件分支
场景： 条件语句嵌套过多

```js
var del = function( obj ){
  var ret;
  if ( !obj.isReadOnly ){ // 不为只读的才能被删除
    if ( obj.isFolder ){ // 如果是文件夹
      ret = deleteFolder( obj );
    }else if ( obj.isFile ){ // 如果是文件
      ret = deleteFile( obj );
    }
  }
  return ret;
};

// 优化后
var del = function( obj ){
  if ( obj.isReadOnly ){ // 反转if 表达式
    return;
  }
  if ( obj.isFolder ){
    return deleteFolder( obj );
  }
  if ( obj.isFile ){
    return deleteFile( obj );
  }
};
```

#### 22.6 传递对象参数代替过长的参数列表
场景：函数接收多个参数，参数太长，要理清楚每个参数的意义，才能正确按顺序传入参数

```js
var setUserInfo = function( id, name, address, sex, mobile, qq ){
  console.log( 'id= ' + id );
  console.log( 'name= ' +name );
  console.log( 'address= ' + address );
  console.log( 'sex= ' + sex );
  console.log( 'mobile= ' + mobile );
  console.log( 'qq= ' + qq );
};
setUserInfo( 1314, 'sven', 'shenzhen', 'male', '137********', 377876679 );

// 优化后
var setUserInfo = function( obj ){
  console.log( 'id= ' + obj.id );
  console.log( 'name= ' + obj.name );
  console.log( 'address= ' + obj.address );
  console.log( 'sex= ' + obj.sex );
  console.log( 'mobile= ' + obj.mobile );
  console.log( 'qq= ' + obj.qq );
};
setUserInfo({
  id: 1314,
  name: 'sven',
  address: 'shenzhen',
  sex: 'male',
  mobile: '137********',
  qq: 377876679
});
```

#### 22.7 尽量减少参数的数量
场景：函数参数冗余过多

原因：每个参数都需要去维护的，如果参数不是必须的，尽量去掉

```js
var draw = function( width, height, square ){};

// 优化后
var draw = function( width, height ){
  // square 是可以根据 width 和 height 得到的，不需要传入
  var square = width * height;
};
```

#### 少用三目运算符
场景：过于复杂的逻辑

```js
// 逻辑简单，适合
var global = typeof window !== "undefined" ? window : this;

// 不适合
if ( !aup || !bup ) {
  return a === doc ? -1 :
  b === doc ? 1 :
  aup ? -1 :
  bup ? 1 :
  sortInput ?
  ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
  0;
}
```

#### 合理使用链式调用
场景：链条很容易发生变化，导致调试和维护困难。建议使用普通调用的形式

```js
// 链式调用
var User = function(){
  this.id = null;
  this.name = null;
};
User.prototype.setId = function( id ){
  this.id = id;
  return this;
};
User.prototype.setName = function( name ){

  this.name = name;
  return this;
};
console.log( new User().setId( 1314 ).setName( 'sven' ) );

// 或者
var User = {
  id: null,
  name: null,
  setId: function( id ){
    this.id = id;
    return this;
  },
  setName: function( name ){
    this.name = name;
    return this;
  }
};
console.log( User.setId( 1314 ).setName( 'sven' ) );

// 普通调用
var user = new User();
user.setId( 1314 );
user.setName( 'sven' );
```

#### 22.10 分解大型类
场景：类负责事物过多

```js
// before
var Spirit = function( name ){
  this.name = name;
};

Spirit.prototype.attack = function( type ){ // 攻击
  if ( type === 'waveBoxing' ){
    console.log( this.name + ': 使用波动拳' );

  }else if( type === 'whirlKick' ){
    console.log( this.name + ': 使用旋风腿' );
  }
};

var spirit = new Spirit( 'RYU' );
spirit.attack( 'waveBoxing' ); // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' ); // 输出：RYU: 使用旋风腿


// 优化后
var Attack = function( spirit ){
  this.spirit = spirit;
};
Attack.prototype.start = function( type ){
  return this.list[ type ].call( this );
};
Attack.prototype.list = {
  waveBoxing: function(){
    console.log( this.spirit.name + ': 使用波动拳' );
  },
  whirlKick: function(){
    console.log( this.spirit.name + ': 使用旋风腿' );
  }
};

var Spirit = function( name ){
  this.name = name;
  this.attackObj = new Attack( this );
};


Spirit.prototype.attack = function( type ){ // 攻击
  this.attackObj.start( type );
};
var spirit = new Spirit( 'RYU' );
spirit.attack( 'waveBoxing' ); // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' ); // 输出：RYU: 使用旋风腿

```

#### 22.11 用 return 退出多重循环
场景：函数体内有一个两重循环语句，我们需要在内层循环中判断，当达到某个临界条件时
退出外层的循环。

```js
// before
var func = function(){
  var flag = false;
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        flag = true;
        break;
      }
    }
    if ( flag === true ){
      break;
    }
  }
};

// after
var func = function(){
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        return;
      }
    }
  }
};

// 退出循环时，需要执行某些逻辑时，封装成函数执行
var func = function(){
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        return;
      }
    }
  }
  console.log( i ); // 这句代码没有机会被执行
};

var print = function( i ){
  console.log( i );
};
var func = function(){
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        return print( i );
      }
    }
  }
};

func();
```

#### 总结
衡量代码好坏的四个维度： 简洁、高效、易维护、可扩展。

以上是代码重构或者写出优雅代码的一些手段，这些不一定都要遵循。
还要根据具体项目场景，如：系统类型，项目工期，项目阶段，人力等因素来决定。
