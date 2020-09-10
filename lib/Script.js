/**
 * 用于将 url 导入到 body 中
 * @date 2020-08-22
 * @param {String} url js 或 css 的URL
 * @returns {Promise}
 */
function Script(url) {
    return new Promise((resolve) => {
        let tag;

        //判断 js 还是 css 它们的标签的载入不同
        if (/.js$/.test(url)) {
            tag = document.createElement("script");
            tag.src = url;
        } else if (/.css$/.test(url)) {
            tag = document.createElement("link");
            tag.href = url;
            tag.rel = "stylesheet";
            tag.type = "text/css";
        }
        tag.onload = () => {
            console.log(url + "%c 载入成功", "color:green");
            resolve(true);
        };
        document.body.appendChild(tag);
    });
}
export default Script;
