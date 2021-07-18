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
