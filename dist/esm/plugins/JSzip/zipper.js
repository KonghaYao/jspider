import { JSZip } from './JSzip.js';
import '../../tools/loader/loader.js';
import '../../tools/loader/scriptStore.js';
import '../../tools/loader/loaderFunction.js';

async function zipper(fileArray, zipName, index) {
    // 启动压缩
    let zip = new JSZip();
    //压入所有文件
    fileArray.forEach((file) => zip.file(file.name, file));
    //设置压缩格式，开始打包
    let content = await zip.generateAsync({
        type: "blob", //nodejs用 nodebuffer ,浏览器用 blob
    });
    // 给压缩文件一个名称
    content.name = `${zipName}-${index}.zip`;
    return content;
}

export { zipper };
