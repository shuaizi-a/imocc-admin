<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const toggleClick = () => {
  // 改变vuex里面app模块stort的数据triggerSidebarOpened的值
  store.commit('app/triggerSidebarOpened');
};

const icon = computed(() => (store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'));
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
