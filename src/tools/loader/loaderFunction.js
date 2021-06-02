const loaderFunction = {
    script(url) {
        return new Promise((res) => {
            let s = document.createElement("script");
            s.src = url;
            s.onload = () => {
                console.log("加载完成");
                s.remove();
                res();
            };
            document.body.append(s);
        });
    },
    esm(url) {
        return import(url);
    },
};
export default loaderFunction;
