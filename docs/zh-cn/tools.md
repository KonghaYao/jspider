# JSpider—— 爬虫小工具

!>    tools 是对于爬虫有一些帮助的浏览器端的工具函数, 所有的函数都是 **以 $ 开头命名** 表示。

## 插件导入工具 $load(string|object)

>    插件导入工具 $load 是用于导入 js 插件或者是 css 文件的快速导入函数。

### 导入我想要的模块

很多情况下 JS 导入 没有 import 关键字时期的 iife 形式封装的模块时，使用的手段具有很大的重复性，所以在 JSpider 中直接封装了导入模块的函数——$load。

```js
let { $load } = JSpider

// ! npm 包名载入
$load('rxjs');// 这里的是在 npm 包管理器内的名称，这个是一个唯一的小写字符串
$load('jszip');

// !url 载入

$load('https://cdn.jsdelivr.net/npm/jquery');
$load({
    // 可以填更多参数
    url:'https://cdn.jsdelivr.net/npm/jquery'
})

// 具体载入 （高级使用）
$load({
    name:'jquery', 
    version:'3.6.0', // 版本号，可以不填，不填为最新版
    path:'dist/jquery.min.js', // 直接的仓库路径，不填就会按照 package.json 中的路径进行读取，可能会错误
    way:'npm'// 默认为 npm 包加载
})

// 混杂多个载入（高级使用）
$load([{
    name:'jquery', 
    version:'3.6.0', // 版本号，可以不填，不填为最新版
    path:'dist/jquery.min.js', // 直接的仓库路径，不填就会按照 package.json 中的路径进行读取，可能会错误
    way:'npm'// 默认为 npm 包加载
},'lodash'])

```

## JS 变量查找工具——$search(Object,RegexpOrString)

对象查找器 $search =,   \$search 用于查找一个对象上是否含有符合 RegExpOrString 的部分属性，并返回一个具体对象

```js
let obj = {
    "name": [
        "毛静",
        "侯秀英",
        "张平",
        "张涛",
        "董刚",
        "熊艳",
        "宋娜",
        "余刚",
        "邹静",
        "白静"
    ],
    "paragraph": "精行意史规管口进江及反识极增争几林。"
}



JSpider.$search(obj,/毛/) 
//结果 {name: ["毛静"]}

JSpider.$search(obj,'毛') 
//结果 {name: ["毛静"]}
```

!>  注意不可以对引用了自身的对象进行 search，这样会导致不断搜索自身而死循环。

