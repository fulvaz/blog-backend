@@title: why webpack?
@@date: 2016-09-24

## 开篇

关于 Webpack 用法我不想讨论太多, 这里是要讨论几个问题

-   js 模块化工具那么多, 为什么还要有 webpack
-   和 grunt, gulp 有什么区别
-   可以通过 webpack 生成一个组件吗

<!-- more -->

ps:跟官方教材走一遍, 10 分钟

## 为什么还要 webpack, 关键是模块化！

关于模块化, 看看这个也许会有更深刻的理解
[模块化发展史](https://github.com/jianghai/blog/issues/2?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

webpack 天生支持 CommonJS, 自动打包, 生成单一 bundle.js, 在 html 直接引用即可.

js 可以模块化，那么 css 呢? 官方教材就告诉你 webpack 的过人之处
[webpack tutorial]http://webpack.github.io/docs/tutorials/getting-started/

打包 css 的好处? 比如写一个轮播图, 你需要用户自行添加样式, 使用 webpack 就不需要再麻烦了, 直接打包好.

## 与 gulp, grunt 区别?

原来是互补, 后来大家发现 gulp 能做的, webpack 也可以, 而且还做得不错.

## 问题:能否用 webpack 生成一个组件?

根据官方教材稍微做了一点修改 ###测试方法
修改 enrty.js

```
module.exports = function() {
    "use strict";

    require("!style!css!./style.css");
    document.write(require("./content.js"));
}
```

打包得到 bundle.js, 将 bundle.js 改名为 module.js

再修改 entry.js

```
require('./module.js')();
```

应该是能得到一样的结果

然而并不行, 连续两次打包产生了错误, 这样不可以产生可复用的组件以提供其他项目使用.

ps: 睡醒后发现, 用 webpack 打包成组件相当愚蠢. 你不是已经写好组件然后用 webpack 来组装么.

## webpack 缺点

使用 sourcemap 的调试速度感人[手动再见]

## 所以呢?

举个例子, 你写了一个轮播图, 想模块化.

-   方案 1: webpack 打包 css 和 js 成一个 bundle.js, 然后其他人插一个 script 到 html
-   方案 2: 打包成一个 npm, 说明用了 CommonJS, 让人家 require 你的 entry.js, 然后人家用 webpack 打包

哦~ 太好了,我也理清了思路.
