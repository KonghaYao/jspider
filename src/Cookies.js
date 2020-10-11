var Cookies = {};

function UPDATE() {
    if (document.cookie) {
        document.cookie.split(";").forEach((i) => {
            let [key, value] = i.split("=");
            value = unescape(decodeURI(value || "{}"));
            try {
                Cookies[key.trim()] = JSON.parse(value);
            } catch (err) {
                Cookies[key.trim()] = value;
            }
        });
    }
    return true;
}

function SET(key, value, days = 1000) {
    var data = new Date();
    data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = data.toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
    UPDATE();
    return true;
}

UPDATE();

export default new Proxy(Cookies, {
    get(target, key) {
        UPDATE();
        return target[key];
    },
    set(target, key, value) {
        let result = value ? SET(key, value, 1000) : SET(key, "", -1);
        UPDATE();
        return result;
    },
});
