// import JSpider from "https://cdn.jsdelivr.net/npm/js-spider/dist/esm/JSpider.min.js";
import JSpider from "../dist/JSpider.esm.min.js";
async function main() {
    window.JSpider = JSpider;
    console.log("JSpider 载入");

    const { $Mock } = JSpider;

    await $Mock("excel");
}
main();
