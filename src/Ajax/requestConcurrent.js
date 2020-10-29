import request from "./request.js";
import sleep from "./sleep.js";

/**
 * 固定的函数
 * @date 2020-09-16
 * @param {Array} arr
 * @param {Number} limits 并发数
 * @returns {Array} 剥离完一组后的原数组
 */

const reduceFunc = async ([urls, options, result], limits, returnType) => {
    // 抽取 urls 内的 limits 个元素
    let group = urls.splice(0, limits);

    // 组内并发
    let res = await Promise.all(group.map((url) => request(url, options, returnType)));
    res = res.filter((i) => i);
    console.log(`${res.length} 个已完成` + new Date().getTime());

    // 结果保存
    result.push(res);
    return [urls, options, result];
};

const func = (arr) => {
    return reduceFunc(arr, limits, returnType);
};

/**
 * 批量请求主函数
 * @date 2020-09-16
 * @param {Array} urls URL数组
 * @param {Object} options={} fetch 请求 options
 * @param {Number} limits=3 并发数
 * @param {Number} time=0 间隔时间
 * @returns {Array} 请求结果数组
 */

function requestConcurrent(urls, options = {}, limits = 3, time = 0, returnType) {
    // 定义爬取组数
    let num = Math.ceil(urls.length / limits);

    // 每一个函数剥除 limits 个元素并并发请求
    let result = Array(num)
        .fill(func)
        .reduce((next, Func, index) => {
            return next
                .then(Func)
                .then((res) => (console.log(`${index} 完成`), res))
                .then((res) => sleep(res, time));
        }, Promise.resolve([urls, options, []]))
        .then(
            (res) => res.pop() //res中的最后一个为保存结果的数组
        );
    return result;
}

export default requestConcurrent;
