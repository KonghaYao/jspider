/**
 * 这是清理copy的函数，目的是为了能够让用户进行复制
 * @date 2021-03-02
 */
function clearCopyBarriers() {
    [document, ...document.querySelectorAll("*")].forEach((ele) => {
        // 删除对象属性上的函数
        ele.oncontextmenu = "";
        ele.oncopy = "";
        ele.oncut = "";
        ele.onselectstart = true;

        //清除事件绑定的控制
        let event = window.getEventListeners(ele);
        // 清除 快捷键 copy cut 事件的占用
        ["keydown", "copy", "cut"].forEach((eventName) => {
            if (event.hasOwnProperty(eventName)) {
                event[eventName].forEach((target) => ele.removeEventListener(eventName, target.listener));
            }
        });
    });
    console.log("清理完成");
}
/**
 * 复制函数
 * @description 这个函数只能用在浏览器环境中
 * @date 2021-03-02
 * @param {any} content 要复制的东西，可以是 DOM
 * @param {Boolean} clearBarriers=false 顺便帮你解决不能复制的问题，可能会失败
 */
export function $copy(content, clearBarriers = false) {
    if (clearBarriers) clearCopyBarriers();

    // 询问 window.copy 是否被覆盖了
    if (!(window.copy && window.copy.toString() === "function copy(value) { [Command Line API] }")) {
        // 尝试重置 copy 函数
        delete window.copy;
    }
    // 直接使用控制台的复制功能
    // ! 在开发者工具中可以调用这个函数
    window.copy(content);
}
