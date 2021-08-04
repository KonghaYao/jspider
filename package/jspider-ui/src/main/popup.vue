
<template>
    <div>
        {{ info.uuid }}
    </div>
</template>

<script>
/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import { store } from '../store';
export default {
    props: ['popupInfoIndex'],
    name: 'header',
    components: {},
    data() {
        return {};
    },
    computed: {
        info() {
            return store.state.view?.tasks[this.popupInfoIndex] || {};
        },
    },
};
</script>

<style scoped>
</style>
