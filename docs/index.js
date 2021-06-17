// import JSpider from "https://cdn.jsdelivr.net/npm/js-spider/dist/esm/JSpider.min.js";
import JSpider from "../dist/esm/JSpider.min.js";
async function main() {
    window.JSpider = JSpider;
    console.log("JSpider 载入");

    const { $Mock } = JSpider.tools;

    await $Mock("excel");
}
main();
