# JSpider

### :alembic: [完整教程]()

### :pencil: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于 Python 的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开新的 python 脚本要轻松得多。
所以我写了这个 JSpider 类来替代那些繁琐的 JS 代码。


<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>
### 快速开始

#### JsDelivr cdn 载入  

链接解析

https://cdn.jsdelivr.net/npm/js-spider@1.3.0/JSpider-pro.js

[https://cdn.jsdelivr.net/npm/js-spider@ **版本号** /JSpider- **类型** .js]()

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider@1.3.0/JSpider-core.js').then(res=>window.JSpider = res.default)
```

#### 快速爬取
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

#### 引入额外的模块
```js
let spider =new JSpider()
spider.extend('Search')
spider.extend(['Hook','Cookies'])
```

<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>

### 软件架构
JSpider 分为 

- 请求模块
  -  Ajax 
<br>
- 解析模块
  - HTML文本解析模块
    - HTMLParser
  - XML文本解析模块
    - XMLParser
<br>
- 批量下载模块
  - Downloader
<br>
- 分析模块
  - Observer 模块
    - Hook
    - Observer
  - Search 模块
    - searchWindow
    - searchObj
    - Globals
<br>
- 扩展模块
  - extend
  - Script
<br>
- 专用模块
  - m3u3Downloader
  - Copy
  - Cookies
<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>

### 各个模块解析

#### 如何导入
各个模块可以通过 `extend(['Ajax','Hook'])` 来导入。
若只想在文件中使用一个模块可以 
`import Hook from "https://cdn.jsdelivr.net/npm/js-spider@1.3.0/lib/Hook.js"`
所有的模块都放置在 lib 文件夹下，而且模块名首字母大写。

#### Ajax 模块

Ajax 模块包含批量网络请求的基础函数，能够进行批量的网络请求。
#### HTMLParser 和 XMLParser
对于 HTML ，XML 文本的解析函数。

#### Downloader 模块
用于下载文件，可以下载文本和 Blob 数据。

#### Hook 模块
Hook 模块用于控制函数，当函数被触发时会先执行我们的函数。

#### Search 模块
这个模块包含了三个函数，能够对 window 对象进行全面的搜索。

#### Script 模块
通过 URL 导入其他的 JS 或 CSS 文件。

#### Cookies 模块
这个模块用于处理 cookie 字符串。

#### Observer 模块
这个模块通过代理函数和对象来实现监控操作。

<br>
###  :dove:  鸽子工程 :dove: :dove: :dove: :dove: :dove:
 下面的类型为包含关系 
 例如：后面的类型包含前面的类型的内容
- [x] 表示已经实现 功能可以通过extend函数引入

:heavy_check_mark: 表示使用正常

:alembic: 表示实验性函数
<br>

#### JSpider-core.js 核心类型
- [x] :heavy_check_mark: 并发请求  (已经将队列请求包括了) 

- [x] :heavy_check_mark: 定时请求 

- [x] :heavy_check_mark: 批量下载并使用zip打包(JSZip) 

- [x] :heavy_check_mark: 当爬取到数据之后将 HTML 文本解析 

- [x] :heavy_check_mark: 可以载入外部的css或js文件 

<br>

#### JSpider-nor.js 常用类型
- [x] :heavy_check_mark: XML解析: XML (String) ==> Object 


- [x] :heavy_check_mark: Search模块: 用正则表达式搜索对象内容 

- [x] :heavy_check_mark: Cookies 函数 

<br>

#### JSpider-pro.js 强化类型

- [x] :alembic: hook 函数: 用于代理函数 

- [x] :alembic: Watch : 对象监听函数

<br>

#### Extentions 扩展函数

- [ ] :alembic: m3u8Downloader: m3u8文件的下载器

- [ ] :alembic: Copy : 与剪贴板有关的函数



<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>




## 开发者使用说明

#### 如何测试 JSpider
这个项目中的 test.html 打开，然后进控制台就有了，
默认是 pro 类型

#### 如何找到模块的源文件
在根目录下是 JSpider 的入口文件，
所有的模块放置在 lib 文件夹下，
如果模块较大，可能在同名的文件夹下找到分模块。

#### 单独载入 js 模块文件
基本上所有的模块都可以脱离 JSpider 使用,
引入方式为 使用 [JsDeliver](http://www.jsdelivr.com/) 提供的方式 来导入你的浏览器

