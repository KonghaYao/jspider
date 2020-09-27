import zipFile from "./Downloader/zipFile.js";
import toFile from "./Downloader/toFile.js";
import downBlob from "./Downloader/downBlob.js";

/**
 * Downloader 入口函数
 * @date 2020-09-16
 * @param {Array} fileList 文件数组
 * @param {Array | Object} nameList=[] 名称数组或对象
 * @param {Boolean} needZip=false 是否强制压缩
 */
async function download(fileList, nameList = [], needZip = false) {
    console.log("download启动");
    fileList = toFile(fileList, nameList);

    // 判断文件数 少于 10 个直接下载，多余 10 个打包压缩下载。

    if (fileList.length < 10 && !needZip) {
        downBlob(fileList);
    } else {
        console.log(needZip ? "强制压缩" : "%c 文件多于 10 个,启动压缩", "color:orange");
        let content = await zipFile(fileList);
        content.name = new Date().toLocaleString() + ".zip";
        downBlob([content]);
    }
    console.log("%c 下载完成", "color:green");
}

export default download;
