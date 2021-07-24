const config = { request: null, response: null, silent: false };
let realFetch;

// 假的 Response 对象
import fakeResponse from './src/response.js';
function makeResponse(data, options) {
    return new fakeResponse(data, options);
}

async function fakeFetch(url, options = {}) {
    // 只有在 $mock 标记为 true 时才进行代理
    if (window.fetch.$mock === true) {
        // ! 传入初始参数
        const result = config.request(url, options);
        if (result) {
            // ! 传入创建函数，给与使用者开放权限
            const response = config.response(makeResponse);
            if (!silent) console.warn('fetch: mock代理中');
            return response;
        }
    }

    if (!silent) console.warn('这次 fetch 未使用 mockjs');
    return realFetch(url, options);
}
function mockFetch({ request: req, response: res, silent = false }) {
    if (req instanceof Function) config.request = req;
    if (res instanceof Function) config.response = res;
    config.silent = silent;
    // 代理 fetch 的初始化函数
    if (window.fetch && !window.fetch.$mock) {
        // 交叉赋值
        [realFetch, window.fetch] = [window.fetch, fakeFetch];
        window.fetch.$mock = true;
        if (!silent) console.warn('fetch: 已经被代理');
    }
}
export { fakeFetch, mockFetch };
