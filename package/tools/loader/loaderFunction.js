/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
const loaderFunction = {
    // 加载 js 文件到 html 文档中
    script(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;

            script.onload = () => {
                console.log(`${url} 加载完成`);
                script.remove();
                resolve();
            };
            script.onerror = (err) => reject(err);
            document.body.append(script);
        });
    },
    // 加载 css 文件到 html 文档中
    css(url) {
        return new Promise((resolve, reject) => {
            const style = document.createElement('style');
            style.rel = 'stylesheet';
            style.src = url;
            style.onload = () => {
                console.log(`${url} 加载完成`);
                resolve();
            };
            style.onerror = (err) => reject(err);
            document.body.append(style);
        });
    },
    // TODO UMD AMD 等类型的 JS 代码的载入
};
export { loaderFunction };
