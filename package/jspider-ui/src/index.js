// src/index.js
// 这里import 的 btn和btnDemo.vue的name属性名相同 ！
import App from './App.vue'

App.install = Vue =>  Vue.component('js-spider', App)

export default App;
