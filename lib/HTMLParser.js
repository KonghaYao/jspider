function HTMLparser(parseList, parsefunc) {
    this.parseResult = parseList.map((i) => {
        let body = i.match(/(?<=\<body[\s\S]*?>)[\s\S]+(?=<\/body>)/)[0];
        let doc = document.createElement("div");
        doc.innerHTML = body;
        let result = parsefunc(doc);
        console.log("%c 解析完成", "color:green");
        doc.remove();
        return result;
    });
    console.log(this.parseResult);
    return [this.parseResult];
}
module.exports = HTMLparser;
