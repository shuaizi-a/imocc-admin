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
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route';
import SidebarItem from './SidebarItem.vue';

const router = useRouter();

const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateMenus(filterRoutes);
});
console.log('router.currentRoute', router.currentRoute);
// 计算高亮 menu 的方法
const activeMenu = computed(() => {
  return router.currentRoute.value.path;
});
</script>
