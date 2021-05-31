import Mock from "mockjs";
import MockFetch from "./plugins/mockFetch.js";
window.Mock = Mock;
// 代理浏览器 fetch
new MockFetch(Mock);
import "./backend/bilibili.js";

export default Mock;
