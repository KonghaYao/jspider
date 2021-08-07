import JSpider from 'https://cdn.jsdelivr.net/gh/konghayao/jspider/dist/JSpider.esm.min.js';
let {
    plugins,
    plugins: { ExcelHelper, Request, Download },
} = JSpider;
let keyword = '';
let first = await fetch(
    `https://api.bilibili.com/x/web-interface/search/type?context=&page=1&order=&keyword=${keyword}&duration=&tids_1=&tids_2=&platform=pc&search_type=video&highlight=1&single_column=0`,
    {
        referrer: 'https://search.bilibili.com/all?keyword=%E5%A5%A5%E8%BF%90',
        method: 'GET',
    },
).then((res) => res.json());
let urls = [...Array(first.data.numPages).keys()].map((i) => {
    return `https://api.bilibili.com/x/web-interface/search/type?context=&page=${i}&order=&keyword=${keyword}&duration=&tids_1=&tids_2=&platform=pc&search_type=video&highlight=1&single_column=0`;
});

let spider = new JSpider()
    .pipeline(
        Request(),
        ExcelHelper((data) => data.data.result),
        Download(),
    )
    .crawl(urls)
    .start();
