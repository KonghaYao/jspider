# JSpider 3.2 BETA

[![](https://data.jsdelivr.com/v1/package/npm/js-spider/badge)](https://www.jsdelivr.com/package/npm/js-spider) ![npm](https://img.shields.io/npm/v/js-spider?style=flat-square) ![NPM](https://img.shields.io/npm/l/js-spider?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/konghayao/jspider) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/konghayao/jspider) [![](https://gitee.com/dongzhongzhidong/jspider/badge/star.svg?theme=white)](https://gitee.com/dongzhongzhidong/jspider/)

> JSpider 3 是在 Chrome Devtools 中进行爬虫的爬虫框架，这个框架包括了完整的爬虫支持。如果您具有前端基础，那么可以在三分钟内入门哦！

> JSpider 3 is a Chrome DevTools crawler framework that includes full crawler support. If you have a front-end foundation, you can get up and running in three minutes!

-   **高效率工具：JSpider 自带并发控制，提供多种方便的数据处理插件。**
-   **爬虫高度复用：JSpider 的代码可以重复使用，随时添加新任务。**

[官方教程链接](http://dongzhongzhidong.gitee.io/jspider/)

## 快速入门

### 自定义爬取

```js
await import('https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.esm.min.js').then({JSpider}=>{
    window.JSpider = JSpider;
});

// 导入插件，JSpider 还有很多功能插件
const {
    Request, // 请求库
    Download, // 下载库
} = JSpider.plugins;

let urls = ['https://.....']// 您的爬取路径数组

const spider = new JSpider(
    Request(),
    Plugin((data) => {
        data
        return data;
    }),
    Download()
);
spider.crawl(urls);
spider.start();
// 等待下载完成！
```

!> [更多自定义代码教程](http://dongzhongzhidong.gitee.io/jspider/)

### 注意事项

#### 1. **CORS 和 CSP (Content Security Policy) 协议导致您无法爬取到数据。**

**CORS 和 CSP 是浏览器的安全策略**，与 JSpider 无关，我推荐您遵守。很多网站使用了这两种协议来防止 Javascript 语言在浏览器中为所欲为，所以如果您使用的是 Chrome，可以在 [Chrome 插件商店](https://chrome.google.com/webstore/category/extensions?hl=zh-CN) 中搜索 CORS 和 CSP，安装相应的插件即可解除这两个协议的报错。我无法保证这些插件的安全性，所以在此不推荐。

## License

自 3.2 版本之后的版本都设置为 Apache-2.0, 3.2 之前版本均为 MIT License

Copyright © KonghaYao Apache-2.0 licensed
