// 压缩文件
import Script from "../Script.js";
async function zipFile(fileList) {
    if (!window.JSZip) {
        await Script("https://cdn.bootcdn.net/ajax/libs/jszip/3.5.0/jszip.min.js");
        console.log("%c JSZip加载成功", "color:green");
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
