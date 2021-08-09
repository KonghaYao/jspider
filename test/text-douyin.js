import('https://cdn.jsdelivr.net/npm/js-spider@3.2.3/dist/JSpider.esm.min.js').then(async (res) => {
    let JSpider = res.default;
    let {
        Plugin,
        plugins: { ExcelHelper, Request, Download, ZipFile, Combine },
    } = JSpider;
    await JSpider.$load('xlsx');
    await JSpider.$load('lodash');
    await JSpider.$load('jszip');
    let keyword = encodeURI('奥运');

    let number = 36 || 744;
    const aid = '671cc434-cded-4123-aad8-be48a9b5a62e';
    const searchID = '2021080820531701021203523228D85563';
    let urls = [...Array(Math.ceil(number / 12)).keys()].map((i) => {
        return {
            url: `https://www.douyin.com/aweme/v1/web/search/item/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_video_web&sort_type=0&publish_time=0&keyword=${keyword}&search_source=normal_search&query_correct_type=1&is_filter_search=0&offset=${
                i * 12
            }&count=12&search_id=${searchID}&version_code=160100&version_name=16.1.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F92.0.4515.131+Safari%2F537.36+Edg%2F92.0.902.67&browser_online=true`,
            options: {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                    'cache-control': 'no-cache',
                    pragma: 'no-cache',
                    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Microsoft Edge";v="92"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    withcredentials: 'true',
                },
                referrer: `https://www.douyin.com/search/${keyword}?source=normal_search&aid=${aid}&enter_from=main_page`,
                credentials: 'include',
            },
        };
    });
    let spider = new JSpider()
        .pipeline(
            Request({
                delay: 1000,
                buffer: 1,
            }),
            Combine(50, 3000, (dataArray) => {
                debugger;
                return dataArray
                    .map((i) => {
                        return i.data
                            .map((item) => item['aweme_info'])
                            .map((item) => {
                                return {
                                    author: item.author.nickname,
                                    count: item.statistics.digg_count,
                                    createTime: new Date(Number(item['create_time'] + '000')).toLocaleDateString(),
                                };
                            });
                    })
                    .flat()
                    .flat();
            }),
            ExcelHelper((dataset) => {
                debugger;
                return { a: dataset };
            }),
            Download(),
        )
        .crawl(urls)
        .start();
});
