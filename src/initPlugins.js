// 用于初始化插件
function initPlugins(...plugins) {
    return Promise.all(
        plugins.reduce((col, cur) => {
            if (cur.hasOwnProperty("init") && cur.init instanceof Function) {
                col.push(cur.init());
            }
            return col;
        }, [])
    );
}
export { initPlugins };
