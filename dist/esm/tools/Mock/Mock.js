import { Server } from './Server/index.js';
import { $load } from '../loader/loader.js';
import './Server/excel.js';
import '../loader/scriptStore.js';
import '../loader/loaderFunction.js';

const cache = {};
async function Mock(MockSiteName) {
    // 导入 Mockjs
    if (!window.Mock) {
        await $load("mockjs");
        console.warn("Mockjs 载入并代理 Ajax 中");
    }

    if (!cache[MockSiteName]) {
        console.log("mock 启动后台 ", MockSiteName);
        let { url, type, template } = Server[MockSiteName];
        window.Mock.mock(url, type, template);
        cache[MockSiteName] = true;
    }
}

export { Mock as $Mock };
