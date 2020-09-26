// search 模块的测试文件

console.log("%c 全局变量测试", "color:orange");
console.dir(JSpider.prototype.Globals());

let testObj = {
    arr: ["张五"],
    cc: {
        name: ["李四", "张三", 122, 111, "王五"],
    },
    dd: null,
    name: "1233",
};
console.log("%c 搜索测试", "color:orange");
console.dir(JSpider.prototype.search(testObj, /张/));
console.dir(JSpider.prototype.search(testObj, /王/));
