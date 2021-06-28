import { JSZip } from "./JSzip.js";
let index = 0;
async function zipper(fileArray, zipName) {
    // 启动压缩
    const zip = new JSZip();
    // 压入所有文件
    fileArray.forEach((file) => zip.file(file.name, file));
    // 设置压缩格式，开始打包
    const content = await zip.generateAsync({
        type: "blob" // nodejs用 nodebuffer ,浏览器用 blob
    });
    // 给压缩文件一个名称
    content.name = `${zipName}-${index++}.zip`;
    return content;
}
export { zipper };
