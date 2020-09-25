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
    console.log("%c 触发 arr 的 get检查1", "color:green", key, value);
    return value;
};
testObj.arr.SETTER.DEFAULT = (key, value) => {
    console.log("%c 想要修改，原来的值", "color:red", key);
    console.log("%c 触发 arr 的 set 检查2", "color:red", value);
    return "被修改属性";
};

testObj.GETTER.cc = (key, value) => {
    console.log("%c 触发本身 get 检查3", "color:blue", key, value);
    return "伪造值";
};

console.log("%c 开始对象代理--------------------", "color:orange");

// 获取检测
testObj.arr[3];
console.log("%c" + testObj.cc, "color:red");

//
testObj.arr[3] += 1;
console.log("现在的：" + testObj.arr[3]);
