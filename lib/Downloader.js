import Script from "./Script.js";
async function download(fileList, nameList = [], needZip = false) {
    console.log("download启动");
    fileList = toFile(fileList, nameList);
    await branch(fileList, needZip);
    console.log("%c 下载完成", "color:green");
}

function toFile(fileList, nameList) {
    for (let i = fileList.length; i--; ) {
        let [file, name] = [fileList[i], nameList[i]];
        if (!(file instanceof Blob)) {
            file = new File([JSON.stringify(file)], name || index + ".txt");
        } else if (name || !file.name) {
            file.name = name || index + ".txt";
        }
    }
    console.log("%c blob 转换完成", "color:green");
    return fileList;
}

//===================branch===================//
async function branch(fileList, needZip) {
    if (fileList.length < 10 || needZip) {
        downBlob(fileList);
    } else {
        console.log("文件多于 10 个,启动压缩");
        let content = await zipFile(fileList);
        downBlob([content], [new Date().toLocaleString() + ".zip"]);
    }
}

async function zipFile(fileList) {
    if (!window.JSZip) {
        await Script("https://cdn.bootcdn.net/ajax/libs/jszip/3.5.0/jszip.min.js");
        console.log("%c JSZip加载成功", "color:green");
    }
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
