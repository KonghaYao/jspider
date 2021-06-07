import JSpider from './core/JSpider.js';
import { Request } from './plugins/Request.js';
import { Download } from './plugins/Download.js';
import './plugins/ExcelHelper.js';
import './Task-ce8b0387.js';
import './core/components.js';
import './utils/type.js';
import './concatMap-0d4163f6.js';
import './mergeMap-1cf10555.js';
import './map-f4798e28.js';
import './of-0c892e58.js';
import './utils/concurrent.js';
import './delayWhen-ec4378ef.js';
import './plugins/ExcelHelper/createExcelFile.js';
import './plugins/ExcelHelper/xlsx.js';
import './tools/loader/loader.js';
import './tools/loader/scriptStore.js';
import './tools/loader/loaderFunction.js';

function simpleCrawl(urls) {
    const workflow = new JSpider(
        Request({
            returnType: "blob",
        }),
        Download()
    );
    return workflow.apply(urls);
}

export default simpleCrawl;
