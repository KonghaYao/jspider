

# :book: JSpider —— Downloader 模块 2.0

## :pencil2: 介绍

Downloader 模块是用来批量下载 Blob 或者是 String 格式的数据的一个便捷的模块。

<br>

## 闲聊
当然，在经过一系列的数据处理之后，我们需要将文本数据保存下载，这个时候就需要这个模块了。这个模块可以直接批量打包下载数据，直接生成数据，方便存储。

<br>

## :hammer: 快速开始

### JsDelivr cdn 载入链接解析
按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/dist/JSpider.es5.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/gh/KonghaYao/jspider/src/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入

// 动态载入
import('https://cdn.jsdelivr.net/gh/KonghaYao/jspider/src/Downloader.js')
      .then(res=>window.Downloader = res)
      
// ES5 可以直接在 script 标签中引入
```

<br>

## :book: Downloader

### :star: download(fileList, nameList = [], needZip = false)

| 参数     | 类型                                                     | 描述                                                      |
| -------- | -------------------------------------------------------- | --------------------------------------------------------- |
| fileList | File，Blob 或 String 组成的数组                          | 要下载的文件<br />可以在Blob类型的数据 的name属性赋值名称 |
| nameList | 重命名的数组<br />或者只是带需要替换的序号的键值对的对象 | {0:’1.txt’,2:’2.txt’}                                     |
| needZip  | Boolen                                                   | 是否强制压缩                                              |                                       |

<br>

### :bookmark: 详细

#### :fire: 浏览器中最大同时下载的文件数为 10 

这个是在我尝试爬取 m3u8 文件分片的时候发现的，Chrome 不能够下载完全，只能下载前10个，后面的所有数据都没有下载。

所以我使用了 [JSZip](https://github.com/Stuk/jszip) 这个库，当下载数多于 10 时自动压缩。在 Downloader 中，当然也可以通过 **needZip 参数** 强制压缩。

#### :candy: 关于文件名称
文件名称在没有定义时候会查找原来数组的元素（如果是继承自 Blob）的 name 属性，没找到就找后面命名数组的信息，再没找到就使用数组 index 作为名称。

<br>

### 示例

```js
let spider =new JSpider()
spider.Downloader([file1,file2],[],true)
spider.Downloader([file1,'中',{0:1,2:2}],{2:'这是一个JSON.json'},true)
```
:beetle: 注意, File 类型的文件是不能直接修改 name 属性的，所以需要使用下面的方法。

```js
let file1 = new File(['11111'],'1.txt')

file1.name = '2.txt'// 无效
file1 = new File([file1],'2.txt')//有效
```
