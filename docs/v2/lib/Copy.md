# :book: JSpider —— Copy 模块 2.0

## :pencil2: 介绍

Copy 模块是用来处理复制的一个函数。

<br>

## :hammer: 快速开始

### JsDelivr cdn 载入链接解析

按类型引入

-   ES6 引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/JSpider.min.js](#)
-   ES5 引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/dist/JSpider.es5.js](#)
-   单个模块引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/src/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入

//动态载入
import("https://cdn.jsdelivr.net/gh/KonghaYao/jspider/src/Copy.js").then(
    (res) => (window.Copy = res)
);

// ES5 可以直接在 script 标签中引入
```

<br>

## :book: Copy 模块

### 闲聊

Copy 模块是为了将某些限制网站复制的 JS 方式给消除掉，所以有了 Copy.clearUnCopy 函数，只要不是特殊的防止复制的方式，都可以去除禁止复制。

而 copy 是用来复制的函数，虽然在控制台可以直接使用浏览器自带的 copy 函数复制，但是如果是配合油猴脚本全自动注入的话还是要额外的 copy 函数的。

:bee: 注意，如果填入一个 DOM 元素，将会获取它的 outerHTML 。

```js
//控制台

let spider = new JSpider();

//载入完成后
spider.clearUnCopy();

spider.copy(123);
spider.copy({ 1: 2, 2: 3 });
spider.copy(document.querySelector("body"));
```
