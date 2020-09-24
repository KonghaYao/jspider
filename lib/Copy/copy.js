/**
 * 复制函数
 * @date 2020-09-12
 * @param {HTMLElement | String | Number | Object} ele 输入需要复制的数据
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
export default copy;
