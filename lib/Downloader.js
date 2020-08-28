async function download(fileList, nameList = [], needZip = false) {
    console.log("download启动");
    fileList = toBlob(fileList, nameList);
    await branch(fileList, needZip);
    console.log("%c 下载完成", "color:green");
}

function toBlob(fileList, nameList) {
    for (let i = fileList.length; i--; ) {
        if (!(fileList[i] instanceof Blob)) {
            fileList[i] = new File([JSON.stringify(fileList[i])], nameList[i] || index + ".txt");
        } else if (nameList[i] || !fileList[i].name) {
            fileList[i].name = nameList[i];
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
        let info = await getjszip();
        console.log("%c " + info, "color:green");
    }
    let zip = new JSZip();
    fileList.forEach((i, index) => {
        let name = i.name;
        zip.file(name, i);
    });
    let content = await zip.generateAsync({
        type: "blob",
    });
    console.log("%c 压缩完成", "color:green");
    return content;
}

function getjszip() {
    return new Promise((res) => {
        let script = document.createElement("script");
        script.onload = () => {
            res("%c jszip载入成功", "color:green");
        };
        script.src = "https://cdn.bootcdn.net/ajax/libs/jszip/3.5.0/jszip.min.js";
        document.body.appendChild(script);
        console.log("jszip载入中");
    });
}

function downBlob(fileList) {
    fileList.forEach((blob, index) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = blob.name;
        a.click();
        a.remove();
        console.log("%c 完成", "color:green");
    });
}

module.exports = download;
