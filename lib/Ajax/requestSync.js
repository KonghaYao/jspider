import request from "./request.js";
import sleep from "./sleep.js";
// 并发请求处理

let limits = 3; // 两个函数都需要这个参数

//封装好函数
const mainFunc = async (arr) => {
    let [urls, options, result] = arr;
    let group = urls.splice(0, limits);
    let res = await Promise.all(group.map((url) => request(url, options)));
    console.log(`${limits} 个已完成` + new Date().getTime());
    result.push(res);
    return [urls, options, result];
};

function requestSync(urls, options = {}, Limits = 3, time = 0) {
    //定义爬取次数
    limits = Limits;
    let num = Math.ceil(urls.length / limits);
    // compose 函数按序执行
    return Array(num)
        .fill(mainFunc)
        .reduce((next, current) => {
            return next.then(current).then((res) => sleep(res, time));
        }, Promise.resolve([urls, options, []]))
        .then((res) => res.pop());
}
export default requestSync;
