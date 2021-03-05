/**
 * HTML 文本解析函数
 * @date 2020-09-16
 * @param {Array} HTMLStringList HTML 字符串数组
 * @param {function} parseFunc 解析每个 HTML 字符串的函数
 * @returns {any} 返回用户的函数返回值组成的数组
 */
async function HTMLparser(HTMLStringList, parseFunc) {
    //处理不符合数据
    let allow = await Promise.all(
        HTMLStringList.reduce((arr, cur) => {
            if (cur instanceof Blob) {
                let res = cur.text();
                arr.push(res);
            } else if (typeof cur === "string") {
                arr.push(cur);
            }
            return arr;
        }, [])
    );
    return allow.map((i) => {
        try {
            let parser = new DOMParser();
            let doc = parser.parseFromString(i, "text/html");
            let result = parseFunc(doc);
            console.log("%c 解析完成", "color:green");
            doc.remove();
            return result;
        } catch (err) {
            return i;
        }
    });
}
export default HTMLparser;
