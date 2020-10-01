---
title: JSpider——Ajax模块
version: 2.0
date: 2020/9/16
author: KonhaYao
tags:
  -Jspider
---

# :book: JSpider——Ajax 模块 2.0

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
按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/npm/js-spider/src/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/src/Ajax.js')
    .then(res=>window.Ajax = res)
    
// ES5 可以直接在 script 标签中引入
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



<br>
### :star: 结果的处理
请求结果会根据response Headers 中的 `content-type` 属性判断怎样处理返回的数据, 但是有时候会出现一点小问题。

比如，后台返回 `content-type` 为 application/json，会直接转化为 对象格式，但是，若后台返回 `content-type` 为 `text/plain` , 将会返回文本。

相较于 1.0.0 版本，**所有返回的结果都是一维数组** 。



## ​:alembic:​ pipe 请求
pipe 在 JSpider 2.0.4 加入，用于爬取那些每次请求使用了上一次的请求来验证身份的请求。

```js
let spider = new JSpider();
await spider.Ajax({
    urls:
        "http://*",
    options: {
        headers: {
            //填入初始的headers
        }
    },
    type: "pipe",
    func: function (res, args) {
       let index = args[0];
       let nextURL = '';
       // 返回结构 :
       // [boolean|true为继续请求,[url|请求的url,options|覆盖初始 options 的对象]]
        return [index<=5,[ nextURL,{
                    headers: {
                        "x-zse-86": ''
                    },
                }]];
    }
});
```
### `urls`
`urls` 在 `pipe 类型`请求时，必须为单个字符串。这个字符串是第一次请求的 URL。

后面的 `func` 会修改每一次的 URL 所以不用担心后面的请求。 
#### 关于新属性 `func`
`func` 是每一次请求的时候的规则定义，`func` 需要填入一个函数。
##### 接入参数：
##### res 
它是上一次请求的结果，如果要用到的请求参数中使用到上一次请求的结果参数的话，就可以使用它。
##### args 
它是总的请求环境，是一个数组类型。
具体为 [index|当前请求次数]
当我想要扩充功能的时候，可能会修改这个参数。

#### 函数返回值
这个函数的返回值需要按指定格式返回。
**[boolean | 传入true为继续请求 , [ url | 第二次请求的url , options | 覆盖初始 options 的对象的属性的对象]]**

第一是 **布尔值**
代码依靠这个判断是否继续请求，填入 true 时会结束请求，所以这个是可以形成死循环不断请求的，要小心使用。

第二个是**一个数组 [ url , options ]**
`url` 是下一次请求的 url
`options` 作为对象，可以覆盖默认的 options，实现传递不同的请求参数。


## [推荐下一篇——Parser](./Parser.md)
# [JSpider](../JSpider.md)