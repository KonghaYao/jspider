/**
 * Extend 函数
 * @date 2020-09-16
 * @param {Array} array 扩展的模块名称
 */
async function Extend(array) {
    if (!array instanceof Array) {
        array = [array];
    }
    for (let i = array.length; i--; ) {
        let module = array[i];
        await import(`./${module}.js`)
            .then((res) => {
                this[module] = res.default;
                console.log(`%c ${module} 载入完成`, "color:green");
            })
            .catch((err) => {
                console.error(module + "   加载失败 %c", "color:red");
                console.error(err);
            });
    }
}
export default Extend;
