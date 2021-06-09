import JSpider from "https://cdn.jsdelivr.net/npm/js-spider/dist/esm/JSpider.min.js";
async function main() {
    console.log("JSpider 载入");

    const { $Mock } = JSpider.tools;

    await $Mock("excel");
    XMLHttpRequest.prototype.$open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async, ...args) {
        return this.$open(method, url, true, ...args);
    };
}
main();
