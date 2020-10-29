import Script from "../Script.js";
/**
 * 压缩核心
 * @date 2020-09-17
 * @param {Array} fileList 文件数组
 * @returns {Blob} 返回压缩的结果
 */
async function zipFile(fileList) {
    if (!window.JSZip) {
        let sym = await Script("https://cdn.jsdelivr.net/npm/jszip@3.5.0/dist/jszip.min.js");
        if (!sym) {
            throw new Error("JSzip 加载失败");
        }
    }

    // 启动压缩
    let zip = new JSZip();
    fileList.forEach((i) => {
        let name = i.name;
        zip.file(name, i);
    });
    let content = await zip.generateAsync({
        type: "blob",
    });

    console.log("%c 压缩完成", "color:green");
    return content;
}
export default zipFile;
