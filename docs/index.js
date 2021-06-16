// import JSpider from "https://cdn.jsdelivr.net/npm/js-spider/dist/esm/JSpider.min.js";
import JSpider from "./JSpider.min.js";
async function main() {
    console.log("JSpider 载入");

    const { $Mock } = JSpider.tools;

    await $Mock("excel");
}
main();
