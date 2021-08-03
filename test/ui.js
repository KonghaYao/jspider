export async function ui(views) {
    var app = new Vue({
        el: '#app',
        data: { views: views.tasks },
        methods: {},
    });
}
