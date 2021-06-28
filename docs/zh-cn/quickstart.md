# JSpider 快速开始

!> 接下来的文章您可以阅读到您想要的部分，但是推荐您从头开始看，看到您需要的部分就可以了。越往后的部分越专业，很多词汇和概念可能看不懂，所以请耐心观看。

## 如果你只想快速爬取文件

[](../../src/AboutAPI.drawio ":include")

### 0. 打开开发者工具

**右键 ➡ 检查，然后您可以在 Console 下面直接书写您的代码**

### 1. 导入文件

使用 import 异步导入您的插件，并将 JSpider 写入到 window 对象。

代码需要异步执行，可以在 **Console** 中直接使用。若您对应于 **Devtools** 不太熟悉，可以先阅读 **[Devtools 爬虫指南](/zh-cn/Devtools.md)**。

!> 注意： 本网站的开发者工具中，已经直接帮您导入 JSpider 到 window 对象了，不用再重复这一步骤。

```js
import("https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.esm.min.js").then(
    ({ default: JSpider }) => {
        window.JSpider = JSpider;
    }
); // 这个步骤是异步的，也就是说，您需要等待它完成，或者直接在 then 内部写代码
```

### 2. 载入插件

```js
// 导入插件，JSpider 还有很多功能插件，全部放置在 plugins 属性下
const {
    Request, // 请求库
    Download // 下载库
} = JSpider.plugins;
```

### 3. 构建您需要爬取的 URLS 数组

```js
// 您的爬取路径代码, 这里是直接构建出数组
// 实际情况中，您可以直接构建字符串数组
let urls = [...Array(5).keys()].map((i, index) => {
    return { url: "/fake/excel" };
});

// 下面这些形式都是可以被 JSpider 识别的。
urls = ["/fake/excel", "/fake/excel"];
urls = [
    {
        url: "/fake/excel",
        options: {} // 这里的 options 属性是用于fetch 的 options 属性
    }
];
```

### 4. 构建爬虫本体，并输入 URLS 数组

```js
// 这里构建出一个爬虫类，可以在后面重复使用
const spider = new JSpider(
    // 内部写入 JSpider.plugins 中的插件代码
    Request(), // 这些都是 Plugin，后面会重复提及这个东西
    Download()
);

// 载入您的 URLS 将会进行爬取
spider.apply(urls);
```

## 如果你想自定义多一点

### 1. 临时自定义一个 Plugin

!> 下面的方式生成的 Plugin 是非专业，只是临时用途的。

```js
const Plugin = JSpider.Plugin;
const spider = new JSpider(
    Request(),
    Plugin((data) => {
        console.log(data);
        return data;
    })
    // Download()
);
```

### 2. 使用更多 Plugins

!> 您可以参考完整的 Plugins 清单以选取需要的插件。

```js
const {
    Plugin,
    plugins: {
        Request, // 请求库
        Download, // 下载库
        ExcelHelper // 转换数据为表格数据的插件
    }
} = JSpider;

const spider = new JSpider(
    Request(),
    // 这是一个可以将 data 处理成 EXCEL 能够识别的二进制文件
    ExcelHelper(
        function formatter(data) {
            // 将数据处理成 { sheetName : [ { key:value },... ],...} 的形式才可以转换哦！
            return data;
        },
        {
            XLSXOptions: {
                bookType: "csv" // 可以指定为 csv 或者 xlsx
            }
        }
    ),
    //! 如果使用了 Download, 会使用 a 标签的方式下载文件，Chrome 会弹窗提示是否下载多个文件，确认即可。
    // 如果您的数据过多的话，下载文件会比较多。
    Download()
);
```

## 如果你想要高级自定义

建议查看右上角的开发者文档模块下的文章。

## 如果你想深入了解 JSpider 的机制。

您可以先学习：

1. 对于 [Rxjs](https://rxjs.dev/) 有一些了解。( 这个库涉及很多艰深的编程理念，学习曲线较陡峭 )。JSpider 的源代码的多数逻辑都是使用 Rxjs 这个库进行实现的，所以如果不了解 Rxjs 的话，是很难理解 JSpider 的。

2. 学习 JSpider 的源码。
