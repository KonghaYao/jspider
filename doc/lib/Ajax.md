---
title: JSpider——Ajax模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# :closed_book: JSpider——Ajax 模块

## :pencil2: 介绍

这个模块是 JSpider 的核心模块，通过控制请求频率来达到批量请求的效果。

### [JSpider教程](../JSpider.md)
<br>

## :hammer: 快速开始

### Ajax 包含在 JSpider 中

Ajax 包含在 JSpider 的三个版本类型中，通过引入 JSpider 类即可使用

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/Ajax.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/Ajax.js').then(res=>window.Ajax = res)
```

### 快速爬取

```js
//加载js模块完成之后
let spider = new JSpider()
//然后就可以使用各种函数了
spider.ajax({
  urls:[
    //数组内可以是url字符串或者是下面的对象
    'https://cdn.jsdelivr.net/npm/js-spider@1.3.0/JSpider-pro.js',
    {
      url:'https://cdn.jsdelivr.net/npm/js-spider@1.3.0/JSpider-core.js',
      options:(opt)=>{
        //这里可以修改原来的options
        return opt
      }
    }
    ],
  options:{
    method:'GET'
  },//默认的options
  limits = 3, 
  time = 200, 
  type = "sync"//可以填 sync async time
})
//请求完成之后就会在 spider.result 中有结果
```
<br>
## :book: 详细解答

### :star: ajax(Object)

ajax 方法是批量请求的入口函数，通过设置初始参数，就可以开始爬取文件了。

| 属性    | 数据类型                                                     | 详细情况                                                     |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| urls    | Array<br />[‘http://’,{<br />url:’http://….‘,<br />options:(opt)=>opt<br />}] | urls 属性表示了你要爬取的 URL 地址，这是一个 Array , 里面包含 URL字符串 或 一个对象，并且可以混合。<br />对象中的 options 是一个修改原来请求 options 的函数 |
| options | Object<br />与 fetch 的 options 是一致的                     | 这是默认的 fetch 的 options 属性，包含了 headers 和 body等请求的详细情况。<br />在 urls 中的对象可以通过 options 属性设置一个函数来修改 options 作为那个 url 的 options 使用。配合 limit 属性使用。 |
| type    | async\|sync\|time<br />String                                | async 模式: 这个模式会将 URL 一个一个请求，确定完成一次后再发送下一个请求。<br/>sync 模式: 这个模式会将 多个 URL （默认3个）一起发送，确定这一批 URL 请求成功后再请求下一批。<br />time 模式: 这个模式会每间隔一定时间发送一个请求，配合 time 属性使用。 |
| limit   | Number                                                       | 填入 每次同时发送请求的数目。<br />配合 sync 模式使用。      |
| time    | Number                                                       | 每次间隔的时间。<br />配合 time 模式使用。                   |

### :star: 结果

请求结果会先转化为 Blob 类型，根据 type 不同处理 文本 和 json ，若不是这两种，则返回 Blob 数据。

请求的结果保存在 JSpider 实例的 result 中。

# [JSpider](../JSpider.md)