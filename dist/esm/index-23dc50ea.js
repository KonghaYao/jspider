import { Request } from './plugins/Request.js';
import { Download } from './plugins/Download.js';
import { ExcelHelper } from './plugins/ExcelHelper.js';
import { ZipFile } from './plugins/zipFile.js';
import { D as Dexie } from './Dexie-cbab1f62.js';

var plugins = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Request: Request,
	Download: Download,
	ExcelHelper: ExcelHelper,
	ZipFile: ZipFile,
	Dexie: Dexie
});

export { plugins as p };
