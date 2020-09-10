# :book: JSpider
![Version](https://img.shields.io/badge/Version-1.3.22-blue.svg) ![MIT](https://img.shields.io/badge/License-MIT-green.svg) ![Javascript](https://img.shields.io/badge/Javascript->=%20ES6-red.svg)
![platform](https://img.shields.io/badge/Platform-Browser-red.svg) <a href='https://gitee.com/dongzhongzhidong/jspider/stargazers'><img src='https://gitee.com/dongzhongzhidong/jspider/badge/star.svg?theme=dark' alt='star'></img></a> <a href='https://gitee.com/dongzhongzhidong/jspider/members'><img src='https://gitee.com/dongzhongzhidong/jspider/badge/fork.svg?theme=dark' alt='fork'></img></a>

### :book: [完整教程](http://dongzhongzhidong.gitee.io/jspider)
## :o: 因为版本情况不一，请使用最新版！完整教程已经更新！

### :pencil2: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于 Python 的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开新的 python 脚本要轻松得多。
所以我写了这个 JSpider 类来替代那些繁琐的 JS 代码。

## :bangbang:  注意
这个项目依赖 ES6 import 语法，所以某些浏览器可能不支持，推荐使用打包后的文件进行操作。
使用这个爬虫脚本时，需要使用者能够使用 **async，await ，Promise，import** 等较新的语法。

<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>

### :airplane: 快速开始

#### JsDelivr cdn 载入  

链接解析

https://cdn.jsdelivr.net/npm/js-spider/JSpider-pro.js

[https://cdn.jsdelivr.net/npm/js-spider/JSpider- **类型** .js]()

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/JSpider-core.js').then(res=>window.JSpider = res.default)
```

<br>

#### :alembic: 推荐——载入打包文件
通过下面这个 URL 载入的 JS 文件是用在浏览器版本低导致模块无法使用的情况！
推荐在不熟悉浏览器的时候使用，因为是 webpack 打包的文件，支持 ES5 。
```js
'https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.js'
```
<br>

#### :hammer: 快速爬取

```js
//加载js模块完成之后
let spider = new JSpider()
//然后就可以使用各种函数了
spider.ajax({
  urls:[
    //数组内可以是url字符串或者是下面的对象
    'https://cdn.jsdelivr.net/npm/js-spider/JSpider-pro.js',
    {
      url:'https://cdn.jsdelivr.net/npm/js-spider/JSpider-core.js',
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

#### :candy: 引入额外的模块

```js
let spider =new JSpider()
spider.extend('Search')
spider.extend(['Hook','Cookies'])
```

**:book: [完整教程](http://dongzhongzhidong.gitee.io/jspider)**

<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>

### :gear: 软件架构
JSpider 分为 

- 请求模块
    -  Ajax 
- 解析模块
    - HTML文本解析模块
        - HTMLParser
    - XML文本解析模块
        - XMLParser
- 批量下载模块
    - Downloader
- 分析模块
    - Observer 模块
        - Hook
        - Observer
    - Search 模块
        - searchWindow
        - searchObj
        - Globals
- 扩展模块
    - extend
    - Script
- 专用模块
    - m3u3Downloader
    - Copy
    - Cookies
<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>

### :dart: 各个模块解析

#### 如何导入
各个模块可以通过 `extend(['Ajax','Hook'])` 来导入。
若只想在文件中使用一个模块可以 

`import Hook from "https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js"`

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

#### :star: JSpider-core.js 核心类型
- [x] :heavy_check_mark: 并发请求  (已经将队列请求包括了) 

- [x] :heavy_check_mark: 定时请求 

- [x] :heavy_check_mark: 批量下载并使用zip打包(JSZip) 

- [x] :heavy_check_mark: 当爬取到数据之后将 HTML 文本解析 

- [x] :heavy_check_mark: 可以载入外部的css或js文件 

<br>

#### :star:​ JSpider-nor.js 常用类型
- [x] :heavy_check_mark: XML解析: XML (String) ==> Object 


- [x] :heavy_check_mark: Search模块: 用正则表达式搜索对象内容 

- [x] :heavy_check_mark: Cookies 函数 

<br>

#### :star: JSpider-pro.js 强化类型

- [x] :heavy_check_mark: hook 函数: 用于代理函数 

- [x] :alembic: Watch 函数: 对象监听函数

<br>

#### :star: Extentions 扩展函数

> 这些模块将不会被上面的类型包含，但是可以通过 extend 导入。

- [x] :alembic: Copy : 与剪贴板有关的函数



<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 

<br>




## :rainbow: 开发者使用说明

#### 如何测试 JSpider
这个项目中的 test.html 打开，然后进控制台就已经导入了 JSpider 了，默认是 pro 类型。

#### 如何找到模块的源文件
在根目录下的 JS 文件是 JSpider 的入口文件，
所有的模块放置在 lib 文件夹下，
如果模块较大，可以在同名的文件夹下找到分模块。

#### 单独载入 js 模块文件
基本上所有的模块都可以脱离 JSpider 使用,
引入方式为 使用 [JsDeliver](http://www.jsdelivr.com/) 提供的 URL 和 ES6 的 import 来导入你的浏览器

#### 如何支持 ES5 ?
可以使用 webpack 打包 JSpider 文件，然后再引入就可以了。
- [x] 提供打包后文件。


#### 跨域问题 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
跨域问题可以通过谷歌插件，使用转接服务器等手段解决，只凭借 浏览器端 Javascript 无法解决。

#### 绕过 [CSP 协议](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 加载 JSpider
这个 CSP 协议是为了防止文件的非正常途经载入而使用的。所以一般通过 script 标签和 import 引入不了文件。

但是如果 fetch 和 XHR 可以请求到文件，然后以 Blob 数据接收并转化为字符串，使用 eval 注入脚本，可以绕过 CSP 协议。

如果 fetch 和 XHR 也被禁止的话，就只能手动使用 开发者工具 的 snippets 执行载入了




<br>

## 相关依赖

[BootCDN](https://www.bootcdn.cn/): 提供动态载入下面的库。

[JSZip](https://github.com/Stuk/jszip): 一个前端压缩数据的库。

[fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser): XML => JSON 的库。 

# License
MIT :copyright: KonghaYao