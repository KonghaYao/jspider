// 借助 jsdelivr 网站的免费 cdn 实现直接查询导入插件的功能。
const URI = "https://cdn.jsdelivr.net";
const wayMap = Object.entries({
    npm: /^npm?/i,
    gh: /gh?|github/i,
    wp: /wordpress|wp/i,
});

/**
 * 描述
 * @date 2021-06-28
 * @param {any} moduleName
 * @param {any} options
 * @return {any}
 */
export function jsdelivr(moduleName, { version = "", store = "npm", path = "" } = {}) {
    const way = wayMap.reduce((final, [key, value]) => (value.test(store) ? key : final), "npm");
    return `${URI}/${way}/${moduleName}${version ? `@${version}` : ""}${path ? `/${path}` : ""}`;
}
