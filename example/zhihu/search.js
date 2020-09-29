import K from "./search/K.js.js";
import q from "./search/q.js";
var path =
    "/api/v4/search_v3?t=general&q=node&correction=1&offset=27&limit=20&lc_idx=27&show_all_topics=0&search_hash_id=31de112bdd5edb53bbac91b206ecc62d&vertical_info=0%2C1%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1";

var u = "3_2.0",
    l =
        "3_2.0aR_sn77yn6O92wOB8hPZnQr0EMYxc4f18wNBUgpTbT2xE_tq1_FZQ__064kYJvNMPqXTDLe1FCOm7LS1trxTA8OYLUL8iRnqB6kq24rZegO8nCSCzrxMQJxTD_tp6ukyK8FmDcpTdRtuQXtTlbXT2ccmHbS_VUPT16fq-AXmAgxL-cHT_Tf0kUQKF0ntHRX_h0kY-b9K6qOmiUFLDGtLiqN0cBOV_vO_P9Lm1Jumr4x19GFLYGH1IuOYTwwLF0fzf0xmrLVCIcPL6g2LGhFC_cC9cgwmiu3BNgLfSXLyhGwxyvwG_BF9SQeGccO8rcfKuhcVIgg8-qpx_ugMGqwKzGOGEuVmfuwOlqLmtqXqrTCVwhHC-BgC";
var un;
var d = document.cookie.match(/(?<=d_c0=)[^;]+/), //从cookie中来
    f = oe(path, un, {
        zse83: u,
        dc0: d,
        xZst81: l,
    });
window["xxx"] = "".concat("1.0", "_").concat(f.signature);
console.log(xxx);
function oe(e, t, n) {
    var zse83 = n.zse83,
        doc0 = n.dc0,
        xZst81 = n.xZst81,
        u = path,
        l = "https://www.zhihu.com/search?type=content&q=node",
        d = (function (e) {
            return e ? ("string" == typeof e ? e : $(e) ? JSON.stringify(e) : "") : "";
        })(t),
        f = [zse83, u, l, doc0, ee(d) && d, xZst81].filter(Boolean).join("+");
    return {
        source: f,
        signature: K(q(f)),
    };
}
function ee(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4096;
    return !!e && te(e) <= t;
}
function te(e) {
    return new Blob([e]).size;
}
