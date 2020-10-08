---
title: JSpider——Search模块
version: 2.0
date: 2020/9/15
author: KonghaYao
tags:
  -Jspider
---

# :book: JSpider —— Search 模块 2.0

## :pencil2: 介绍

Search 模块是用来搜索对象中的数据的，同时携带了一个获取全局变量的函数。

<br>

## 闲聊
在做爬虫的时候，我们经常会发现很多的函数已经内置在 window 对象中，我们可以直接使用，节省我们看源代码写代码时间。

所以我做了一个能够查看全局变量的函数( **Globals** )，这个函数很好用，查看函数或是变量的时候可以很快找到。

但是遇到复杂的对象，里面层层包裹，用人力想要找到匹配的数据就很难了。所以我开发了 **searchBase** ，利用正则来匹配每一个属性和值，最终按照对象的结构返回，这样就可以完整地获取搜索值的位置并有效引用了。

配合两个函数时，可以直接搜索全局变量，这就是使用最多的强大操作。

<br>

## :hammer:  快速开始

###  包含在 JSpider 中

Search 模块包含在常用类型中，

### JsDelivr cdn 载入链接解析
按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/npm/js-spider/src/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/src/Search.js')
            .then(res=>window.Search = res)
            
// ES5 可以直接在 script 标签中引入
```

<br>

### :candy: 全局变量查看

#### Search.Globals()

```js
let spider =new JSpider()
spider.Search.Globals()
```

<br>

### :candy: 对象搜索

#### Search.search(obj,RegExp[,maxDepth])

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
spider.Search.search(obj,/张/)
```

在数组中为了保持数据的结构不被破坏，使用 *** 作为表示非匹配的数据。

<br>

### :candy: window 搜索
searchWindow 在 1.0.0 版本中可以使用，但是在 2.0.0 版本中删除了这个函数，下面的这种操作依然可以实现这个功能。

```js
var si=11
var s2 ='中文s'
var i = ['ss','ssr','vv','sssr']
var spider = new JSpider()
spider.Search.search(window,/s/i)
```

## [推荐下一篇 —— Observer](./Observer.js)
# [JSpider](../JSpider.md)