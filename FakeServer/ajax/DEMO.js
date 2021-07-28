import { mockFetch } from './fetch/fetch';

mockFetch({
    // request 阶段进行的拦截验证，并向 FakeServer 进行请求
    async proxy(url, options) {
        const localCallback = await fakeServer.getServerResult(url, options);
        if (localCallback) {
            return localCallback;
        }
    },
    silent: false,
});
