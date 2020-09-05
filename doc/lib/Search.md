---
title: JSpider——Search模块
date: 2020/9/1
author: KonhaYao
tags:
  -Jspider
---

# :book: JSpider——Search 模块

## :pencil2: 介绍

Search 模块是用来搜索对象中的数据的，同时携带了一个获取全局变量的函数。

在做爬虫的时候，我们经常会发现很多的函数已经内置在 window 对象中，我们可以直接使用，节省我们的时间。所以我做了一个查看全局的函数。这个函数很好用了，查看函数的时候可以，但是遇到复杂的对象，里面层层包裹，用人力想要找到匹配的数据就很难了。所以我开发了 searchObj ，利用正则来匹配每一个属性和值，最终按照对象的结构返回，这样就可以完整地获取搜索值的位置并有效引用了。searchWindow 则是最为好用的操作了，对 window 对象直接搜索，所有的匹配数据都可以找到了。
### [JSpider教程](../JSpider.md)
<br>

## :hammer:  快速开始

###  包含在 JSpider 中

Search 模块包含在常用类型中，

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/Search.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/Search.js').then(res=>window.Search = res)
```

<br>

### :star: 全局变量查看

#### Search.Globals()

```js
let a =new JSpider()
a.Search.Globals()
```

<br>

### :star: 对象搜索

#### Search.searchObj(obj,RegExp[,maxDepth])

```js
let obj = {
    name: ['张三', '李四', {
        name: '王五张'
    }],
    age: 30,
    sex: undefined,
    work: {
        java: "张六",
        php: "五张",
        java: "目录"
    }
}

let spider = new JSpider()
spider.Search.searchObj(obj,/张/)
```

在数组中为了保持数据的结构不被破坏，使用 *** 作为表示非匹配的数据。

<br>

### :star: window 搜索

#### Search.searchWindow(RegExp[,maxDepth])

```js
var si=11
var s2 ='中文s'
var i = ['ss','ssr','vv','sssr']
var spider = new JSpider()
spider.Search.searchWindow(/s/i)
```

# [JSpider](../JSpider.md)