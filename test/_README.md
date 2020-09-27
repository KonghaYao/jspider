# 测试文件夹
这些JS文件是用于测试 JSpider 功能的文件夹。

## 使用方式
在 Chrome 开发者工具或者其他的浏览器开发者工具中使用，使用的页面为测试的 index.html。

第一，确保 JSpider 中的 Script 函数可以使用，通过Script引入是最合适的！

第二，通过在下面的代码并在本地的开发者工具的 snippets 中写入


```js
let a = new JSpider();
let Script = JSpider.prototype.Script;

```