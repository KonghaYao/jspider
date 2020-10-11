/**
 * Extend 函数
 * @date 2020-09-16
 */

let Extend = async () => {
    await import(`../pro/index.js`)
        .then((res) => {
            Object.assign(JSpider.prototype, res.default);
            console.log(`%c ${Object.keys(res.default).join(" ")} 载入完成`, "color:green");
        })
        .catch((err) => {
            console.error(err);
        });
};

export default Extend;
