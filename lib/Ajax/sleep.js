/**
 * 休眠函数
 * @description 用于在 Promise 链中暂停一段时间
 * @date 2020-09-16
 * @param {any} res 休眠完成之后需要返回的数据
 * @param {Number} ms 休眠时间
 * @returns {any} 传递休眠之前的数据
 */
function sleep(res, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res);
        }, ms);
    });
}
export default sleep;
