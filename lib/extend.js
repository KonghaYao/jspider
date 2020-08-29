async function extend(array) {
    array.forEach((i) => {
        import(`./${i}.js`)
            .then((res) => ((this[i] = res), console.log(`%c ${i} 载入完成`, "color:green")))
            .catch((err) => {
                console.error(i + "   加载失败 %c", "color:red");
            });
    });
}
export default extend;
