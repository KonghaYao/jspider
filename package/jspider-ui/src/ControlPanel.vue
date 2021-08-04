
<template>
    <section>
        <!-- section 里面是一个完整的页面单元 -->
        <ui-header class="header"></ui-header>
        <ui-main class="main"></ui-main>
    </section>
</template>

<script>
/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import header from './header/index.vue';
import main from './main/index.vue';
export default {
    name: 'ControlPanel',
    components: {
        'ui-header': header,
        'ui-main': main,
    },
    data() {
        return {};
    },
};
</script>

<style scoped>
section {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 2rem;
    padding: 2rem;
    background-color: #f7f8fa;
    position: relative;
}
.header {
    height: 100%;
    width: 5rem;
}
.main {
    flex: 1;
}
</style>
