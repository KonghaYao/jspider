import JSpider$1 from './core/JSpider.js';
import { p as plugins } from './index-f94da0f4.js';
import { t as tools } from './index-bdd6c7c0.js';
import simpleCrawl from './simpleCrawl.js';
import { p as pluginTools } from './pluginTools-310cd499.js';
import './Task-f41dffa5.js';
import './core/components.js';
import './utils/type.js';
import './Subscriber-66236423.js';
import './map-94257997.js';
import './from-87624c8d.js';
import './plugins/Request.js';
import './utils/concurrent.js';
import './bufferCount-cc50a06c.js';
import './mergeMap-063b7a69.js';
import './of-f7a7e7ed.js';
import './plugins/Download.js';
import './plugins/utils/toFile.js';
import './plugins/ExcelHelper.js';
import './plugins/ExcelHelper/createExcelFile.js';
import './plugins/ExcelHelper/xlsx.js';
import './tools/loader/loader.js';
import './tools/loader/scriptStore.js';
import './tools/loader/loaderFunction.js';
import './plugins/zipFile.js';
import './plugins/JSzip/zipper.js';
import './plugins/JSzip/JSzip.js';
import './plugins/JSzip/tasksToFiles.js';
import './Dexie-573fedf8.js';
import './plugins/Dexie/Dexie.js';
import './plugins/Dexie/data.js';
import './tools/Mock/Mock.js';
import './tools/Mock/Server/index.js';
import './tools/Mock/Server/excel.js';

const JSpider = Object.assign(JSpider$1, {
    plugins,
    simpleCrawl,
    tools,
    ...pluginTools,
});

export default JSpider;
export { JSpider };
