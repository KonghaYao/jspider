/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { v4 as uuidv4 } from 'uuid';
export function createProps({ spiderUUID, originData }) {
    // 创建初始化的参数
    return {
        uuid: uuidv4(),
        spiderUUID, // JSpider 的实例的 UUID
        createdAt: new Date(),
        error: '',
        status: 'free', // 这个位置是为了让 Plugin 能识别的一个标识
        updatedAt: new Date(),
        dataSlideUUID: spiderUUID,
        dataSlide: [],
        originData,
        output: null, // 每个中间件传出的数据
    };
}
