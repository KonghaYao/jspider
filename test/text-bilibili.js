import('https://cdn.jsdelivr.net/npm/js-spider@3.2.1/dist/JSpider.esm.min.js').then(async (res) => {
    let JSpider = res.default;
    let {
        Plugin,
        plugins: { ExcelHelper, Request, Download, ZipFile },
    } = JSpider;
    await JSpider.$load('xlsx');
    await JSpider.$load('jszip');
    let keyword = '奥运';
    let first = await fetch(
        `https://api.bilibili.com/x/web-interface/search/type?context=&page=1&order=&keyword=${keyword}&duration=&tids_1=&tids_2=&from_source=&from_spmid=333.336&platform=pc&__refresh__=true&_extra=&search_type=video&highlight=1&single_column=0`,
        {
            referrer: 'https://search.bilibili.com/all?keyword=%E5%A5%A5%E8%BF%90',
            method: 'GET',
        },
    ).then((res) => res.json());
    let urls = [...Array(first.data.numPages).keys()].map((i) => {
        return {
            url: `https://api.bilibili.com/x/web-interface/search/type?context=&page=${
                i + 1
            }&order=&keyword=${keyword}&duration=&tids_1=&tids_2=&from_source=&from_spmid=333.336&platform=pc&__refresh__=true&_extra=&search_type=video&highlight=1&single_column=0`,
            options: {
                referrer: 'https://search.bilibili.com/all?keyword=%E5%A5%A5%E8%BF%90',
                method: 'GET',
            },
        };
    });
    window.Result = [];
    let spider = new JSpider()
        .pipeline(
            Request(),
            Plugin((data) => {
                data.data.result.forEach((item) => ['hit_columns', 'new_rec_tags'].forEach((ii) => (item[ii] = '')));
                window.Result.push(data.data.result);
            }),
        )
        .crawl(urls)
        .start();
});
