import { Server } from "./Server/index.js";
import { $load } from "../loader/loader.js";

async function Mock(MockSiteName) {
    // 导入 Mockjs
    if (!window.Mock) {
        await $load("mockjs");
        console.warn("Mockjs 载入并代理 Ajax 中");
    }
    console.warn("mock 启动后台 ", MockSiteName);
    const { url, type, template } = Server[MockSiteName];
    window.Mock.mock(url, type, template);
    return true;
}

// 缓存函数结果
import { memoize } from "lodash-es";
export const $Mock = memoize(Mock);
