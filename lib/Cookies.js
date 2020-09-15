let Cookies = {
    set(key, value, days = 1000) {
        this.update();
        var data = new Date();
        data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
        expires = data.toUTCString();
        document.cookie = `${key}=${value}; expires=${expires}; path=/`;
        this[key] = value;
        return this;
    },
    delete(key) {
        this.update();
        this.set(key, "", -1);
    },
    update() {
        document.cookie.split(";").forEach((i) => {
            let [key, value] = i.split("=");
            value = unescape(decodeURI(value || "{}"));
            Cookies[key.trim()] = JSON.parse(value) || value;
        });
    },
};

Cookies.update();

export default new Proxy(Cookies, {
    get(target, key) {
        target.update();
        return target[key];
    },
    set(target, key, value) {
        target.update();
        return target.set(key, value, 1000);
    },
});
