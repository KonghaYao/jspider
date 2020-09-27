import request from "./request.js";
import sleep from "./sleep.js";

/**
 * 固定的函数
 * @date 2020-09-16
 * @param {Array} arr
 * @param {Number} limits 并发数
 * @returns {Array} 剥离完一组后的原数组
 */
const mainFunc = async (arr, limits) => {
    let [urls, options, result] = arr;
    let group = urls.splice(0, limits);
    let res = await Promise.all(group.map((url) => request(url, options)));
    console.log(`${limits} 个已完成` + new Date().getTime());
    result.push(res);
    return [urls, options, result];
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
function requestSync(urls, options = {}, limits = 3, time = 0) {
    //定义爬取次数

    let num = Math.ceil(urls.length / limits);

    const func = (arr) => {
        return mainFunc(arr, limits);
    };
    // compose 函数按序执行
    return Array(num)
        .fill(func)
        .reduce((next, current) => {
            return next.then(current).then((res) => sleep(res, time));
        }, Promise.resolve([urls, options, []]))
        .then((res) => res.pop());
}
export default requestSync;