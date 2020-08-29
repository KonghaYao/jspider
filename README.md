# JSpider

#### :pencil: 介绍
这是一个在浏览器端使用 JS 快速爬取文件的框架。我写的第一个爬虫脚本是基于Python的，但是学到分析 JS 脚本之后，发现完全可以由浏览器的 JS 来发送请求并获取数据。对于少量的数据来说，右键检查并写几行代码就爬取成功，比开 python 脚本要轻松得多。
所以我写了这个 JSpider 类来替代那些繁琐的 JS 代码。

:pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray:

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
  - hook 函数
  - Search 模块
    - searchWindow
    - searchObj
    - Globals

:pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray:

#### :dove: 鸽子工程 
 下面的版本为继承关系 
 例如：后面的版本包含前面的版本的内容

##### JSpider-core.js 核心功能
- [x] 并发请求 :heavy_check_mark: (已经将队列请求包括了) 

- [x] 定时请求 :heavy_check_mark:

- [x] 批量下载并使用zip打包(JSZip) :heavy_check_mark:

- [x] 当爬取到数据之后将 HTML 文本解析 :heavy_check_mark:



##### JSpider-ext.js 扩展版
- [x] XML解析: XML (String) ==> Object :heavy_check_mark:

- [x] cookie 操作 :heavy_check_mark:

- [x] Globals 函数：归属于Search模块 :heavy_check_mark:

##### JSpider-pro.js 强化版
- [x] hook 函数: 用于代理函数 :alembic:

- [x] Search模块: 用正则表达式搜索对象内容 :heavy_check_mark:


:pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray:

#### 快速开始

:pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray::pray:

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

