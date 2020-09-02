---
title: JSpider——Downloader模块
date: 2020/8/30
author: KonhaYao
tags:
  -Jspider
---

# JSpider——Downloader 模块

## :pencil2: 介绍

Downloader 模块是用来批量下载 Blob 或者是 String 格式的数据的一个便捷的模块。
### [JSpider教程](../JSpider.md)
<br>

## :hammer: 快速开始

###  包含在 JSpider 中

Downloader 包含在 JSpider 的三个版本类型中，通过引入 JSpider 类即可使用。

### JsDelivr cdn 载入链接解析

https://cdn.jsdelivr.net/npm/js-spider/lib/Downloader.js

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/lib/Downloader.js').then(res=>window.Downloader = res)
```

<br>

## :book: Downloader

Downloader 在 JSpider 的名称为 download。

### :star: download(fileList, nameList = [], needZip = false)

| 参数     | 类型                                                     | 描述                                                      |
| -------- | -------------------------------------------------------- | --------------------------------------------------------- |
| fileList | File，Blob 或 String 组成的数组                          | 要下载的文件<br />可以在Blob类型的数据 的name属性赋值名称 |
| nameList | 重命名的数组<br />或者只是带需要替换的序号的键值对的对象 | {0:’1.txt’,2:’2.txt’}                                     |
| needZip  | Boolen                                                   | 是否强制压缩                                              |

### 详细

#### 浏览器中最大同时下载的文件数为 10 

这个是在我尝试爬取 m3u8 文件分片的时候发现的，Chrome不能够下载完全，只能下载前10个，后面的所有文件都没了。

所以我使用了 [JSZip](https://github.com/Stuk/jszip) 这个库，当下载数多于 10 时自动压缩，当然也可以通过 needZip 强制压缩。

### 例子

```js
let a =new JSpider()
a.download([file1,file2],[],true)
a.download([file1,'中',{0:1,2:2}],{2:'这是一个JSON.json'},true)
```

# [JSpider](../JSpider.md)