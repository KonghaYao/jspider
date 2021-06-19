// 借助 jsdelivr 网站的免费 cdn 实现直接查询导入插件的功能。
const URI = `https://cdn.jsdelivr.net`;
const wayMap = Object.entries({
    npm: /^npm?/i,
    gh: /gh?|github/i,
    wp: /wordpress|wp/i,
});

export function jsdelivr(moduleName, { version = "", store = "npm", path = "" } = {}) {
    const way = wayMap.reduce((final, [key, value]) => {
        return value.test(store) ? key : final;
    }, "npm");
    return `${URI}/${way}/${moduleName}${version ? "@" + version : ""}${path ? "/" + path : ""}`;
}