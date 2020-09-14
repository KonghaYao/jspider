function searchWindow(RegExp, deep) {
    let search = JSpider.prototype.search;
    let Globals = JSpider.prototype.Globals;
    return search(Globals(), RegExp, deep);
}
