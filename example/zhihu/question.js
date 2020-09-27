// 建立时间 :
// 这是写好的爬取知乎操作的脚本
// 使用页面:
// @match https://www.zhihu.com/question/*/answer/*
// 知乎使用 CSP 禁止了 JS 载入，所以需要使用 ES5 版本的库。
let questionId = 401066045;
let base = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit=3&platform=desktop&sort_by=default&offset=`;

let spider = new JSpider();
window.done = await spider.Ajax({
    urls: [...Array(5).keys()].map((i) => base + i * 3),
    limits: 1,
    type: "start",
});
