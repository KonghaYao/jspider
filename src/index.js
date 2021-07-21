/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { Spider } from './Spider/index';
import * as plugins from '../plugins/index.js';
import * as tools from '../tools/index.js'; // 工具都是 $ 开头的函数
import { Plugin } from './Pipeline/PluginSystem';
import { Task, TaskGroup } from './TaskSystem/index';
export default Object.assign(Spider, tools, {
    plugins,
    Plugin,
    Task,
    TaskGroup,
    version: __version__,
    buildDate: new Date(__buildDate__),
});
