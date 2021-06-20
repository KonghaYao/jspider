# JSpider.tools —— 爬虫小工具

>    tools 是对于爬虫有一些帮助的浏览器端的工具函数

## 插件导入工具 tools.$load(NameOrURL)

插件导入工具 $load 是用于导入 js 插件或者是 css 文件的快速导入函数。

### 导入我想要的模块

很多情况下 JS 导入 没有 import 关键字时期的 iife 形式封装的模块时，使用的手段具有很大的重复性，所以在 JSpider 中直接封装了导入模块的函数——$load。

```js
let { $load } = JSpider.tools

// npm 包名载入
$load('rxjs');// 这里的是在 npm 包管理器内的名称，这个是一个唯一的小写字符串
$load('jszip');

// url 载入

$load('https://cdn.jsdelivr.net/npm/jquery');
$load({
    // 可以填更多参数
    url:'https://cdn.jsdelivr.net/npm/jquery'
})

// 具体载入

$load({
    name:'jquery', 
    version:'3.6.0', // 版本号，可以不填，不填为最新版
    path:'dist/jquery.min.js', // 直接的仓库路径，不填就会按照 package.json 中的路径进行读取，可能会错误
    way:'npm'// 默认为 npm 包加载
})

// 混杂多个载入

$load([{
    name:'jquery', 
    version:'3.6.0', // 版本号，可以不填，不填为最新版
    path:'dist/jquery.min.js', // 直接的仓库路径，不填就会按照 package.json 中的路径进行读取，可能会错误
    way:'npm'// 默认为 npm 包加载
},'lodash'])

```

