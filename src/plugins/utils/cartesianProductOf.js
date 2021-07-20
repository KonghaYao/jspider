/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
// 数组的笛卡尔积结果
export function cartesianProductOf(...args) {
    return args.reduce(
        (collection, current) => {
            const ret = [];
            collection.forEach((a) => {
                current.forEach((b) => {
                    ret.push(a.concat([b]));
                });
            });
            return ret;
        },
        [[]],
    );
}
