import request from "./request.js";
import sleep from "./sleep.js";

/**
 * pipe 型数据请求
 * @date 2020-10-11
 * @param {String} url 第一个请求的 URL
 * @param {Object} options={} 默认的 options 请求参数
 * @param {function} func 处理函数
 * @param {Number} time=0 间隔时间
 * @returns {Array} 返回全部请求的结果
 */

async function pipe(url, options = {}, func, time = 0, returnType = false) {
    let end = true;
    let all = [url, options];
    let collection = [];

    console.group("%c 请求组", "color:green");
    for (let i = 0; end; i++) {
        let res = await request(all[0], { ...options, ...all[1] }, returnType)
            .then((res) => {
                console.log(`%c ${i} 完成`, "color:green;");
                collection.push(res);
                // 函数返回值作为请求参数。
                return func(res, [i]);
            })
            .then((res) => sleep(res, time));
        [end, all] = res;
    }
    console.groupEnd("%c 完成", "color:green");

    return collection;
}

export default pipe;
