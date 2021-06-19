const loaderFunction = {
    script(url) {
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.src = url;

            script.onload = () => {
                console.log("加载完成");
                script.remove();
                resolve();
            };
            script.onerror = (err) => reject(err);
            document.body.append(script);
        });
    },
    esm(url) {
        return import(url);
    },
    css(url) {
        return new Promise((resolve, reject) => {
            let style = document.createElement("style");
            style.rel = "stylesheet";
            style.src = url;
            style.onload = () => {
                console.log("加载完成");
                resolve();
            };
            style.onerror = (err) => reject(err);
            document.body.append(style);
        });
    },
};
export { loaderFunction };
