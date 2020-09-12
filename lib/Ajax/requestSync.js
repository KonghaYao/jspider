import request from "./request.js";
// 并发请求处理
let limits = 3;
//封装好函数
const mainFunc = async (arr) => {
    let [urls, options, result] = arr;
    let group = urls.splice(0, limits);
    let res = await Promise.all(group.map((url) => request(url, options)));
    console.log(`${limits} 个已完成` + new Date().getTime());
    result.push(res);
    return [urls, options, result];
};
function requestSync(urls, options = {}, limits = 3) {
    //定义爬取次数
    limits = limits;
    let num = Math.ceil(urls.length / limits);
    // compose 函数按序执行
    return Array(num)
        .fill(mainFunc)
        .reduce((next, current) => {
            return next.then(current);
        }, Promise.resolve([urls, options, []]))
        .then((res) => res.pop());
}
export default requestSync;
