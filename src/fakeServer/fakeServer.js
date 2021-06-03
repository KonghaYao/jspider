import Mock from "mockjs";
import MockFetch from "./plugins/mockFetch.js";

window.Mock = Mock;

// 代理浏览器 fetch
new MockFetch(Mock);
import "./backend/fake.js";
import "./backend/excel.js";
console.warn("Mockjs 运行中");
export { Mock as default };
