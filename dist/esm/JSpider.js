import JSpider$1 from './core/JSpider.js';
import { p as plugins } from './index-9543238a.js';
import { t as tools } from './index-3e09d6a7.js';
import simpleCrawl from './simpleCrawl.js';
import { p as pluginTools } from './pluginTools-50050b18.js';
import './Task-ce8b0387.js';
import './core/components.js';
import './utils/type.js';
import './concatMap-0d4163f6.js';
import './mergeMap-1cf10555.js';
import './map-f4798e28.js';
import './of-0c892e58.js';
import './plugins/Request.js';
import './utils/concurrent.js';
import './delayWhen-ec4378ef.js';
import './plugins/Download.js';
import './plugins/ExcelHelper.js';
import './plugins/ExcelHelper/createExcelFile.js';
import './plugins/ExcelHelper/xlsx.js';
import './tools/loader/loader.js';
import './tools/loader/scriptStore.js';
import './tools/loader/loaderFunction.js';
import './Dexie-34f5ab5f.js';
import './plugins/Dexie/Dexie.js';
import './plugins/Dexie/data.js';
import './tools/Mock/Mock.js';
import './tools/Mock/Server/index.js';
import './tools/Mock/Server/excel.js';
import './tools/Mock/plugins/mockFetch.js';

const JSpider = Object.assign(JSpider$1, {
    plugins,
    simpleCrawl,
    tools,
    ...pluginTools,
});

export default JSpider;
export { JSpider };
