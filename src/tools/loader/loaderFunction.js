import consola from "consola";

const loaderFunction = {
    script(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;

            script.onload = () => {
                consola.success(`${url} 加载完成`);
                script.remove();
                resolve();
            };
            script.onerror = (err) => reject(err);
            document.body.append(script);
        });
    },
    css(url) {
        return new Promise((resolve, reject) => {
            const style = document.createElement("style");
            style.rel = "stylesheet";
            style.src = url;
            style.onload = () => {
                consola.success(`${url} 加载完成`);
                resolve();
            };
            style.onerror = (err) => reject(err);
            document.body.append(style);
        });
    },
    // TODO UMD AMD 等类型的 JS 代码的载入
};
export { loaderFunction };
