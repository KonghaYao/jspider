const config = { proxy: null, silent: false };
let realFetch;

// 假的 Response 对象
import fakeResponse from './src/response.js';

async function fakeFetch(url, options = {}) {
    // 只有在 $mock 标记为 true 时才进行代理
    if (window.fetch.$mock === true) {
        // ! 传入初始参数
        const result = await config.proxy(url, options);
        if (result) {
            if (!silent) console.warn('fetch: mock代理中');
            const { body, options = {} } = result;
            return new fakeResponse(body, options);
        }
    }

    if (!config.silent) console.warn('这次 fetch 未使用 mockjs');
    return realFetch(url, options);
}

// 代理出口
export function mockFetch({ proxy, silent = false }) {
    if (proxy instanceof Function) config.proxy = proxy;
    config.silent = silent;
    // 代理 fetch 的初始化函数
    if (window.fetch && !window.fetch.$mock) {
        // 交叉赋值
        [realFetch, window.fetch] = [window.fetch, fakeFetch];
        window.fetch.$mock = true;
        if (!silent) console.warn('fetch: 已经被代理');
    }
}
