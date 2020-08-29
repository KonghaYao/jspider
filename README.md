# JSpider

#### 介绍
在浏览器端使用 JS 快速爬取文件的框架

#### 软件架构
JSpider 分为 

- 请求模块(Ajax)
- 解析模块
  - HTML文本解析模块(HTMLParser)
  - XML文本解析模块(XMLParser)
- 批量下载模块(Downloader)
- 分析模块
  - hook 函数
  - searchWindow 函数

#### 鸽子工程
> 下面的版本为继承关系 
> 例如：基础版，扩展版和强化版都包含核心版功能,
>             强化版包含前面的各个版本的功能

###### JSpider-core.js 核心功能
[x] 并发请求(已经将队列请求包括了)

[x] 定时请求 

[x] 批量下载并使用zip打包(JSZip)

[x] 当爬取到数据之后将 HTML 文本解析

###### JSpider.js 基础功能

[x] cookie 操作

###### JSpider-ext.js 扩展版
[x] XML解析: XML (String) ==> Object 

###### JSpider-pro.js 强化版
[ ] hook 函数: 用于代理函数

[ ] searchWindow 函数: 用正则表达式搜索全局变量的函数


#### 快速开始


#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

