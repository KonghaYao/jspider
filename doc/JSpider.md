---
title: JSpider 2.0
date: 2020/9/14
author: KonhaYao
NPM: https://www.npmjs.com/package/js-spider
Github: https://github.com/KonghaYao/jspider
Gitee: https://gitee.com/dongzhongzhidong/jspider
---

# :book: JSpider 教程
## Version ：2.0.0 +
## :pencil2: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于 Python 的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开新的 python 脚本要轻松得多。所以我写了这个 JSpider 类来替代那些繁琐的 JS 代码，使得我们能够在前端直接爬取或者提前测试爬虫代码。

##### 这个网页已经载入了JSpider，可以使用开发者工具打开，观看例子的时候可以试着做一做。

##### :bangbang: 注意: 2.0.0 + 版本语法与 1.0.0 + 版本语法不同, 1.0.0 + 版本教程。

### :closed_book: [版本情况](./Version.md)

<br>
## :gear: 软件架构
JSpider 架构 可以点击查看详细的操作
- [请求模块 ----- Ajax](./lib/Ajax.md)
<br>
- [解析模块 ----- Parser](./lib/Parser.md)
    - HTML文本解析模块 -----  HTMLParser
    - XML文本解析模块 -----  XMLParser
    - 转化为 Markdown ----- TurnToMarkdown
<br>
- [批量下载模块 ----- Downloader](./lib/Downloader.md)
<br>
- [监视模块 ----- Observer](./lib/Observer.md)
    - Hook
    - Observer
<br>
- [搜索模块 ----- Search](./lib/Search.md)
    - searchWindow
    - searchObj
    - Globals
<br>
- 扩展模块
    - extend
    - Script
<br>
- 专用模块
    - Copy
    - Cookies
<br>



## :hammer: 快速开始
###  JsDelivr cdn 载入链接解析

按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/npm/js-spider/lib/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入

import('https://cdn.jsdelivr.net/npm/js-spider/JSpider-core.js')
  .then(res=>window.JSpider = res.default)

// ES5 可以直接在 script 标签中引入
```

### :airplane: 快速爬取
请打开您的浏览器 开发者工具 
快捷键：**F12** or **Ctrl+SHIFT+C**

```js

//加载js模块完成之后

let spider = new JSpider();

let urls = [
    "/",
    {
        url: "/",
        options: {
            headers: {
                "content-type": "text/plain; charset=utf",
            },
            body: JSON.stringify({ index: 100 }),
        },
    },
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


//请求完成之后就会在 spider.result 中有结果
```

<br>

## :bee: 高级函数集
JSpider 高级函数集是通过 Extend 函数导入的。高级函数集中包含了便捷的工具，是 JSpider 的基础模块的联合，目的是为了帮助使用者快速开始爬虫。

导入的函数放置在 JSpider 实例中。

```js
let spider = new JSpider();
spider.Extend();
```

<br>

### :candy: 展开 JSpider 到 window 对象
展开后可以在 window 中直接使用 JSpider 的函数
```js
Object.assign(window,JSpider.prototype);
```


<br>

## :dart: 各个模块解析
### 如何单独导入

若只想在文件中使用一个模块可以使用下面的方式导入。

`import Hook from "https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js"`

所有的模块都放置在 lib 文件夹下，而且模块名首字母大写。单个函数名为小写。

<br>

### 请求，处理，持久化系列模块
#### [Ajax 模块](./lib/Ajax.md)
Ajax 模块包含批量网络请求的基础函数，能够进行批量的网络请求。

#### [Parser 模块](./lib/Parser.md)
提供文本包括 XML，HTML等数据的常用转换。

#### [Downloader 模块](./lib/Downloader.md)
用于下载文件，可以下载文本和 Blob 数据。

<br>

### 分析系列模块

#### [Search 模块](./lib/Search.md)
这个模块包含了两个函数，能够对一个对象进行全面的搜索。

#### [Observer 模块](./lib/Observer.md)
这个模块通过代理函数和对象来实现监控操作。

<br>

### 扩展功能

#### Extend 函数


##### [Script 函数](./lib/Script.js) 
通过 URL 导入其他的 JS 或 CSS 文件。


##### [Cookies 函数](./lib/Cookies.js)
这个模块用于处理 cookie 字符串。


##### [Copy 模块](./lib/Copy.md)
这个模块提供了一个破解网页禁止复制的函数和一个复制到剪贴板的函数。

<br>

## 与 1.0.0 版本的不同

### 全面模块化
1.0.0 系列的 JSpider 的代码并没有实现完全的模块化开发，使得每个文件很庞大，很难进行查看和更新，所以 2.0.0 系列开始全面使用 ES6 的 import 实现模块化。

### 单纯地处理数据
1.0.0 版本掺杂了数据的存储功能（parseResult 等），所以导致 JSpider 中变量过于复杂，想要取这些变量的时候的单词长度又很长。所以 2.0.0 剔除了数据的存储功能，改为直接由函数返回结果，所以需要使用变量来存储。

同时，由于使用了异步处理，除了 Downloader 不能控制下载过程外，几乎都可以使用异步进行统一操作。

### 使用高阶函数进行爬取
由于 1.0.0 的函数其实是多种函数和基础函数杂糅在一起，所以在 2.0.0 中将 **高级函数** 用 **基础函数** 实现，便于使用者使用。

<br>


## :rainbow: 开发者使用说明
### 如何测试 JSpider
这个项目中的 test.html 打开，然后进控制台就已经导入了 JSpider 了，可以直接使用。


### 如何找到模块的源文件
在根目录下的 JS 文件是 JSpider 的入口文件，
所有的模块放置在 lib 文件夹下，
如果模块较大，可以在同名的文件夹下找到分模块。


### 单独载入 js 模块文件
基本上所有的模块都可以脱离 JSpider 使用,
引入方式为 使用 [JsDeliver](http://www.jsdelivr.com/) 提供的 URL 和 ES6 的 import 来导入你的浏览器。


### 浏览器不支持 ES6 但支持 ES5
可以使用 webpack 打包 JSpider 文件，然后再引入就可以了。
- [x] **ES5 版本打包文件**  https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js


### 跨域问题
跨域问题可以通过谷歌插件，使用转接服务器等手段解决，只凭借 浏览器端 Javascript 无法解决。


### 绕过 [CSP 协议](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 加载 JSpider
这个 CSP 协议是为了防止文件的非正常途经载入而使用的。所以，通过 script 标签和 import 引入不了文件，但是fetch 和 XHR 都是可以请求到文件的，但是然后以 Blob 数据接收并转化为字符串，使用 eval 注入脚本，可以绕过 CSP 协议。

使用开发者工具中的 **snippets** 保存 ES5 版本的JSpider，然后可以点击使用，但是导入额外的依赖可能会失败。


<br>

## 相关依赖

[JSZip](https://github.com/Stuk/jszip): 一个前端压缩数据的库。

[fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser): XML => JSON 的库。 

[turndown](https://github.com/domchristie/turndown/)：将 HTML 文本转换为 Markdown 文本的插件
