# JSpider Design

_这是一个关于 JSpider 的结构设计文件_

## 总体结构

**_下面的部分都称为 System，是 JSpider 流程中的一环，但是为了方便开发者使用，这些系统有可能不会被开发者看到，或者是以其他形式被开发者所使用。_**

### 1. Task

> **Task** 是独立的最小单元，是初始信息（originData）的封装。

**_Task_** 是 JSpider 的 Data flow 中封装的最小单位。也就是对数据的封装的一层，以便有统一可以调用的 API。

**_TaskGroup_** 是 Task 的合成型，在遇到某些 plugin 的时候需要使用。

同时，在 **Task** 的组成中使用了 **mobx-state-tree** 和 **EventBus** 进行信息更新的发布和传播。

### 2. Pipeline

> **Task** 像是水滴，流动在水管（**Pipeline**）中，最后流出。

**_Pipeline_** 是 JSpider 中用于将各种操作合成为一个函数步骤的快捷方式，本质为一个 rxjs operator 的生成工厂。

**_Pipeline_** 通过将 **Task** 传递给 plugin 来实现数据的迭代处理。

### 3. ControlPanel

**_ControlPanel_** 是用于调控数据的流量的一个总 system，全局唯一，主要担当中央控制器的作用。

**_ControlPanel_** 负责处理用户输入的信息，**_Mirror_** 负责信息的传播

### 4. Mirror

> **镜子（Mirror）只是反射光**

**_Mirror_** 只是对数据更新进行传播，保证可以渲染到指定的 View 中。

### 5. View

View 是从 Mirror 订阅过来的数据的自定义接口，可供开发者自行进行信息的订阅，方便进行 View 的扩充。

1. **ConsoleView** 为 Console 的数据订阅口。
2. **MemoryView** 为 前端 indexedDB 的订阅口。

### 6. Fake Server

**_Fake Server_** 是 JSpider 中的 ajax 拦截代理系统。

## Plugin 机制

**_所有的 System 都应该是和平台无关的，独立的；而 Plugin 是对接每一个平台实现具体功能的函数插件。_**

**_Plugin 机制_** 在 JSpider 中是对每一个 **System** 进行功能扩充的函数插件。

## 项目的细节

1. 推荐使用的包管理工具是 **pnpm**。

2. 为了代码的可维护性更高，必须使用 **eslint + prettier** 的方式格式化所有的源代码（代码格式化的样式保存在根目录下），这样可以保证代码格式的统一。

3. **流程图统一使用 drawio** 进行源文件绘制。源文件可以通过 docsify 自动生成图片展示在文档中，所以不需要进行导出。

4. **代码模块化细分**，代码推荐通过 ESM 的 `import` 方式导入导出，但是**最好使用命名导出，而不是 default 导出**。

5. 项目使用 **rollup** 进行打包和产品生成。

6. 项目中使用 **docsify** 进行文档书写，而且文档文件全部放置在 docs 文件夹中，便于管理。
