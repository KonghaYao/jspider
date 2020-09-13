import zipFile from "./Downloader/zipFile.js";
import toFile from "./Downloader/toFile.js";
import downBlob from "./Downloader/downBlob.js";

async function download(fileList, nameList = [], needZip = false) {
    console.log("download启动");
    fileList = toFile(fileList, nameList);
    // 判断文件数 少于 10 个直接下载，多余 10 个打包压缩下载。
    if (fileList.length < 10 && !needZip) {
        downBlob(fileList);
    } else {
        console.log("文件多于 10 个,启动压缩");
        let content = await zipFile(fileList);
        content.name = new Date().toLocaleString() + ".zip";
        downBlob([content]);
    }
    console.log("%c 下载完成", "color:green");
}

export default download;
