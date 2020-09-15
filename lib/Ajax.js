import request from "./Ajax/request.js";
import requestSync from "./Ajax/requestSync.js";

// ajax 函数不再放置到指定位置
async function ajax(requestOptions) {
    let { urls, time, options, type, limits } = requestOptions;
    switch (type) {
        case "start":
            console.log("%c 并发", "color:green");
            let result = await requestSync(urls, options, limits, time);
            return result.flat();

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
