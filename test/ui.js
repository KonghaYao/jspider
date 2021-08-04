import UI from '../package/jspider-ui/dist/jspider-user-interface.js';
export async function ui(view) {
    Vue.use(UI);
    window.vm = new Vue({
        el: '#app',

        data: {
            view,
        },
    });
}
