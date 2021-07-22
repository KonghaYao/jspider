const router = {
    '/dir/:name'(req, res) {},
};

new FakeServer({
    router,
    proxyPlugin: [],
});
