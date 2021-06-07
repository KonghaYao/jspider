import { Server } from "./Server/index.js";
import { $load } from "../loader.js";
import { MockFetch } from "./plugins/mockFetch.js";
const cache = {};
async function Mock(MockSiteName) {
    // 导入 Mockjs
    if (!window.Mock) await $load("mockjs").then(() => MockFetch(window.Mock));

    if (!cache[MockSiteName]) {
        let { url, type, template } = Server[MockSiteName];
        window.Mock.mock(url, type, template);
        cache[MockSiteName] = true;
    }
}
export { Mock };
