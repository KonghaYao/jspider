<template>
    <div class="JSpider-UI">
        <control-panel></control-panel>
    </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue';
export default {
    name: 'UserInterface',
    props: ['view'],
    components: { ControlPanel },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
};
</script>

<style >
.JSpider-UI {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: absolute;
    top: 0;
    left: 0;
}
.JSpider-UI > section {
    height: 100vh;
    widows: 100vw;
}
</style>
