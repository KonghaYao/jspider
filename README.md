# JSpider 3 BETA

> JSpider 3 是在 Chrome Devtools 中进行爬虫的爬虫框架, 这个框架包括了完整的爬虫支持。

## 快速入门

### 极速爬取

只有简单的几行, 适用于极速操作，这会直接将这些 URL 中的内容下载到本地。

!> 右键 -> 检查，打开浏览器 Devtools，在 Console 中即可使用这些代码哦！

!> **请打开浏览器开发者工具，网页已经载入了 JSpider，并创建了虚拟后台。**

```js
import('https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.esm.min.js').then({JSpider}=>{
    window.JSpider = JSpider;
});// 从 jsDelivr 导入代码
// 放入您的 URL
JSpider.simpleCrawl(["fake/excel","fake/excel"]);
```

> 这里是通过 Mockjs 对 URL 进行了代理，所以接收得到数据

### 更加高级的自定义爬取

```js
import('https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.esm.min.js').then({JSpider}=>{
    window.JSpider = JSpider;
});// 从 jsDelivr 导入代码
const { createPlugin, initPlugins } = JSpider;

// 导入插件，JSpider 还有很多功能插件
const {
    Request, // 请求库
    Download, // 下载库
} = JSpider.plugins;

// 您的爬取路径代码, 这里是直接构建出数组
let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});

const spider = new JSpider(
    Request(),
    createPlugin((task) => {
        console.log(task._result);
        return task;
    }),
    Download()
);
spider.apply(urls);

```

!> [更多自定义代码教程](/zh-cn/quickstart)

### 注意事项

#### 1. **CORS 和 CSP (Content Security Policy) 协议导致您无法爬取到数据。**

**CORS 和 CSP 是浏览器的安全策略**，与 JSpider 无关，我推荐您遵守。很多网站使用了这两种协议来防止 Javascript 语言在浏览器中为所欲为，所以如果您使用的是 Chrome，可以在 [Chrome 插件商店](https://chrome.google.com/webstore/category/extensions?hl=zh-CN) 中搜索 CORS 和 CSP，安装相应的插件即可解除这两个协议的报错。我无法保证这些插件的安全性，所以在此不推荐。

## JSpider 3 更新内容

JSpider 相较于 2.0+ 版本：

1. 开箱即用，不用任何配置，您只需要 **填入 url 数组** ！

2. 优化了 JSpider 内部的结构，使得 JSpider 在开箱即用的情况下可以拥有 **极大的自定义空间**。

3. **拥抱 rxjs**。我非常喜欢 rxjs 的编程方式，所以 JSpider 的底层都是使用 rxjs 构建的，在创建 plugins 的时候也是采用 rxjs。

4. **全面插件化**。JSpider 除了核心功能外，全部都是由 Plugins 组成，这样只需要制作插件就可以了！

### 关于 JSpider 的未来

JSpider 未来的目标是兼容 NodeJS 平台和浏览器，让一套代码运行在两个平台，加速爬虫极客的开发速率！

关于编程上的具体路径是实现 Typescript 化，但是限于编程能力，没有办法实现完整的 Typescript 化，所以未来的版本都会以 ECMA 标准来编写。

## **对于 JSpider 使用的库的感谢声明**

JSpider 项目研究过程中使用到了这些库。源代码文件通过 npm 和 jsDelivr 网站两个来源载入。排名不分先后，只是记录个人对于这些库的使用体验。

1. Rxjs 十分好用的响应式编程库，以至于 JSpider 的主要构架就是使用它写出来的。

2. Rollup 代码打包库，使用 Rollup 打包的库为我的项目节省了很多时间。

3. Mockjs 很有想法的一个前端数据代理库，很可惜的是没有提供 fetch 的代理，所以我自己做了一个插件。

4. lodash-es 无敌的工具库，在一些比较常用的底层代码中有使用。

5. xlsx ExcelHelper 的核心插件，用于从对象数据直接构建 Excel 常用文件的操作，十分好用的一个插件。

6. jszip

7. dexie.js JSpider 得以链接 indexDB 进行储存操作的救星，说实话 indexDB 的 API 太乱了。

8. zangodb.js 这个也是对 indexDB 的数据操作的一个库，API 简单易用，但是在项目中选择了更为活跃的 dexie.js 进行了 indexDB 的链接。

9. uuid 用于创建 UUID 的项目，可以生成唯一的标识，用于 JSpider 的底层逻辑中。

**感谢上面的项目为 JSpider 提供了众多的帮助！**

## License

Copyright © KonghaYao MIT licensed
