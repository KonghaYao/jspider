import { v4 as uuid } from "uuid";
import consola from "consola";
// 这个是用于组织爬虫 UI 界面的一个部分
// TODO 这里将会建立一个与 JSpider Core 的 UI 交互界面
class UIManager {
    $root;
    constructor() {}
    init() {} // 用于初始化界面
    state() {}
    createRoot(id) {
        if (this.$root) return null;
        this.$root = document.createElement(id || uuid());
        this.$root.style = `
            height: 100vh;
            width: 100vw;
            box-sizing: border-box;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1000000000000;
        `.replace(/\s/g, "");
        document.body.appendChild($root);
        consola.success("向 dom 中 注入 ui 成功");
    }
}
