import { Server } from "./Server/index.js";
import { $load } from "../loader/loader.js";
import consola from "consola";
const cache = {};
async function Mock(MockSiteName) {
    // 导入 Mockjs
    if (!window.Mock) {
        await $load("mockjs");
        consola.warn("Mockjs 载入并代理 Ajax 中");
    }

    if (!cache[MockSiteName]) {
        consola.warn("mock 启动后台 ", MockSiteName);
        let { url, type, template } = Server[MockSiteName];
        window.Mock.mock(url, type, template);
        cache[MockSiteName] = true;
    }
}
export { Mock as $Mock };
