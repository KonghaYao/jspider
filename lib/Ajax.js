import request from "./Ajax/request.js";
import requestSync from "./Ajax/requestSync.js";
import requestTime from "./Ajax/requestTime.js";

// ajax 函数不再放置到指定位置
async function ajax(requestOptions) {
    let result;
    let { urls, time, options, type, limits } = requestOptions;
    switch (type) {
        case "time":
            return await requestTime(urls, options, time);

        case "sync":
            console.log("%c 并发", "color:green");
            result = await requestSync(urls, options, limits);
            console.log("%c 请求完成", "color:green");
            return result;

        case "async":
            console.log("%c 异步队列", "color:green");
            result = await requestSync(urls, options, 1);
            console.log("%c 请求完成", "color:green");
            return result;

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
