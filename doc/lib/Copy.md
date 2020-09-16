---
title: JSpider——Copy模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# :book: JSpider——Copy 模块

## :pencil2: 介绍
Copy 模块是用来处理复制的一个函数。

## 闲聊

<br>

## :hammer: 快速开始

###  JSpider 情况
Copy 不包含在 JSpider 中，但是可以通过 extend 来导入。

```js
let spider = new JSpider();
spider.extend(['Copy'])
```

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/Copy.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/Copy.js')
      .then(res=>window.Copy = res)
```

<br>

## :book: Copy 模块
Copy 模块是为了将某些限制网站复制的 JS 方式给消除掉，所以有了 Copy.clearUnCopy 函数，只要不是特殊的防止复制的方式，都可以去除禁止复制。

而 Copy.copy 是用来复制的函数，虽然在控制台可以直接使用浏览器自带的 copy 函数复制，但是如果是配合油猴脚本全自动注入的话还是要额外的 copy 函数的。

:bangbang: 注意，如果填入一个 DOM 元素，将会获取它的 outerHTML 。


```js
//控制台

let spider = new JSpider();
await spider.extend(['Copy']);

//载入完成后

spider.Copy.clearUnCopy();
spider.Copy.copy(123);

spider.Copy.copy({1:2,2:3})
spider.Copy.copy(document.querySelector('body'))
```


# [JSpider教程](../JSpider.md)