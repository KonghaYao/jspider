/**
 * Extend 函数
 * @date 2020-09-16
 */
const List = ["HTMLspider", "searchWindow", "XHRwatch"];

let Extend = async () => {
    for (let i = List.length; i--; ) {
        let module = List[i];
        await import(`../pro/${module}.js`)
            .then((res) => {
                this[module] = res.default;
                console.log(`%c ${module} 载入完成`, "color:green");
            })
            .catch((err) => {
                console.error(module + "   加载失败 %c", "color:red");
                console.error(err);
            });
    }
};
export default Extend;
