/**
 * 复制函数
 * @date 2020-09-12
 * @param {any} ele HTMLElement | String | Number | Object
 * @param {any} needClear=false 是否需要执行清理 禁止复制
 */
function copy(ele, needClear = false) {
    if (needClear) clearUnCopy();

    let inner = ele instanceof HTMLElement ? ele.outerHTML : JSON.stringify(ele);
    let oDiv = document.createElement("div");
    oDiv.innerText = inner;
    document.body.appendChild(oDiv);
    oDiv.style.userSelect = "text";
    getSelection().selectAllChildren(oDiv);
    document.execCommand("copy");
    oDiv.remove();
    console.log("%c 复制已经完成", "color:green");
}

/**
 * 破解禁止复制
 * @date 2020-09-12
 * @description 可以破解大部分禁止复制功能
 */
function clearUnCopy() {
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
export default { clearUnCopy, copy };
