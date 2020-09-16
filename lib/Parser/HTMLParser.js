/**
 * HTML 文本解析函数
 * @date 2020-09-16
 * @param {Array} HTMLStringList HTML 字符串数组
 * @param {function} parsefunc 解析每个 HTML 字符串的函数
 * @returns {any} 返回用户的函数返回值组成的数组
 */
function HTMLparser(HTMLStringList, parsefunc) {
    return HTMLStringList.map((i) => {
        let body = i.match(/(?<=\<body[\s\S]*?>)[\s\S]+(?=<\/body>)/)[0];
        let doc = document.createElement("div");
        doc.innerHTML = body;
        let result = parsefunc(doc);
        console.log("%c 解析完成", "color:green");
        doc.remove();
        return result;
    });
}
export default HTMLparser;
