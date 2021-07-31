@log
class MyClass {
    logger = null;
}

function log(target) {
    // 这个 target 在这里就是 MyClass 这个类
    target.prototype.logger = () => `${target.name} 被调用`;
}

const test = new MyClass();
test.logger(); // MyClass 被调用
