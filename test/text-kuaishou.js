import('https://cdn.jsdelivr.net/npm/js-spider@3.2.3/dist/JSpider.esm.min.js').then(async (res) => {
    let JSpider = res.default;
    let {
        Plugin,
        plugins: { ExcelHelper, Request, Download, ZipFile, Combine },
    } = JSpider;
    await JSpider.$load('xlsx');
    await JSpider.$load('lodash');
    await JSpider.$load('jszip');

    const keyword = '奥运';

    // 这个 需要每次从 graphl 接口获取
    const sessionID =
        'MV8yNDU1NjkzNTM4XzE2Mjg0MjYxMzA3MjRfJTI1MjVFNSUyNTI1QTUlMjUyNUE1JTI1MjVFOCUyNTI1QkYlMjUyNTkwXzk4NzQ';
    // const cursor = 1; // 从1开始
    const number = 3; // 这个要测试最多次数
    let urls = [...Array(number).keys()].map((cursor) => {
        return {
            url: 'https://www.kuaishou.com/graphql',
            options: {
                headers: {
                    'content-type': 'application/json',
                },
                referrer: 'https://www.kuaishou.com/search/video',
                referrerPolicy: 'unsafe-url',
                body: `{"operationName":"visionSearchPhoto","variables":{"keyword":"${keyword}","pcursor":"${
                    cursor + 1
                }","page":"search","searchSessionId":"${sessionID}"},"query":"query visionSearchPhoto($keyword: String, $pcursor: String, $searchSessionId: String, $page: String, $webPageArea: String) {\\n  visionSearchPhoto(keyword: $keyword, pcursor: $pcursor, searchSessionId: $searchSessionId, page: $page, webPageArea: $webPageArea) {\\n    result\\n    llsid\\n    webPageArea\\n    feeds {\\n      type\\n      author {\\n        id\\n        name\\n        following\\n        headerUrl\\n        headerUrls {\\n          cdn\\n          url\\n          __typename\\n        }\\n        __typename\\n      }\\n      tags {\\n        type\\n        name\\n        __typename\\n      }\\n      photo {\\n        id\\n        duration\\n        caption\\n        likeCount\\n        realLikeCount\\n        coverUrl\\n        photoUrl\\n        liked\\n        timestamp\\n        expTag\\n        coverUrls {\\n          cdn\\n          url\\n          __typename\\n        }\\n        photoUrls {\\n          cdn\\n          url\\n          __typename\\n        }\\n        animatedCoverUrl\\n        stereoType\\n        videoRatio\\n        __typename\\n      }\\n      canAddComment\\n      currentPcursor\\n      llsid\\n      status\\n      __typename\\n    }\\n    searchSessionId\\n    pcursor\\n    aladdinBanner {\\n      imgUrl\\n      link\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
                method: 'POST',

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
                // debugger;
                return dataArray
                    .map((i) => i.data.visionSearchPhoto.feeds)
                    .flat()
                    .map(({ tags = [], author, photo }) => {
                        return {
                            author: author.name,
                            desc: photo.caption,
                            likeCount: photo.likeCount,
                            time: new Date(photo.timestamp).toLocaleDateString(),
                            videoRatio: photo.videoRatio,
                            tags: tags?.map((i) => i.name).join(',') || '',
                        };
                    });
            }),
            ExcelHelper((dataset) => {
                // debugger;
                return { a: dataset };
            }),
            Download(),
        )
        .crawl(urls)
        .start();
});
