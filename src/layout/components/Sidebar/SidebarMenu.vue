<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
    :default-active="activeMenu"
    :collapse-transition="true"
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { generateMenus } from '@/utils/route';
import { useStore } from 'vuex';
import SidebarItem from './SidebarItem.vue';

const store = useStore();
const router = useRouter();

// 获取导航栏数据
const routes = computed(() => {
  return generateMenus(store.getters.routes);
});

// 计算高亮 menu 的方法
const activeMenu = computed(() => {
  return router.currentRoute.value.path;
});
</script>
