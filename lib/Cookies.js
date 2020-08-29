var Cookies = {
    get(key) {
        return this[key];
    },
    set(key, value, days = 1000) {
        var data = new Date();
        data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
        expires = ";expires=" + data.toUTCString();
        document.cookie = key + "=" + value + expires + "; path =/";
        this[key] = value;
        return this;
    },
    delete(key) {
        this.set(key, "", -1);
    },
};

function init() {
    document.cookie.split(";").forEach((i) => {
        let [key, value] = i.split("=");
        Cookies[key.trim()] = unescape(decodeURI(value));
    });
}
init();

export default Cookies;
