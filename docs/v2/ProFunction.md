---
title: ProFunction
version: 2.0
date: 2020/10/6
author: KonghaYao
---
# ​:alembic:​ 高级函数集
## :pencil2: 介绍
高级函数集是通过使用 JSpider 中函数制作的工具集，在JSpider 中可以通过 Extend 函数导入到 JSpider 实例中。

## :bee: 闲聊
在使用 JSpider 中，发现可以使用多个函数组成更加高级的功能函数，所以集合这些常用的函数方便快速爬取目标。

当然，所有的高级函数都可以通过 JSpider 原生的函数生成，高级函数只是为了某些特殊情况下方便快速写出高效的代码，**若只是正常使用，可能永远都用不到**。

## 如何导入高级函数集
Extend 这个函数将会直接将高级函数集的函数直接导入到 JSpider 类中
```js
let jspider = new JSpider()
jspider.Extend()
```


## searchWindow 函数
用于直接搜索全局变量，是 search 函数的扩展。

```js


```

## AjaxHook 函数
用于使用 js 代码拦截 Ajax 相关函数。
- 对于 Ajax 拦截，我们可以使用 **开发者工具** 中的 XHR Breakpoint 来进入 debugger 状态。

- 但是如果需要实现不进入开发者工具的 debugger 状态修改 Ajax 请求参数，则需要这个函数。

```js


```


