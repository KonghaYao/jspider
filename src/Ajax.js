import request from "./Ajax/request.js";
import requestSync from "./Ajax/requestSync.js";

/**
 * 批量请求入口函数
 * @date 2020-09-16
 * @param {Observer} config 批量请求函数的配置对象
 * @returns {Promise} 返回结果的 Promise 对象
 */

async function Ajax(config) {
    let { urls, time, options, type, limits } = config;
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
            ).then((res) => res.filter((i) => i));
    }
}

export default Ajax;
