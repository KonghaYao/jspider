# Version

## 这是 JSpider 的版本情况和未来的版本规划

### 3.3 版本更新

-   [ ] 关于 UI 界面的更新
-   [ ] FakeServer 的载入
-   重构 plugins
    -   [ ] plugins 分包导入

### 3.2 - Paimon 版本更新

> 派蒙版本，即最初的伙伴。这个版本的编程基础完成，可以在 Console 中对 jspider 进行交互操作。但是 plugin 并未完全移植成功，尚需努力。(。>︿<)\_θ

-   完整的 JSpider 编程逻辑框架出图

    -   [x] JSpider 中的数据流系统
    -   [x] JSpider 中的事件系统
    -   [x] JSpider 需要实现 MVVM 模型来实现爬虫系统的可视化
        -   这个使用了 Mobx 进行数据监听，rxjs 进行数据传播，3.3 将会以 Vue 作为可视化的 View 层。

-   重构所有的核心代码

    -   [x] Control Panel 暂停功能
    -   [x] Control Panel 重试功能（非流内自动重试）

-   Console 的错误提示
    -

### 因为是 3.2 版本才更新这个文件，所以往前的版本都丢失了。
