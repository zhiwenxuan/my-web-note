# 第十五章 使用Canvas绘图

### 15.1 基本用法

```html
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById('drawing');
      // 检测浏览器是否支持 Canvas
      if (canvas.getContext) {
        // 获取 Canvas 上下文
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
    <!--设置宽高，如果没有设置，默认宽是300px，高是150px-->
   <canvas id="drawing" width="150" height="150"></canvas>
 </body>
</html>
```

### 15.2 2D 上下文

#### 15.2.1 填充和描边

```js
var drawing = document.getElementById("drawing");
if (drawing.getContext){
  var context = drawing.getContext("2d");
  context.strokeStyle = "red"; // strokeStyle 描边
  context.fillStyle = "#0000ff"; // fillStyle 填充颜色
}
```

#### 15.2.2 绘制矩形
相关方法： `fillRect()` 、 `strokeRect()`  和  `clearRect()`。都是接收 4 个参数：矩形左上角的 x 坐标、矩形左上角的 y 坐标、矩形的宽度和矩形高度。单位像素。

```js
// 填充颜色的矩形
context.fillStyle = "#ff0000"; 
context.fillRect(10, 10, 50, 50);

// 只有边框，中间没有填充颜色
context.strokeStyle = "#ff0000"; 
context.strokeRect(10, 10, 50, 50);

// 清除一个矩形
context.clearRect(40, 40, 10, 10);
```

#### 15.2.3 绘制路径
开始绘制路径时调用 beginPath() 方法，然后根据需求调用一下方法：

```
moveTo(x, y) 
将笔触移动到指定的坐标x以及y上，不画线

lineTo(x, y)  
绘制一条从当前位置到指定x以及y位置的直线。

arc(x, y, radius, startAngle, endAngle, counterclockwise) 
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。

arcTo(x1, y1, x2, y2, radius) ： 
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

quadraticCurveTo(cp1x, cp1y, x, y) 
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。

bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。

stroke() 通过线条来绘制图形轮廓。

fill() 通过填充路径的内容区域生成实心的图形。
```

画一个钟表的例子：
```js
var context = drawing.getContext("2d");

// 开始路径
context.beginPath();

// 绘制外圆
context.arc(100, 100, 99, 0, 2 * Math.PI, false);

// 绘制内圆
context.moveTo(194, 100);
context.arc(100, 100, 94, 0, 2 * Math.PI, false);

// 绘制分针
context.moveTo(100, 100); 
context.lineTo(100, 15);

// 绘制时针
context.moveTo(100, 100); 
context.lineTo(35, 100);

// 描边路径
context.stroke();
```

#### 15.2.4 绘制文本
主要用两个方法
```
fillText(text, x, y [, maxWidth]) 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.

strokeText(text, x, y [, maxWidth]) 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
```

#### 15.2.5 变换
变换主要有： 移动、缩放、旋转。

**在进行形变之前，可以进行状态的保存，如果想撤回更改，可以恢复**，如下：
```
save() 保存画布(canvas)的所有状态

restore() 恢复 canvas 状态

save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
你可以调用任意多次 save 方法。每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。
```

变换的方法：
```
translate(x, y) 
translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量

rotate(angle)
这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

scale(x, y)
scale  方法可以缩放画布的水平和垂直的单位。两个参数都是实数，可以为负数，x 为水平缩放因子，
y 为垂直缩放因子，如果比1小，会比缩放图形， 如果比1大会放大图形。默认值为1， 为实际大小。

transform(m11, m12, m21, m22, dx, dy)
这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵
m11：水平方向的缩放
m12：水平方向的倾斜偏移
m21：竖直方向的倾斜偏移
m22：竖直方向的缩放
dx：水平方向的移动
dy：竖直方向的移动
```

#### 15.2.6 绘制图像
`drawImage()`

#### 15.2.7 阴影
```
shadowOffsetX = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。
负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

shadowOffsetY = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。
负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

shadowBlur = float
shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。

shadowColor = color
shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
```
```js
context.shadowOffsetX = 5; 
context.shadowOffsetY = 5;
context.shadowBlur = 4; 
context.shadowColor = "rgba(0, 0, 0, 0.5)";
```

#### 15.2.8 渐变
```
createLinearGradient(x1, y1, x2, y2)
createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

createRadialGradient(x1, y1, r1, x2, y2, r2)
createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，
后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

gradient.addColorStop(position, color)
addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。
```

例子：
```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // Create gradients
  var lingrad = ctx.createLinearGradient(0,0,0,150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = ctx.createLinearGradient(0,50,0,95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;
  
  // draw shapes
  ctx.fillRect(10,10,130,130);
  ctx.strokeRect(50,50,50,50);

}
```

#### 15.2.9 图片模式

```
createPattern(image, type)
该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。
Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。
```

例子：
```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // 创建新 image 对象，用作图案
  var img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function() {

    // 创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);

  }
}
```

#### 15.2.10 使用图像数据
这个可以通过修改图像原始数据，从而修改图像

```
getImageData(x,y,width,height)
x坐标、y坐标、像素宽度和高度
```

图片灰度化例子：
```js
var context = drawing.getContext("2d"),
        image = document.images[0],
        imageData, data,
        i, len, average,
        red, green, blue, alpha;
//绘制原始图像
context.drawImage(image, 0, 0);

// 取得图像数据
imageData = context.getImageData(0, 0, image.width, image.height); 
data = imageData.data;

for (i=0, len=data.length; i < len; i+=4){
  red = data[i];
  green = data[i+1];
  blue = data[i+2];
  alpha = data[i+3];
  // 求 rgb 平均值
  average = Math.floor((red + green + blue) / 3);
  // 设置颜色值，透明度不变
  data[i] = average; 
  data[i+1] = average; 
  data[i+2] = average;
}
// 回写图像数据并显示结果
imageData.data = data; 
context.putImageData(imageData, 0, 0);
```

#### 15.2.11 合成
我们不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分（清除区域不仅限于矩形，像clearRect()方法做的那样）以及更多其他操作。

```
globalCompositeOperation = type
这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识12种遮盖方式的字符串。
```
具体查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing)

#### 15.2.12 基本动画（来自MDN）
动画的基本步骤
你可以通过以下的步骤来画出一帧:

1. 清空 canvas
除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 clearRect 方法。

2. 保存 canvas 状态
如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。

3. 绘制动画图形（animated shapes）
这一步才是重绘动画帧。

4. 恢复 canvas 状态
如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

使用 window.requestAnimationFrame()来设定定期执行一个指定函数。

**太阳系动画**例子：
```js
var sun = new Image();
var moon = new Image();
var earth = new Image();
function init(){
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // 在现有的内容后面绘制新的内容
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // clear canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150,150);

  // Earth
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0);
  ctx.fillRect(0,-12,50,24); // Shadow
  ctx.drawImage(earth,-12,-12);

  // Moon
  ctx.save();
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  ctx.translate(0,28.5);
  ctx.drawImage(moon,-3.5,-3.5);
  ctx.restore();

  ctx.restore();
  
  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  ctx.stroke();
 
  ctx.drawImage(sun,0,0,300,300);

  window.requestAnimationFrame(draw);
}

init();
```

### 15.3 WebGL
WebGL 是针对 Canvas 的 3D 上下文。WebGL 不是 W3C 制定的标准，而是由 Khronos Group 制定的。 具体内容可以查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

### 总结
这章主要列举了 Canvas 的各种使用方法，具体使用可以参考如下文档：  

[MDN的Canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)  
[HHTML5-Canvas教程](https://www.html5canvastutorials.com/)  
