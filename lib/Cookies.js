let Cookies = {
    SET(key, value, days = 1000) {
        var data = new Date();
        data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
        let expires = data.toUTCString();
        document.cookie = `${key}=${value}; expires=${expires}; path=/`;
        this.UPDATE();
        return this;
    },
    DELETE(key) {
        this.set(key, "", -1);
        this.UPDATE();
    },
    UPDATE() {
        document.cookie.split(";").forEach((i) => {
            let [key, value] = i.split("=");
            value = unescape(decodeURI(value || "{}"));
            try {
                this[key.trim()] = JSON.parse(value);
            } catch (err) {
                this[key.trim()] = value;
            }
        });
    },
};

Cookies.UPDATE();

export default new Proxy(Cookies, {
    get(target, key) {
        target.UPDATE();
        return target[key];
    },
    set(target, key, value) {
        target.UPDATE();
        return target.set(key, value, 1000);
    },
});
