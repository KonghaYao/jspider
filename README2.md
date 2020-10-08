## :gear: 写给使用此仓库的开发者

## 仓库结构
### 重要文件
- **JSpider.js** 
    - 用于 es6 的正式版本的入口文件。
- **JSpider-webpack.js** 
    - 用于 webpack 的特殊 JSpider 版本。
- **index.html** 
    - 连接到用于展示文档的 Gitee 网页。
- **.babelrc** 
    - 转化为 es5 语法的配置文件。
- **webpack.config.js** 
    - 用于webpack打包的文件。

### 文件夹
- **constructor** 
    - 用于直接生成dist 文件夹下的成品文件，运行 index.bat 即可。
- **dist**
    - 放置成品打包文件。
- **doc**
    - 教程存放的文件夹。
- **example**
    - JSpider 的示例。
- **src**
    - 用于放置JSpider的模块。
- **pro**
    - JSpider 的高级函数集的存放位置，内部的index.js 是入口文件。
- **lib**
    - JSpider 使用的额外的库。
- **tes**
    - 用于测试 JSpider 的文件。