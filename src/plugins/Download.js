import { toFile } from './utils/toFile.js';

import { Plugin } from '../core/PluginSystem.js';
// 在 浏览器中下载是不能够同时进行的，也就是说，如果前面的没有下载完，后面的又提交
// 会导致后面的全部失效，所以设置 Promise 下载队列
const DownloadQueue = {
    main: Promise.resolve(true),
    add(file) {
        this.main.then(() => aDownload(file));
    },
};
// a 标签下载的方式貌似为同步模式（未验证）
const aDownload = function (file) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    console.log('%c 下载完成', 'color:green');
};

const download = (data, { DownloadFileName: name }, originData) => {
    const file = toFile(data, name || (typeof url === 'string' ? originData.url.replace(/[^\/]*?\//g, '') : ''));
    DownloadQueue.add(file);
    return null;
};
export const Download = function (options = {}) {
    return Plugin({
        main: download,
        options,
    });
};
