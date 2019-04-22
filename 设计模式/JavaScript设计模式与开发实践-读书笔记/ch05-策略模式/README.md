# 第五章 策略模式

## 思想

定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

详细理解：定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。在客户对 Context 发起请求的时候，Context 总是把请求委托给这些策略对象中间的某一个进行计算。

将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

## 背景例子

计算年终奖。最初代码实现：

```js
var calulateBonus = function(performanceLevel, salary) {
  if (performanceLevel === "S") {
    return salary * 4;
  }
  if (performanceLevel === "A") {
    return salary * 3;
  }
  if (performanceLevel === "B") {
    return salary * 2;
  }
};
calculateBouns("B", 20000);
calculateBouns("S", 6000);
```

代码存在的**缺点**

1. calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑分支
2. calculateBonus 函数缺乏弹性，如果增加了一种新的绩效等级 C， 或者更改绩效 S 的奖金系数，必须深入 calculateBonus 函数的内部实现，这是违反开发-封闭原则的。
3. 算法的复用性差

## 使用策略模式重构

算法实现 和 算法调用 分离。

```js
//算法实现
var strategies = {
  S: function(salary) {
    return salary * 4;
  },
  A: function(salary) {
    return salary * 3;
  },
  B: function(salary) {
    return salary * 2;
  }
};
//算法调用
var calculateBonus = function(level, salary) {
  return strategies[level](salary);
};

calculateBonus("S", 6000);
calculateBonus("A", 4000);
```

## 多态在策略模式中的体现

通过使用策略模式重构代码，我们消除了原程序中大片的条件分支语句。所有跟计算奖金有 关的逻辑不再放在 Context 中，而是分布在各个策略对象中。Context 并没有计算奖金的能力，而 是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。当我 们对这些策略对象发出“计算奖金”的请求时，它们会返回各自不同的计算结果，这正是对象多 态性的体现，也是“它们可以相互替换”的目的。替换 Context 中当前保存的策略对象，便能执 行不同的算法来得到我们想要的结果。

## 策略模式优缺点

**优点：**

1. 策略模式利用组合、委托和多态的技术和思想，可以有效地避免多重条件选择语句
2. 策略模式提供对开发-封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换、理解、扩展。
3. 策略模式中的算法可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。

**缺点：**

1. 使用策略模式，strategy 要向客户暴露他的所有实现，这是违反最少知识原则。

## 一等函数对象与策略模式

Peter Norvig 在他的演讲中曾说过:“在函数作为一等对象的语言中，策略模式是隐形的。 strategy 就是值为函数的变量。” 也就是说我们平时对函数的封装就是使用策略模式的体现。
