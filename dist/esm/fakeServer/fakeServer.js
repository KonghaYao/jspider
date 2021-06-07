import { m as mock } from '../mock-85ab5842.js';
export { m as default } from '../mock-85ab5842.js';
import MockFetch from './plugins/mockFetch.js';
import './backend/fake.js';
import './backend/excel.js';

window.Mock = mock;

// 代理浏览器 fetch
new MockFetch(mock);
console.warn("Mockjs 运行中");
