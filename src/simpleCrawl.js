import JSpider from "./core/JSpider.js";
import { Request, Download } from "./plugins/index.js";
export default function simpleCrawl(urls) {
    const workflow = new JSpider(
        Request({
            returnType: "blob",
        }),
        Download()
    );
    return workflow.apply(urls);
}
