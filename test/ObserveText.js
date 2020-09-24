//==================以下为测试代码================== //
let testObj = {
    arr: [0, 1, 2, 3],
    cc: {
        name: [4, 5],
    },
    dd: null,
    name: "1233",
};
testObj = JSpider.prototype.watch(testObj);

testObj.arr.GETTER.DEFAULT = (key, value) => {
    console.log("触发get检查1", key, value);
    return value;
};
testObj.arr.SETTER.DEFAULT = (key, value) => {
    console.log("触发set检查2", value);
    return value;
};

testObj.GETTER.cc = (key, value) => {
    console.log("触发get检查3", key, value);
    return "伪造值";
};

console.log("%c 开始对象代理", "color:orange");
testObj.arr[3];
console.log("%c" + testObj.cc, "color:red");
testObj.arr[3] += 1;
