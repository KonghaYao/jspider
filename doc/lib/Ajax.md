---
title: JSpider——Ajax模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# :book: JSpider——Ajax 模块

## :pencil2: 介绍
这个模块是 JSpider 的核心模块，通过控制请求频率来达到批量请求的效果。

<br>

## 闲聊
当我在一开始使用 javascript 做爬虫的时候，我需要把多次的 **fetch 分批或者是分时间** 发送，才能得到众多的数据。

但是遇到某些根据请求频率来限制的网页就有可能请求失败，所以我想要从频率上控制请求的频率，这就涉及到了请求的并发数和请求的间隔时间的问题，所以我在 2.0.0 版本中直接使用 **limits 和 time** 来直接控制请求频率，而不是 1.0.0 的 type。

**type** 原来是用来避免使用者直接发动大量的访问，所以需要使用 type 指定命令。在 2.0.0 中，type 为 start 时，将启动批量请求，否则将进行请求测试。

请求测试将会发送一次三个并发请求。

<br>

## :hammer: 快速开始

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/Ajax.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/Ajax.js')
    .then(res=>window.Ajax = res)
```

### :airplane: 快速爬取

```js
//加载js模块完成之后
//这是一个测试文件
let spider = new JSpider();
let urls = [
    "/",
    ...[...Array(10).keys()].map((i) => {
        return {
            url: "/",
            options: {
                headers: {
                    "content-type": "text/plain; charset=utf",
                },
                body: JSON.stringify({ index: i }),
            },
        };
    }),
    "/",
];
let result = await spider.Ajax({
    urls,
    options: {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
    },
    type: "start",
});
```
<br>
## :book: 详细解答

### :star: ajax(Object)

ajax 方法是批量请求的入口函数，通过设置初始参数，就可以开始爬取文件了。

| 属性    | 数据类型                                                     | 详细情况                                                     |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| urls    | Array<br />里面可以包含对象或字符串 | urls 属性表示了你要爬取的 URL 地址，这是一个 Array , 里面包含 URL字符串 或 一个对象，并且可以混合。<br />对象中的 options 可以单独覆盖某一个默认 options 的键值对 |
| options | Object <br /> 与 fetch 的 options 是一致的                     | 这是默认的 fetch 的 options 属性，包含了 headers 和 body等请求的详细情况。配合 limit 属性使用。 |
| type    | start(String)                     | start 时启动爬取，非 start 时自动开启，测试爬取 |
| limit   | Number                                                       | 分批请求的并发数。     |
| time    | Number                                                       | 每批次间隔的时间。             |

### :star: 结果的处理
请求结果会根据下面的规则帮助您快速处理请求到的数据。结果相较于 1.0.0 版本，所有 **返回的结果都是一维数组** 。

请求结果会先转化为 Blob 类型，根据 type 不同处理 文本 和 json ，若不是这两种，则会返回 Blob 数据。


## [推荐下一篇——Parser](./Parser.md)

# [JSpider](../JSpider.md)