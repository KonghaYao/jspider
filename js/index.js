let root = "https://cdn.jsdelivr.net/npm/js-spider/doc/";
const Default = "./JSpider.md";
const Title = document.getElementById("title");
const LinkList = document.getElementById("link");
Object.defineProperty(LinkList, "html", {
    set(value) {
        console.log(value);
        Object.entries(value).forEach(([key, value]) => {
            LinkList.querySelector("#" + key).href = value || "";
        });
    },
});

hljs.initHighlightingOnLoad();
const marked = new showdown.Converter({
    tables: true,
    parseImgDimensions: true,
    strikethrough: true,
    tasklists: true,
    literalMidWordUnderscores: true,
    metadata: true,
    noHeaderId: true,
    emoji: true,
});
const md = document.getElementById("md");

window.onload = async function () {
    let file = location.hash.replace(/^#/, ".") || Default;
    console.log(file);
    await toWhere(file);
};

function toWhere(path) {
    let num = 0;

    let hash = location.hash.replace(/^#/, "");
    if (path.replace(/[\/|\.|#]/g, "") == hash.replace(/[\/|\.|#]/g, "")) {
        init(path);
        return;
    }
    if (/^\.\//.test(path)) {
        while (/\/[^\/]*?\.[^\/]*?$/.test(hash)) {
            hash = hash.replace(/\/[^\/]*?\.[^\/]*?$/, "");
        }
    }
    path = path.replace(/\.\.\//g, () => {
        num += 1;
        return "";
    });
    for (; num > 0; num--) {
        hash = hash.replace(/(\/[^\/]+?$)|(\/[^\/]+?\/$)/, (p0) => {
            /\./.test(p0) && num++;
            return "";
        });
    }
    hash += "/";
    if (/(^\.\/)|(^\/)/.test(path)) {
        console.log(path);
        hash = path.replace(/(^\.\/)|(^\/)/, hash);
    } else {
        hash += path;
    }
    console.log(hash);
    hash = hash.replace(/\/\//g, "/");
    location.hash = hash;
    init(hash);
}

async function init(url) {
    return await fetch((root + url).replace(/\/\//g, "/"))
        .then((res) => res.text())
        .then((res) => {
            if (res) redirect(res);
        });
}
function redirect(res) {
    md.innerHTML = marked.makeHtml(res);
    document.querySelectorAll("#md > pre").forEach((i) => {
        hljs.highlightBlock(i);
    });

    document.querySelectorAll("#md  a").forEach((i) => {
        i.onclick = (e) => {
            e.preventDefault();
            toWhere(e.target.outerHTML.match(/(?<=href\=")[\s\S]+?(?=")/)[0]);
        };
    });
    scrollTo(0, 0);
    let { title, NPM, Github, Gitee } = marked.getMetadata();
    Title.innerHTML = title || "KonghaYao";
    let obj = { NPM, Github, Gitee };
    LinkList.html = obj;
}
