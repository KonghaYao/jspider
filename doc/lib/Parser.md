---
title: JSpider——Parser模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# :closed_book: JSpider——Parser 模块

## :pencil2: 介绍

Parser 模块是用来处理文本数据的 HTML 格式或者是 XML 格式 的模块
### [JSpider教程](../JSpider.md)
<br>

## :hammer: 快速开始

###  包含在 JSpider 中

HTMLParser 包含在 JSpider 的三个版本类型中，通过引入 JSpider 类即可使用。

XMLParser 除了 core 版本外都已经自带了。

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/HTMLParser.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/HTMLParser.js').then(res=>window.HTMLParser = res)
```

<br>

## :star: HTMLParser 模块

HTMLParser 模块用于批量解析 HTML 文本。

注意： HTML 字符串必须包含 body 标签，如果不包含可以自己添加一下，再使用。

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
let a = new JSpider()
a.ajax({
    urls,options,type:'sync'
})
a.HTMLParser(a.result,(dom)=>{
    dom.querySelectorAll('a').forEach(i=>i.remove())
    return dom.innerText
})
a.parseResult
```



## :star: XMLParser 模块

XMLParser模块是专门用来处理 XML 字符串的函数。

注意，这个函数不是批处理函数，只是一个接受 XML 字符串并返回 JSON 数据的模块。

这里使用了 [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) 进行转化。

```js
let a = new JSpider()
let json = a.XMLParser(XMLString)

let jsonArr = a.result.map(i=>a.XMLParser(i))
```

#  [JSpider](../JSpider.md)

