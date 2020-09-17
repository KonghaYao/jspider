---
title: JSpider——Parser模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# :book: JSpider——Parser 模块

## :pencil2: 介绍

Parser 模块是用来处理文本数据的 HTML 格式或者是 XML 格式 的模块

<br>

## 闲聊
在请求结束以后，若只是爬取到少量的数据还可以手写代码，但是对于很多的数据的话就会出现很多错误，花费时间很多，所以我写了这个模块来处理爬取到的数据。

最先出现的是 **HTML 解析模块**，用于将 HTML文本转化为 DOM 元素进行操作。

后来接触到了 [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) 这个 XML 转 对象 的 JS 库，所以就写了一个接口。

然后是遇到储存时的困难，一般来说，储存 HTML 文本没有很大意义，所以我一般使用 markdown 文本存储，所以依赖了 [turndown.js](https://github.com/domchristie/turndown/) 来将 HTML 文本转化为 markdown 文本，然后下载就好多了。


<br>

## :hammer: 快速开始

###  包含在 JSpider 中

HTMLParser 包含在 JSpider 的三个版本类型中，通过引入 JSpider 类即可使用。

XMLParser 除了 core 版本外都已经自带了。

### JsDelivr cdn 载入链接解析

按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/npm/js-spider/lib/模块名.js](#)
```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/HTMLParser.js')
      .then(res=>window.HTMLParser = res)
      
// ES5 可以直接在 script 标签中引入
```

<br>

## :candy: HTMLParser 模块

HTMLParser 模块用于批量解析 HTML 文本。

注意： HTML 字符串必须包含 body 标签，如果不包含可以自己添加一下 body 标签再使用 HTMLParser。

<br>

### HTMLParser(parseList, parsefunc)

| 参数      | 类型                                            | 描述                               |
| --------- | ----------------------------------------------- | ---------------------------------- |
| parseList | Array                                           | 这个必须是包含HTML字符串的一维数组 |
| parsefunc | (dom)=>{<br /><br />return dom.innerHTML<br />} | 处理 body 标签中的 dom 元素的函数  |

#### parseList

parseList 必须是一维数组，因为在 ajax 函数之后收到的数据可能是分好类的二维数组，所以需要注意。

#### parsefunc

parsefunc 可以接收 HTMLParser 处理好的 dom 元素，并将返回的数据集中在 JSpider 实例的 parserResult（Array） 中。经常我们需要跨页操作 JS ，其实可以在一个页面使用 JS 函数进行跨页面爬取 HTML 数据，并使用这个函数来分类数据。

#### 例子

```js
let spider = new JSpider()
let res = spider.Ajax({
    urls,options,type:"start"
})
let parseResult = spider.HTMLParser(res,(dom)=>{
    dom.querySelectorAll('a').forEach(i=>i.remove())
    return dom.innerText
})

```

<br>

## :candy: XMLParser 模块

XMLParser模块是专门用来处理 XML 字符串的函数。

这里使用了 [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) 进行转化。

```js
let spider = new JSpider()
let json = spider.XMLParser([XMLString])

```

<br>

## :candy: TurnToMarkdown
TurnToMarkdown 是用来将 HTML 格式转化为 Markdown 格式的一个模块，主要是封装了 [turndown.js](https://github.com/domchristie/turndown/) ，使得 JSpider 能够将爬取到的 HTML 文件转化为 Markdown 字符串，然后保存为 md 文件。

```js
let spider = new JSpider()
let MarkdownString = spider.TurnToMarkdown([HTMLString])
```

## [推荐下一篇——Downloader](./Downloader.md)

#  [JSpider](../JSpider.md)

