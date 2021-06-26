export { JSpider, Task, TaskGroup, Plugin } from "./core/index.js";
export * as plugins from "./plugins/index.js";
export * as tools from "./tools/index.js"; // 工具都是 $ 开头的函数
// 便于进行 treeShake 的版本，将会打包成 JSpider.js
