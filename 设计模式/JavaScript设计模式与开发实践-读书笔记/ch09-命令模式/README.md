# 第九章 命令模式

## 命令模式用途

命令模式是最简单和优雅的模式之一，命令模式中的命令指的是一个执行某些特定事情的指令。

命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式设计程序，使得请求发送者和接收者能够消除彼此之间的耦合关系。

## 命令模式的例子 - 菜单程序

假设我们正在编写一个用户界面程序，该用户界面上至少有数十个 Button 按钮。因为项目比较复杂，所以我们决定让某个程序员负责绘制这些按钮，而另外一些程序员则负责编写点击按钮后的具体行为，这些行为都将被封装在对象里。

在大型项目开发中，这是很正常的分工。对于绘制按钮的程序员来说，他完全不知道某个按钮未来将用来做什么，可能用来刷新菜单界面，也可能用来增加一些子菜单，他只知道点击这个按钮会发生某些事情。那么当完成这个按钮的绘制之后，应该如何给它绑定 onclick 事件呢?

回想一下命令模式的应用场景:

> 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接 收者能够消除彼此之间的耦合关系。

我们很快可以找到在这里运用命令模式的理由:点击了按钮之后，必须向某些负责具体行为 的对象发送请求，这些对象就是请求的接收者。但是目前并不知道接收者是什么对象，也不知道 接收者究竟会做什么。此时我们需要借助命令对象的帮助，以便解开按钮和负责具体行为对象之间的耦合。

设计模式的主题总是把不变的事物和变化的事物分离开来，命令模式也不例外。按下按钮之 后会发生一些事情是不变的，而具体会发生什么事情是可变的。通过 command 对象的帮助，将来我们可以轻易地改变这种关联，因此也可以在将来再次改变按钮的行为。

**代码实现**

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <button id="button1">点击按钮1</button>
    <button id="button2">点击按钮2</button>
    <button id="button3">点击按钮3</button>

    <script>
      var button1 = document.getElementById("button1"),
        button2 = document.getElementById("button2"),
        button3 = document.getElementById("button3");

      var setCommand = function(button, command) {
        button.onclick = function() {
          //执行命令的接口约定为execute
          command.execute();
        };
      };

      var MenuBar = {
        refresh: function() {
          console.log("刷新菜单目录");
        }
      };
      var SubMenu = {
        add: function() {
          console.log("增加子菜单");
        },
        del: function() {
          console.log("删除子菜单");
        }
      };
      //在让button 变得有用起来之前，我们要先把这些行为都封装在命令类中：
      var RefreshMenuBarCommand = function(receiver) {
        return {
          execute: function() {
            receiver.refresh();
          }
        };
      };

      var AddSubMenuCommand = function(receiver) {
        return {
          execute: function() {
            receiver.add();
          }
        };
      };

      var DelSubMenuCommand = function(receiver) {
        return {
          execute: function() {
            receiver.del();
          }
        };
      };

      var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
      var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
      var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
      setCommand(button1, refreshMenuBarCommand);
      setCommand(button2, addSubMenuCommand);
      setCommand(button3, delSubMenuCommand);
    </script>
  </body>
</html>
```

## 撤销命令

撤销命令是很有常规的和很有必要的功能。比如编写文档的`Ctr + Z`功能、下棋程序的悔棋功能等。

一个小例子，使运动过后的小球回到原来的位置：

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <div
      id="ball"
      style="position:absolute;background:#000;width:50px;height:50px;top: 40px;"
    ></div>
    输入小球移动后的位置：<input id="pos" />
    <button id="moveBtn">开始移动</button>
    <button id="cancelBtn">cancel</button>
    <!--增加取消按钮-->
  </body>

  <script type="text/javascript">
    //运用第五章的策略模式
    var tween = {
      linear: function(t, b, c, d) {
        return (c * t) / d + b;
      },
      easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      strongEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      strongEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      sineaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      sineaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      }
    };

    var Animate = function(dom) {
      this.dom = dom; // 进行运动的dom 节点
      this.startTime = 0; // 动画开始时间
      this.startPos = 0; // 动画开始时，dom 节点的位置，即dom 的初始位置
      this.endPos = 0; // 动画结束时，dom 节点的位置，即dom 的目标位置
      this.propertyName = null; // dom 节点需要被改变的css 属性名
      this.easing = null; // 缓动算法
      this.duration = null; // 动画持续时间
    };

    Animate.prototype.start = function(propertyName, endPos, duration, easing) {
      this.startTime = +new Date(); // 动画启动时间
      this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
      this.propertyName = propertyName; // dom 节点需要被改变的CSS 属性名
      this.endPos = endPos; // dom 节点目标位置
      this.duration = duration; // 动画持续事件
      this.easing = tween[easing]; // 缓动算法
      var self = this;
      var timeId = setInterval(function() {
        // 启动定时器，开始执行动画
        if (self.step() === false) {
          // 如果动画已结束，则清除定时器
          clearInterval(timeId);
        }
      }, 19);
    };

    Animate.prototype.step = function() {
      var t = +new Date(); // 取得当前时间
      if (t >= this.startTime + this.duration) {
        // (1)
        this.update(this.endPos); // 更新小球的CSS 属性值
        return false;
      }
      var pos = this.easing(
        t - this.startTime,
        this.startPos,
        this.endPos - this.startPos,
        this.duration
      );
      // pos 为小球当前位置
      this.update(pos); // 更新小球的CSS 属性值
    };

    Animate.prototype.update = function(pos) {
      this.dom.style[this.propertyName] = pos + "px";
    };
  </script>

  <script>
    var ball = document.getElementById("ball");
    var pos = document.getElementById("pos");
    var moveBtn = document.getElementById("moveBtn");
    var cancelBtn = document.getElementById("cancelBtn");
    var MoveCommand = function(receiver, pos) {
      this.receiver = receiver;
      this.pos = pos;
      this.oldPos = null;
    };
    MoveCommand.prototype.execute = function() {
      this.receiver.start("left", this.pos, 1000, "strongEaseOut");
      this.oldPos = this.receiver.dom.getBoundingClientRect()[
        this.receiver.propertyName
      ];
      // 记录小球开始移动前的位置
    };

    MoveCommand.prototype.undo = function() {
      this.receiver.start("left", this.oldPos, 1000, "strongEaseOut");
      // 回到小球移动前记录的位置
    };
    var moveCommand;

    moveBtn.onclick = function() {
      var animate = new Animate(ball);
      moveCommand = new MoveCommand(animate, pos.value);
      moveCommand.execute();
    };
    cancelBtn.onclick = function() {
      moveCommand.undo(); // 撤销命令
    };
  </script>
</html>
```

## 撤销和重做

上面的例子是一次撤销，有时候我们需要多次撤销，这时可以使用历史列表来记录已经执行的操作。

关于重做：在画布 canvas 中进行撤销操作不那么好实现，比如清除某一条线。这时可以清除画布，重新绘制（执行历史列表中的操作）来实现。

下面看一个关于重做的实现：

作者 HTML5 版《街头霸王》游戏中，命令模式可以用来实现播放录像功能。原理跟 Canvas 画图的例子一样，我们把用户在键盘的输入都封装成命令，执行过的命令将被存放到堆栈 中。播放录像的时候只需要从头开始依次执行这些命令便可，代码如下:

```html
<html>
  <body>
    <button id="replay">播放录像</button>
  </body>
  <script>
    var Ryu = {
      attack: function() {
        console.log("攻击");
      },
      defense: function() {
        console.log("防御");
      },
      jump: function() {
        console.log("跳跃");
      },
      crouch: function() {
        console.log("蹲下");
      }
    };

    var makeCommand = function(receiver, state) {
      // 创建命令
      return function() {
        receiver[state]();
      };
    };
    var commands = {
      "119": "jump", // W
      "115": "crouch", // S
      "97": "defense", // A
      "100": "attack" // D
    };

    var commandStack = []; // 保存命令的堆栈
    document.onkeypress = function(ev) {
      var keyCode = ev.keyCode,
        command = makeCommand(Ryu, commands[keyCode]);
      if (command) {
        command(); // 执行命令
        commandStack.push(command); // 将刚刚执行过的命令保存进堆栈
      }
    };

    document.getElementById("replay").onclick = function() {
      // 点击播放录像
      var command;
      while ((command = commandStack.shift())) {
        // 从堆栈里依次取出命令并执行
        command();
      }
    };
  </script>
</html>
```

## 命令队列

有时命令需要排队，这时可以使用命令队列来存储要执行的命令。

## 宏命令

宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批的命令。这里也用到了组合模式。

想象一下，家里有一个万能遥控器，每天回家的时候，只要按一个特别的按钮，它就会帮我们关上房间门，顺 便打开电脑并登录 QQ。代码实现如下：

```js
var closeDoorCommand = {
  execute: function() {
    console.log("关门");
  }
};
var openPcCommand = {
  execute: function() {
    console.log("开电脑");
  }
};

var openQQCommand = {
  execute: function() {
    console.log("登录QQ");
  }
};

var MacroCommand = function() {
  return {
    commandsList: [],
    add: function(command) {
      this.commandsList.push(command);
    },
    execute: function() {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute();
      }
    }
  };
};
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();
```

## 智能命令与傻瓜命令

```js
var closeDoorCommand = {
  execute: function() {
    console.log("关门");
  }
};
```

这个不需要接收 receiver 就可以执行，这个是智能命令，相反是傻瓜命令。

## 小结

本章我们学习了命令模式。跟许多其他语言不同，JavaScript 可以用高阶函数非常方便地实现命令模式。命令模式在 JavaScript 语言中是一种隐形的模式。
