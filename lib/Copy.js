//复制函数
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

// 破解复制
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
