import request from "./Ajax/request.js";
import requestConcurrent from "./Ajax/requestConcurrent.js";
import pipe from "./Ajax/pipe.js";

/**
 * 批量请求入口函数
 * @date 2020-09-16
 * @param {Observer} config 批量请求函数的配置对象
 * @returns {Promise} 返回结果的 Promise 对象
 */

async function Ajax(config) {
    let { urls, time, options, type, limits, func, returnType } = config;
    switch (type) {
        case "start":
            console.group("%c 并发请求", "color:green");
            let result = await requestConcurrent(urls, options, limits, time, returnType);
            return result.flat();
        case "pipe":
            console.group("%c 管道请求", "color:green");

            //管道请求只需要首URL，其他URL由后面生成，但是这里仍然使用 urls
            let pipeResult = await pipe(urls, options, func, time, returnType);
            return pipeResult;
        default:
            console.group("%c 测试请求", "color:green");
            let testResult = await Promise.all(
                [0, 1, 2].map((i) => {
                    return urls[i] ? request(urls[i], options, returnType) : null;
                })
            ).then((res) => res.filter((i) => i));
            console.groupEnd("%c 请求完成", "color:green");
            return testResult;
    }
}

export default Ajax;
