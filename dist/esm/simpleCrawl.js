import JSpider from './core/JSpider.js';
import { Request } from './plugins/Request.js';
import { Download } from './plugins/Download.js';
import './plugins/ExcelHelper.js';
import './plugins/zipFile.js';
import './Task-f41dffa5.js';
import './core/components.js';
import './utils/type.js';
import './Subscriber-66236423.js';
import './map-94257997.js';
import './from-87624c8d.js';
import './utils/concurrent.js';
import './bufferCount-cc50a06c.js';
import './mergeMap-063b7a69.js';
import './of-f7a7e7ed.js';
import './plugins/utils/toFile.js';
import './plugins/ExcelHelper/createExcelFile.js';
import './plugins/ExcelHelper/xlsx.js';
import './tools/loader/loader.js';
import './tools/loader/scriptStore.js';
import './tools/loader/loaderFunction.js';
import './plugins/JSzip/zipper.js';
import './plugins/JSzip/JSzip.js';
import './plugins/JSzip/tasksToFiles.js';

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
