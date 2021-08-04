<template>
    <div class="dot" @click="togglePannel">
        <div class="circle"></div>
    </div>
</template>

<script>
/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { store } from './store';

export default {
    name: 'JSpider-dot',
    props: ['visible'],
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },

    methods: {
        togglePannel() {
            store.commit('changePanelVisible');
        },
    },
};
</script>

<style scoped>
.dot {
    position: fixed;
    height: 4rem;
    width: 4rem;
    right: 1.5rem;
    top: 1rem;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
