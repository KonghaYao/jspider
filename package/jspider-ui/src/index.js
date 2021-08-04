// src/index.js
// 这里import 的 btn和btnDemo.vue的name属性名相同 ！
import JSpiderInterface from './App.vue';

export default {
    install(Vue) {
        return Vue.component('js-spider', JSpiderInterface);
    },
};
