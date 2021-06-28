# Version 情况

##### 为了更好的让使用者了解我对每个版本的更改情况，我会将版本信息写在下面便于查看。

# [JSpider](./JSpider.md)

## 2.0.8

-   使用 DOMParser 对 HTML 进行解析，解决 img 在注入浏览器时被解析导致请求图片信息的错误。

## 2.0.7

-   解决 Downloader 中将字符串转化为 JSON 的问题

## 2.0.6

-   Ajax(config), config 添加了 returnType, 表示强制使用 json，text 或 blob 格式返回数据，推荐自己写上去，避免 JSpider 自动识别的时候出错。
-   Ajax 在使用的时候改变了原来的数组，现在已经更改
-   教程网站直接跳转到新的教程网页，JSpider 源代码中已经不再混杂教程网页的代码。

## 2.0.5

-   Cookies 模块更新了检测方式。
-   Ajax 添加了请求失败后保存请求的 URL 和 options 的功能
-   JSpider 实例中添加一个 requestErr 数组，用于存放 Ajax 失败的情况。

## 2.0.4

-   Ajax 模块的 type 添加 pipe 方式，用于发动需要依靠上一次请求结果的参数。

## 2.0.0

###**JSpider 不再兼容 1.0.0！！！！！**

-   [ ] 创建基于 JSpider 基础函数形成的高级函数集。

<br>

-   JSpider 的定位为工具函数集，我将会更新一些常用的基于 JSpider 的高级函数，可以通过高级函数集引用。
-   JSpider 不再存储结果，改为函数完成直接返回结果。
-   所有代码模块化并添加 jsDoc 注释
-   基本上所有函数的使用方式都有改变。
    -   **Ajax** 函数取消保存结果和三种请求方式，改为定义 **并发数** 和 **间隔时间**。
    -   **Parser** 中的函数都设置成了 **批量处理函数** ，输入皆为数组。
        -   XML 和 Markdown 两个解析模块需要额外加载，所以需要使用 await 获取结果。
    -   **Downloader** 模块的函数名称改为 Downloader
    -   **Search** 模块 searchWindow 函数转存到高级函数集中。

## 1.4.4

-   Cookies 模块支持 Cookies 更新。

## 1.4.3

-   更改 Ajax 函数为模块化。

## 1.4.0

-   提供打包版本。

## 1.3.20

-   对教程网页的 JS 代码进行了更新，使得可以使用 URL hash 来导航文件。

## 1.3.18

-   找到了绕过 CSP 的方法。对文档稍有修改。

## 1.3.17

-   修复了关于 hook 的一个 BUG。

## 1.3.16

-   修复了关于 Globals 函数在某些情况下失效的 BUG 改为直接使用 window 对象的默认 key 数组。

## 1.3.15

-   修复一些 Copy 的 BUG。

## 1.3.14

-   Copy 模块加入，可以通过 extend 使用。

## 1.3.8

-   完善了一下教程网站。

## 1.3.5

-   修复了 Search 模块的 searchObj 。
-   更新教程了。

## 1.3.4

-   修改了部分的 Ajax 模块代码，使得请求结果依靠 blob 的 type，自动处理。
-   !!!从此版本后 hook 函数开启第二参数 async ,目的是分清楚代理 Promise 和非 Promise 函数。
