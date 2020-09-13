import request from "./Ajax/request.js";
import requestSync from "./Ajax/requestSync.js";
import requestTime from "./Ajax/requestTime.js";

async function ajax(requestOptions) {
    let { urls, time, options, type, limits } = requestOptions;
    switch (type) {
        case "time":
            this.result = await requestTime(urls, options, time);
            return this.result;
        case "sync":
            console.log("%c 并发", "color:green");
            this.result = await requestSync(urls, options, limits);
            console.log("%c 请求完成", "color:green");
            return this.result;
        case "async":
            console.log("%c 异步队列", "color:green");
            this.result = await requestSync(urls, options, 1);
            console.log("%c 请求完成", "color:green");
            return this.result;
        default:
            console.log("%c 测试", "color:green");
            return await Promise.all(
                [0, 1, 2].map((i) => {
                    if (urls[i]) {
                        return request(urls[i], options);
                    }
                })
            );
    }
}
export default ajax;
