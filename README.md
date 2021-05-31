# JSpider 3

> JSpider 3 是在 Chrome Devtools 中进行爬虫的爬虫框架, 这个框架包括了完整的爬虫支持。

## JSpider 3 更新内容

JSpider 相较于 2.0+ 版本：

1. 开箱即用，不用任何配置，您只需要 **填入 url 数组** ！

2. 优化了 JSpider 内部的结构，使得 JSpider 在开箱即用的情况下可以拥有 **极大的自定义空间**。

3. **拥抱 rxjs**。我非常喜欢 rxjs 的编程方式，所以 JSpider 的底层都是使用 rxjs 构建的，在创建 plugins 的时候也是采用 rxjs。

4. **全面插件化**。JSpider 除了核心功能外，全部都是由 Plugins 组成，这样只需要制作插件就可以了！

## 快速入门

### 极速爬取

只有简单的两行, 适用于极速操作，这会直接将这些 URL 中的内容下载到本地

```js
import JSpider from 'JSpider.js'
JSpider.simpleCrawl(["Your URL Array"])
```

### 更加高级的自定义爬取

```js
import JSpider from 'JSpider.js'
const { Request, HTMLParser, Download} = JSpider.plugins
let workflow = new JSpider(
    Request(requestOptions),
    HTMLParser(() => {
        return dom.innerHTML;
    }),
    Download()
);
workflow.apply(["Your URL Array"])
```

### 注意事项

#### 1. **CORS 和 CSP (Content Security Policy) 协议导致您无法爬取到数据。**

CORS 和 CSP 是浏览器的安全策略，与 JSpider 无关，我推荐您遵守。很多网站使用了这两种协议来防止 Javascript 语言在浏览器中为所欲为，所以如果您使用的是 Chrome，可以在 [Chrome 插件商店](https://chrome.google.com/webstore/category/extensions?hl=zh-CN) 中搜索 CORS 和 CSP，安装相应的插件即可解除这两个协议的报错。我无法保证这些插件的安全性，所以在此不推荐。

### 专业文档

### 关于 JSpider 的未来

JSpider 未来的目标是兼容 NodeJS 平台和浏览器，让一套代码运行在两个平台，加速爬虫极客的开发速率！

关于编程上的具体路径是实现 Typescript 化，但是限于编程能力，没有办法实现完整的 Typescript 化，所以未来的版本都会以 ECMA 标准来编写。

## License

MIT licensed ©KonghaYao

> 这表示您可以很大程度地使用 JSpider！
