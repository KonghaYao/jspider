## 写给使用此仓库的开发者


## 仓库结构
### 重要文件
- .babelrc 转化为 es5 的配置文件
- .gitignore git 上传时忽略的文件夹
- constructor.pack.js 用于将 webpack 打包后的文件与额外的库合并的脚本
- index.html 用于展示文档的 html 文件
- JSpider-webpack.js 用于 webpack 的特殊 JSpider 版本
- JSpider 用于 es6 的正式版本的入口文件
- webpack.config.js 用于webpack打包的文件

### 文件夹
- css,js 用于放置 index.html 的引入文件的文件夹
- dist 放置webpack 和 constructor.pack.js 执行后的文件
- doc 教程存放的文件夹
- example JSpider 的示例
- lib 用于放置JSpider的模块
- pro JSpider 的高级函数集的存放位置，内部的index.js 是入口文件
- src 使用的额外的库
- test 用于测试 JSpider 的文件