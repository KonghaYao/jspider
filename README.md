# JSpider

#### :pencil: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于 Python 的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开新的 python 脚本要轻松得多。
所以我写了这个 JSpider 类来替代那些繁琐的 JS 代码。

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray:

<br>

#### 软件架构
JSpider 分为 

- 请求模块
  - Ajax
- 解析模块
  - HTML文本解析模块
    - HTMLParser
  - XML文本解析模块
    - XMLParser
- 批量下载模块
  - Downloader
- 分析模块
  - 监视器函数
    - hook
  - Search 模块
    - searchWindow
    - searchObj
    - Globals
- 扩展模块
  -extend
  -Script
:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray:

<br>

####  :dove:  鸽子工程 
 下面的类型为继承关系 
 例如：后面的类型包含前面的类型的内容

<br>

##### JSpider-core.js 核心类型
- [x] 并发请求 :heavy_check_mark: (已经将队列请求包括了) 

- [x] 定时请求 :heavy_check_mark:

- [x] 批量下载并使用zip打包(JSZip) :heavy_check_mark:

- [x] 当爬取到数据之后将 HTML 文本解析 :heavy_check_mark:

- [x] 可以载入外部的css或js文件 :heavy_check_mark:

<br>

##### JSpider-ext.js 扩展类型
- [x] XML解析: XML (String) ==> Object :heavy_check_mark:

- [x] Cookies 函数 :heavy_check_mark:

- [x] Globals 函数：归属于Search 模块 :heavy_check_mark:

<br>

##### JSpider-pro.js 强化类型
- [x] hook 函数: 用于代理函数 :alembic:

- [x] Search模块: 用正则表达式搜索对象内容 :heavy_check_mark:

<br>

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray:

<br>

#### 快速开始

JsDelivr cdn 载入  
链接解析
https://cdn.jsdelivr.net/npm/js-spider@1.1.0/JSpider-pro.js
[https://cdn.jsdelivr.net/npm/js-spider@ **版本号** /JSpider- **类型** .js]()
```js
// js文件遵循 es6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider@1.1.0/JSpider-core.js').then(res=>window.JSpider = res.default)

//加载完成之后
//初始化需要
let spider = new JSpider()
//然后就可以使用各种函数了
spider.ajax({
  urls:[
    //数组内可以是url字符串或者是下面的对象
    'https://cdn.jsdelivr.net/npm/js-spider@1.1.0/JSpider-pro.js',
    {
      url:'https://cdn.jsdelivr.net/npm/js-spider@1.1.0/JSpider-core.js',
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
#### [完整教程]()


