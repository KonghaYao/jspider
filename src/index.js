import { Spider } from './Spider/index';
import * as plugins from './plugins/index.js';
import * as tools from './tools/index.js'; // 工具都是 $ 开头的函数
import { Plugin } from './Pipeline/PluginSystem';
import { Task, TaskGroup } from './TaskSystem/index';
export default Object.assign(Spider, tools, {
    plugins,
    Plugin,
    Task,
    TaskGroup,
});
