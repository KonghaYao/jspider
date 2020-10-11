/**
 * 破解禁止复制
 * @date 2020-09-12
 * @description 可以破解大部分禁止复制功能
 */

function unCopyClear() {
    [document, ...document.querySelectorAll("*")].forEach((ele) => {
        ele.oncontextmenu = "";
        ele.onselectstart = true;
        ele.oncopy = "";
        ele.oncut = "";
        let event = window.getEventListeners(ele);
        if (event.hasOwnProperty("copy")) {
            event.copy.forEach((target) => ele.removeEventListener("copy", target.listener));
        }
    });
    console.log("清理完成");
}

export default unCopyClear;
