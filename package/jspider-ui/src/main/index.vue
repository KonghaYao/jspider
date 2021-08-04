
<template>
    <div>
        <div class="card">
            <div class="all-task" v-if="view">
                <div
                    v-for="(item, index) in view.tasks"
                    :key="view.uuid"
                    :class="[item.status, 'card']"
                    @mouseenter="showPopup($event, index)"
                    @mouseleave="fadePopup"
                >
                    <div class="round">{{ index }}</div>
                </div>
            </div>
        </div>

        <transition name="van-fade">
            <popup class="popup card" ref="popup" v-show="popupVisible" :popup-info-index="popupInfoIndex"></popup>
        </transition>
    </div>
</template>

<script>
/**
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */
import popup from './popup.vue';
import { store } from '../store';
export default {
    name: 'ControlPanel',
    components: { popup },
    computed: {
        view() {
            return store.state.view;
        },
    },
    methods: {
        showPopup(event, index) {
            this.popupVisible = true;
            anime({
                targets: this.$refs.popup.$el,
                left: event.clientX + 'px',
                top: event.clientY + 'px',
                duration: 1000,
            });
            this.popupInfoIndex = index;
        },
        fadePopup() {
            this.popupVisible = false;
        },
    },
    data() {
        return {
            popupVisible: false,
            popupInfoIndex: 0,
        };
    },
};
</script>

<style scoped>
.all-task {
    display: flex;
    flex-wrap: wrap;
}
.all-task .card {
    height: 8rem;
    width: 8rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.all-task .round {
    height: 100%;
    width: 100%;
}
.popup {
    position: absolute;
    height: 4rem;
    width: 4rem;
    transition: opacity 0.3s;
    padding: 0;
}
.complete,
.success {
    background-color: #67c23a;
}

.free {
    background-color: #409eff;
}

.pending {
    background-color: #e6a23c;
}

.error {
    background-color: #f56c6c;
}

.destroyed {
    background-color: #909399;
}
</style>
