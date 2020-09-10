import Script from "./Script.js";

async function download(fileList, nameList = [], needZip = false) {
    console.log("download启动");
    fileList = toFile(fileList, nameList);

    // 转到 branch 函数
    await branch(fileList, needZip);
    console.log("%c 下载完成", "color:green");
}

// 将在 fileList 中的非 File 转化成 File
function toFile(fileList, nameList) {
    return fileList.map((file, index) => {
        let name = nameList[index];
        if (!(file instanceof Blob)) {
            file = new File([JSON.stringify(file)], name || index + ".txt");
        } else if (name || !file.name) {
            file.name = name || index + ".txt";
        }
        return file;
    });
}

//===================branch===================//
async function branch(fileList, needZip) {
    // 判断文件数 少于 10 个直接下载，多余 10 个打包压缩下载。

    if (fileList.length < 10 && !needZip) {
        downBlob(fileList);
    } else {
        console.log("文件多于 10 个,启动压缩");
        let content = await zipFile(fileList);
        content.name = new Date().toLocaleString() + ".zip";
        downBlob([content]);
    }
}

// 压缩文件
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

// 下载中心
function downBlob(fileList) {
    fileList.forEach((blob) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = blob.name;
        a.click();
        a.remove();
        console.log("%c 完成", "color:green");
    });
}

export default download;
