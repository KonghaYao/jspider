function copy(ele, needClear = false) {
    if (!needClear) clearUnCopy();

    let inner = ele instanceof HTMLElement ? ele.innerText : JSON.stringify(ele);
    let a = document.createElement("div");
    a.innerText = inner;

    document.body.appendChild(a);
    getSelection().selectAllChildren(a);
    document.execCommand("copy");
    a.remove();
    console.log("%c 复制已经完成", "color:green");
}
function clearUnCopy() {
    [document, ...document.querySelectorAll("*")].filter((ele) => {
        ele.oncontextmenu = "";
        ele.onselectstart = true;
        ele.oncopy = "";
        ele.oncut = "";
        let event = getEventListeners(ele);
        if (event.hasOwnProperty("copy")) {
            event.copy.forEach((target) => ele.removeEventListener("copy", target.listener));
        }
    });
}
export default { clearUnCopy, copy };
