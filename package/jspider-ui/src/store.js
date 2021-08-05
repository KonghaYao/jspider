import Vuex from 'vuex';
export const store = new Vuex.Store({
    state: {
        panelVisible: true,
        view: null,
    },
    mutations: {
        changePanelVisible(state) {
            state.panelVisible = !state.panelVisible;
        },
        viewInit(state, view) {
            state.view = view;
        },
    },
});
