# :book: JSpider 2.0.0+ Beta
![Version](https://img.shields.io/badge/Version-1.3.22-blue.svg) ![MIT](https://img.shields.io/badge/License-MIT-green.svg) ![Javascript](https://img.shields.io/badge/Javascript->=%20ES5-green.svg)
![platform](https://img.shields.io/badge/Platform-Browser-red.svg) <a href='https://gitee.com/dongzhongzhidong/jspider/stargazers'><img src='https://gitee.com/dongzhongzhidong/jspider/badge/star.svg?theme=dark' alt='star'></img></a> <a href='https://gitee.com/dongzhongzhidong/jspider/members'><img src='https://gitee.com/dongzhongzhidong/jspider/badge/fork.svg?theme=dark' alt='fork'></img></a>

### :book: [完整教程](http://dongzhongzhidong.gitee.io/jspider)
## :o: 因为版本情况不一，请使用最新版！完整教程已经更新！

## 2.0.0+ 重要更改
将模块移至 src 文件夹，所以引用模块使用 https://cdn.jsdelivr.net/npm/js-spider/src/Ajax.js

## :pencil2: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于 Python 的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开新的 python 脚本要轻松得多。所以我写了这个 JSpider 工具类来替代那些繁琐的 JS 代码，使得我们能够在前端直接爬取或者提前测试爬虫代码，提高我们的爬虫效率。

##### 这个网页已经载入了JSpider，可以使用开发者工具打开，观看例子的时候可以试着做一做。

##### :bangbang: 注意: 2.0.0 + 版本语法与 1.0.0 + 版本语法不同。

<br>

## :closed_book: [版本情况](http://dongzhongzhidong.gitee.io/jspider#/Version.md)

<br>


## :hammer: 快速开始
###  JsDelivr cdn 载入链接解析

按 ES 版本引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.es5.js](#)


### 如何单独导入

若只想在文件中使用一个模块可以使用下面的方式导入。

`import hook from "https://cdn.jsdelivr.net/npm/js-spider/src/Observer/hook.js"`

所有的模块都放置在 src 文件夹下，而且模块名首字母大写。单个函数名为小写。

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


//请求完成之后就会在 result 中有结果
```

<br>

## :gear: 推荐阅读顺序

完成下面的阅读，我们可以入门 JSpider 的基本爬取功能。

#### [Ajax 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Ajax.md)
#### [Parser 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Parser.md)
#### [Downloader 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Downloader.md)

完成下面的阅读，我们可以使用一些额外的功能（非主要）。

#### [Script 函数](http://dongzhongzhidong.gitee.io/jspider#/src/Script.js) 
#### [Copy 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Copy.md)
#### [Cookies 对象](http://dongzhongzhidong.gitee.io/jspider#/src/Cookies.js)


完成下面的高级阅读，我们可以方便地提高分析网页方面的速度。

#### [Search 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Search.md)
#### [Observer 模块](http://dongzhongzhidong.gitee.io/jspider#/src/Observer.md)


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
展开后可以在 window 中直接使用 JSpider 的函数。
```js
Object.assign(window,JSpider.prototype);
```

<br>

## :dart: 与 1.0.0 版本的不同

### 全面模块化
1.0.0 系列的 JSpider 的代码并没有实现完全的模块化开发，使得每个文件很庞大，很难进行查看和更新，所以 2.0.0 系列开始全面使用 ES6 的 import 实现模块化。

### 单纯地处理数据
1.0.0 版本掺杂了数据的存储功能（parseResult 等），所以导致 JSpider 中变量过于复杂，想要取这些变量的时候的单词长度又很长。所以 2.0.0 剔除了数据的存储功能，改为直接由函数返回结果，所以需要使用变量来存储。

同时，由于使用了异步处理，除了 Downloader 不能控制下载过程外，几乎都可以使用异步进行统一操作。

### 使用高阶函数进行爬取
由于 1.0.0 的函数其实是多种函数和基础函数杂糅在一起，所以在 2.0.0 中将 **高级函数** 用 **基础函数** 实现，便于使用者使用。


<br>




<br>

## :rainbow: 开发者使用说明
### 如何测试 JSpider
这个项目中的 test.html 打开，然后进控制台就已经导入了 JSpider 了，可以直接使用。


### 如何找到模块的源文件
在根目录下的 JS 文件是 JSpider 的入口文件，
所有的模块放置在 src 文件夹下，
如果模块较大，可以在同名的文件夹下找到分模块。


### 单独载入 js 模块文件
基本上所有的模块都可以脱离 JSpider 使用,
引入方式为 使用 [JsDeliver](http://www.jsdelivr.com/) 提供的 URL 和 ES6 的 import 来导入你的浏览器。


### 浏览器不支持 ES6 但支持 ES5
可以使用 webpack 打包 JSpider 文件，然后再引入就可以了,下面是 webpack 打包好的地址。
- [x] **ES5 版本打包文件**  https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.es5.js


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
