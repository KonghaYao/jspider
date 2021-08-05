<template>
    <div class="JSpider-UI">
        <dot></dot>
        <control-panel v-show="panelVisible"></control-panel>
    </div>
</template>

<script>
/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { store } from './store';
import ControlPanel from './ControlPanel.vue';
import dot from './dot.vue';
export default {
    name: 'UserInterface',
    props: ['view'],
    components: { ControlPanel, dot },
    data() {
        return {};
    },
    computed: {
        panelVisible() {
            return store.state.panelVisible;
        },
    },
    mounted() {
        console.log(this.view);
        store.commit('viewInit', this.view);
    },
    methods: {
        togglePannel() {
            console.log('触发');
            this.dotVisible = !this.dotVisible;
        },
    },
};
</script>

<style>
.JSpider-UI {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
.JSpider-UI * {
    box-sizing: border-box;
}
.card {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto,
        'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
    -webkit-font-smoothing: antialiased;
    margin-bottom: 24px;
    padding: 24px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
}
.round {
    border-radius: 50%;
    background-color: #fff;
}
</style>
